import { useEffect, useState } from "react";

import { useRouter } from "expo-router";

import Constants from "expo-constants";
import {
  GoogleSignin,
  isSuccessResponse,
  isErrorWithCode,
  statusCodes,
} from "@react-native-google-signin/google-signin";

import { useAuth } from "../../../core/contexts/AuthContext";

import { googleLogin, login } from "../services/authService";
import { setSession } from "../services/session";

export default function useLoginViewModel() {
  const { signIn } = useAuth();

  const router = useRouter();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [feedbackVisible, setFeedbackVisible] =
    useState(false);

  const [feedbackTitle, setFeedbackTitle] =
    useState("");

  const [feedbackMessage, setFeedbackMessage] =
    useState("");

  const [feedbackType, setFeedbackType] =
    useState<"error" | "info" | "success">("error");

  const showFeedback = (
    title: string,
    message: string,
    type: "error" | "info" | "success" = "error"
  ) => {
    setFeedbackTitle(title);
    setFeedbackMessage(message);
    setFeedbackType(type);
    setFeedbackVisible(true);
  };

  // Configure Google sign-in once on mount. Client IDs live in app.json's
  // expo.extra so they can be swapped per environment without touching code.
  useEffect(() => {
    const extra = (Constants.expoConfig?.extra ?? {}) as Record<string, string>;
    GoogleSignin.configure({
      webClientId: extra.googleWebClientId,
      iosClientId: extra.googleIosClientId || undefined,
      scopes: ["openid", "profile", "email"],
      offlineAccess: false,
    });
  }, []);

  const routeForRole = (
    role: string
  ) => {
    if (role === "admin") {
      router.replace({
        pathname: "/(admin)/activities",
        params: {
          loginSuccess: "true",
        },
      });
    } else {
      router.replace({
        pathname: "/(student)/dashboard",
        params: {
          loginSuccess: "true",
        },
      });
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });

      // Always sign out first so the account picker actually appears instead
      // of silently re-using whatever account is cached on the device.
      try {
        await GoogleSignin.signOut();
      } catch {
        // No previous session — nothing to clean up.
      }

      const response = await GoogleSignin.signIn();
      if (!isSuccessResponse(response)) {
        // User dismissed the picker.
        return;
      }

      const { accessToken } = await GoogleSignin.getTokens();
      if (!accessToken) {
        showFeedback(
          "Google Login Failed",
          "Could not retrieve a Google access token. Please try again.",
          "error"
        );
        return;
      }

      const res = await googleLogin(accessToken);
      await setSession(res);
      signIn(res.token, res.user);
      routeForRole(res.user.role);
    } catch (error: any) {
      if (isErrorWithCode(error)) {
        if (error.code === statusCodes.SIGN_IN_CANCELLED) return;
        if (error.code === statusCodes.IN_PROGRESS) return;
        if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
          showFeedback(
            "Google Login Failed",
            "Google Play Services is not available on this device.",
            "error"
          );
          return;
        }
      }
      // Backend rejections (wrong domain, account not registered) bubble up
      // here as plain Errors with a human-readable message from authService.
      showFeedback(
        "Google Login Failed",
        error?.message ?? "Your Google account could not be signed in.",
        "error"
      );
    }
  };

  const handleLogin = async () => {
    if (!email.trim()) {
      showFeedback(
        "Email Required",
        "Please enter your email before continuing.",
        "error"
      );
      return;
    }

    if (!password.trim()) {
      showFeedback(
        "Password Required",
        "Please enter your password before continuing.",
        "error"
      );
      return;
    }

    try {
      const res = await login({ email, password });
      await setSession(res);
      signIn(res.token, res.user);
      routeForRole(res.user.role);
    } catch (error: any) {
      showFeedback(
        "Login Failed",
        error?.message ?? "Please check your email and password.",
        "error"
      );
    }
  };
  return {
    email,
    setEmail,

    password,
    setPassword,

    handleLogin,
    handleGoogleSignIn,

    feedbackVisible,
    setFeedbackVisible,

    feedbackTitle,
    feedbackMessage,
    feedbackType,
  };
}