import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';

import GoogleIcon from '../../../../assets/images/icon/google_icon.svg';

import { styles } from './styles/Login.styles';
import InputField from '../components/InputField';
import LoginButton from '../components/LoginBtn';
import GoogleButton from '../components/GoogleBtn';
import { login } from '../services/authService';

const LoginScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    console.log("LOGIN BUTTON PRESSED");

    const userRole: 'student' | 'admin' =
      email === 'admin' ? 'admin' : 'student';

    if (userRole === 'admin') {
      navigation.replace('AdminStack');
    } else {
      console.log("NAVIGATING TO DASHBOARD");
      navigation.replace('StudentStack');
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
              // TODO: integrate Google Auth
            }}
          />
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default LoginScreen;