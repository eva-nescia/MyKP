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
import { useRouter } from "expo-router";

import GoogleIcon from '../../../../assets/images/icon/google_icon.svg';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';

import { styles } from './styles/Login.styles';
import InputField from '../components/InputField';
import LoginButton from '../components/LoginBtn';
import GoogleButton from '../components/GoogleBtn';
import { login, googleLogin } from '../services/authService';

// Must be called at module level so the auth redirect is handled on every render
WebBrowser.maybeCompleteAuthSession();

const LoginScreen = () => {
  const router = useRouter();

  // ✅ FIX HERE
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await login({ email, password });
      const userRole = response.user.role;

      if (userRole === "admin") {
        router.replace("/activities");
      } else {
        router.replace("/dashboard");
      }
    } catch {
      Alert.alert("Login failed", "Please check your email and password.");
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
            onPress={() => {
              console.log('Google login pressed');
            }}
          />
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default LoginScreen;