import { useState } from "react";

import { useRouter } from "expo-router";

import { useAuth } from "../../../core/contexts/AuthContext";

import { login } from "../services/authService";
import { setSession } from "../services/session";

// ==========================================================
// GOOGLE LOGIN — functionality temporarily disabled. Re-enable later.
// ==========================================================
// import Constants from 'expo-constants';
// import {
//   GoogleSignin,
//   isSuccessResponse,
//   isErrorWithCode,
//   statusCodes,
// } from '@react-native-google-signin/google-signin';

// import { googleLogin } from '../services/authService';

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

  // useEffect(() => {
  //   const extra = Constants.expoConfig?.extra ?? {};
  //   GoogleSignin.configure({
  //     webClientId: extra.googleWebClientId,
  //     iosClientId: extra.googleIosClientId || undefined,
  //     scopes: ['openid', 'profile', 'email'],
  //     offlineAccess: false,
  //   });
  // }, []);

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

  // Google sign-in functionality temporarily disabled. Button still renders but does nothing useful.
  const handleGoogleSignIn = () => {
    showFeedback(
      "Coming Soon",
      "Google login is temporarily disabled. Please use email and password.",
      "info"
    );
  };

  // Original Google sign-in implementation — re-enable later.
  // const handleGoogleSignIn = async () => {
  //   try {
  //     await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
  //     try {
  //       await GoogleSignin.signOut();
  //     } catch {}
  //     const response = await GoogleSignin.signIn();
  //     if (!isSuccessResponse(response)) {
  //       return;
  //     }
  //     const { accessToken } = await GoogleSignin.getTokens();
  //     if (!accessToken) {
  //       Alert.alert('Google login failed', 'Could not retrieve token. Please try again.');
  //       return;
  //     }
  //     const res = await googleLogin(accessToken);
  //     routeForRole(res.user.role);
  //   } catch (error: any) {
  //     if (isErrorWithCode(error)) {
  //       if (error.code === statusCodes.SIGN_IN_CANCELLED) return;
  //       if (error.code === statusCodes.IN_PROGRESS) return;
  //       if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
  //         Alert.alert('Google login failed', 'Google Play Services is not available on this device.');
  //         return;
  //       }
  //     }
  //     console.error('Google sign-in error:', error);
  //     Alert.alert('Google login failed', 'Your Google account is not registered in the system.');
  //   }
  // };

  const handleLogin = async () => {
    // EMPTY EMAIL
    if (!email.trim()) {
      showFeedback(
        "Email Required",
        "Please enter your email before continuing.",
        "error"
      );

      return;
    }

    // EMPTY PASSWORD
    if (!password.trim()) {
      showFeedback(
        "Password Required",
        "Please enter your password before continuing.",
        "error"
      );

      return;
    }

    try {
      const res = await login({
        email,
        password,
      });

      await setSession(res);

      signIn(res.token, res.user);

      routeForRole(res.user.role);

    } catch {
      showFeedback(
        "Login Failed",
        "Please check your email and password.",
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