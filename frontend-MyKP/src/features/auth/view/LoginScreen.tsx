import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  Alert,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import Constants from 'expo-constants';
import * as AuthSession from 'expo-auth-session';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import { useRouter } from 'expo-router';

import GoogleIcon from '../../../../assets/images/icon/google_icon.svg';

import { styles } from './styles/Login.styles';
import InputField from '../components/InputField';
import LoginButton from '../components/LoginBtn';
import GoogleButton from '../components/GoogleBtn';
import { API_URL, googleLogin, login } from '../services/authService';

const googleWebClientId =
  Constants.expoConfig?.extra?.googleWebClientId ||
  Constants.manifest2?.extra?.expoClient?.extra?.googleWebClientId;

const googleAuthProxyRedirectUri =
  Constants.expoConfig?.extra?.googleAuthProxyRedirectUri ||
  Constants.manifest2?.extra?.expoClient?.extra?.googleAuthProxyRedirectUri;

WebBrowser.maybeCompleteAuthSession();

const LoginScreen = ({ navigation }: any) => {
  // keep useRouter available for deep-linking debug if needed
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [googleRequest] = Google.useAuthRequest({
    clientId: googleWebClientId,
    redirectUri: googleAuthProxyRedirectUri,
    responseType: AuthSession.ResponseType.IdToken,
    scopes: ['openid', 'profile', 'email'],
    selectAccount: true,
  });

  const handleLogin = async () => {
    console.log("LOGIN BUTTON PRESSED");

    try {
      const response = await login({ email, password });
      const userRole = response.user.role;

      const target = userRole === 'admin' ? 'AdminStack' : 'StudentStack';
      console.log(`Will navigate to ${target} (reset)`);
      navigation.reset({ index: 0, routes: [{ name: target }] });
    } catch {
      Alert.alert('Login failed', 'Please check your email and password.');
    }
  };

  const handleGoogleLogin = async () => {
    if (
      !googleWebClientId ||
      googleWebClientId === 'YOUR_GOOGLE_WEB_CLIENT_ID.apps.googleusercontent.com' ||
      !googleAuthProxyRedirectUri ||
      googleAuthProxyRedirectUri ===
        'https://auth.expo.io/@YOUR_EXPO_USERNAME/frontend-MyKP'
    ) {
      Alert.alert(
        'Google login is not configured',
        'Please add your Google Web Client ID and Expo auth redirect URI in app.json.',
      );
      return;
    }

    try {
      if (!googleRequest) {
        throw new Error('Google auth request is not ready.');
      }

      const authUrl =
        googleRequest.url ||
        (await googleRequest.makeAuthUrlAsync(Google.discovery));
      const returnUrl = AuthSession.makeRedirectUri({
        path: 'expo-auth-session',
      });
      console.log('Opening auth session with returnUrl:', returnUrl);
      const signInResult = await WebBrowser.openAuthSessionAsync(
        `${googleAuthProxyRedirectUri}/start?${new URLSearchParams({
          authUrl,
          returnUrl,
        }).toString()}`,
        returnUrl,
      );

      console.log('Auth session result type:', signInResult.type);
      console.log(
        'Auth session result URL:',
        'url' in signInResult ? signInResult.url : undefined,
      );

      if (signInResult.type !== 'success') {
        throw new Error('Google sign-in was cancelled or returned no token.');
      }

      if (!('url' in signInResult) || !signInResult.url) {
        throw new Error('Google sign-in returned no redirect URL.');
      }

      const parsedUrl = new URL(signInResult.url);
      const hash = parsedUrl.hash || '';
      console.log('Parsed URL hash:', hash);
      console.log('Parsed URL search params:', parsedUrl.search);
      
      const idToken =
        parsedUrl.searchParams.get('id_token') ||
        hash
          .replace(/^#/, '')
          .split('&')
          .map((param) => param.split('='))
          .find(([key]) => key === 'id_token')?.[1];

      console.log('Extracted ID token:', idToken ? 'yes' : 'no');

      if (!idToken) {
        throw new Error('Google sign-in returned no ID token.');
      }

      const response = await googleLogin({
        id_token: decodeURIComponent(idToken),
      });

      console.log('Google login response:', response);
      console.log('User role:', response.user.role);

      const target = response.user.role === 'admin' ? 'AdminStack' : 'StudentStack';
      console.log(`Will navigate to ${target} (reset)`);
      // Reset navigation state so user cannot go back to login screen
      navigation.reset({ index: 0, routes: [{ name: target }] });
    } catch (error) {
      console.error('Google login error:', error);

      if (error instanceof TypeError && error.message.includes('Network request failed')) {
        Alert.alert(
          'Google login failed',
          `Google sign-in worked, but the app could not reach backend API at ${API_URL}. Check phone and backend are on the same network and Laravel server is running.`,
        );
        return;
      }

      Alert.alert(
        'Google login failed',
        'Please make sure your Google account is registered in MyKP.',
      );
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        {/* header */}
        <View style={styles.header}>
          <Image
            source={require('../../../../assets/images/campus/ucm.jpg')}
            style={styles.backgroundImage}
          />

          <View style={styles.overlay} />

          <View style={styles.logoContainer}>
            <Image
              source={require('../../../../assets/images/uc_logo.png')}
              style={styles.logo}
            />
          </View>
        </View>

        {/* form */}
        <View style={styles.formContainer}>
          <Text style={styles.title}>Log In</Text>
          <Text style={styles.subtitle}>
            Welcome! Please enter your details.
          </Text>

          <InputField
            label="Email"
            value={email}
            onChangeText={setEmail}
            placeholder="Enter your email"
            labelStyle={styles.inputLabel}
          />

          <InputField
            label="Password"
            value={password}
            onChangeText={setPassword}
            placeholder="Enter your password"
            secureTextEntry
            labelStyle={styles.inputLabel}
          />

          <LoginButton title="Login" onPress={handleLogin} />

          {/* divider */}
          <View style={styles.dividerContainer}>
            <View style={styles.line} />
            <Text style={styles.dividerText}>or</Text>
            <View style={styles.line} />
          </View>

          <GoogleButton
            title="Continue with Google"
            Icon={GoogleIcon}
            disabled={!googleRequest}
            onPress={handleGoogleLogin}
          />
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default LoginScreen;
