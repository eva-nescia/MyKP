import React from "react";

import {
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from "react-native";


import GoogleIcon from "../../../../assets/images/icon/google_icon.svg";

import { styles } from "./styles/Login.styles";

import InputField from "../components/InputField";
import LoginButton from "../components/LoginBtn";
import GoogleButton from "../components/GoogleBtn";
import AuthFeedbackModal from "../components/feedback/AuthFeedbackModal";

import useLoginViewModel from "../viewmodel/useLoginViewModel";

const LoginScreen = () => {
  const vm = useLoginViewModel();

  return (
    <View
      style={styles.container}
      // edges={["top"]}
    >
      <TouchableWithoutFeedback
        onPress={Keyboard.dismiss}
      >
        <KeyboardAvoidingView
          style={styles.container}
          behavior={
            Platform.OS === "ios"
              ? "padding"
              : "height"
          }
          keyboardVerticalOffset={0}
        >
        
         <ScrollView
            bounces={false}
            keyboardShouldPersistTaps="handled"
            keyboardDismissMode="interactive"
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
          >
  
            {/* header */}
            <View style={styles.header}>
              <Image
                source={require("../../../../assets/images/campus/ucm.jpg")}
                style={styles.backgroundImage}
              />

              <View style={styles.overlay} />

              <View style={styles.logoContainer}>
                <Image
                  source={require("../../../../assets/images/uc_logo.png")}
                  style={styles.logo}
                />
              </View>
            </View>

            {/* form */}
            <View style={styles.formContainer}>
              <Text style={styles.title}>
                Log In
              </Text>

              <Text style={styles.subtitle}>
                Welcome! Please enter your details.
              </Text>

              <InputField
                label="Email"
                value={vm.email}
                onChangeText={vm.setEmail}
                placeholder="Enter your email"
                labelStyle={styles.inputLabel}
              />

              <InputField
                label="Password"
                value={vm.password}
                onChangeText={vm.setPassword}
                placeholder="Enter your password"
                secureTextEntry
                labelStyle={styles.inputLabel}
              />

              <LoginButton
                title="Login"
                onPress={vm.handleLogin}
              />

              {/* divider */}
              <View
                style={
                  styles.dividerContainer
                }
              >
                <View style={styles.line} />

                <Text
                  style={
                    styles.dividerText
                  }
                >
                  or
                </Text>

                <View style={styles.line} />
              </View>

              {/* Google login button — UI only; functionality temporarily disabled */}
              <GoogleButton
                title="Continue with Google"
                Icon={GoogleIcon}
                onPress={
                  vm.handleGoogleSignIn
                }
              />
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
      <AuthFeedbackModal
        visible={vm.feedbackVisible}
        title={vm.feedbackTitle}
        message={vm.feedbackMessage}
        type={vm.feedbackType}
        onClose={() => vm.setFeedbackVisible(false)}
      />
    </View>
  );
};

export default LoginScreen;