import React, { useState, useEffect } from 'react';
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
import { useRouter } from 'expo-router';
import Constants from 'expo-constants';

import GoogleIcon from '../../../../assets/images/icon/google_icon.svg';
import {
  GoogleSignin,
  isSuccessResponse,
  isErrorWithCode,
  statusCodes,
} from '@react-native-google-signin/google-signin';

import { styles } from './styles/Login.styles';
import InputField from '../components/InputField';
import LoginButton from '../components/LoginBtn';
import GoogleButton from '../components/GoogleBtn';
import { login, googleLogin } from '../services/authService';

const LoginScreen = () => {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const extra = Constants.expoConfig?.extra ?? {};
    GoogleSignin.configure({
      webClientId: extra.googleWebClientId,
      iosClientId: extra.googleIosClientId || undefined,
      scopes: ['openid', 'profile', 'email'],
      offlineAccess: false,
    });
  }, []);

  const routeForRole = (role: string) => {
    if (role === 'admin') {
      router.replace('/activities');
    } else {
      router.replace('/dashboard');
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
      try {
        await GoogleSignin.signOut();
      } catch {}
      const response = await GoogleSignin.signIn();
      if (!isSuccessResponse(response)) {
        return;
      }
      const { accessToken } = await GoogleSignin.getTokens();
      if (!accessToken) {
        Alert.alert('Google login failed', 'Could not retrieve token. Please try again.');
        return;
      }
      const res = await googleLogin(accessToken);
      routeForRole(res.user.role);
    } catch (error: any) {
      if (isErrorWithCode(error)) {
        if (error.code === statusCodes.SIGN_IN_CANCELLED) return;
        if (error.code === statusCodes.IN_PROGRESS) return;
        if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
          Alert.alert('Google login failed', 'Google Play Services is not available on this device.');
          return;
        }
      }
      console.error('Google sign-in error:', error);
      Alert.alert('Google login failed', 'Your Google account is not registered in the system.');
    }
  };

  const handleLogin = async () => {
    try {
      const res = await login({ email, password });
      routeForRole(res.user.role);
    } catch {
      Alert.alert('Login failed', 'Please check your email and password.');
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
            onPress={handleGoogleSignIn}
          />
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default LoginScreen;
