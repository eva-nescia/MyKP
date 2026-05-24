import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from "react-native";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import React, { useEffect, useRef, useState } from "react";

import StepProgress from "@/features/admin/form-activity/components/stepper/StepProgress";
import StepNavigation from "@/features/admin/form-activity/components/navigation/StepNavigation";

import BasicInfoSection from "@/features/admin/form-activity/components/step-content/StepBasicInfo";
import ScheduleSection from "@/features/admin/form-activity/components/step-content/StepSchedule";
import PublishSection from "@/features/admin/form-activity/components/step-content/StepRequirements";

import ConfirmPublishModal from "@/features/admin/form-activity/components/feedback/ConfirmPublishModal";
import ConfirmDiscardModal from "@/features/admin/form-activity/components/feedback/ConfirmDiscardModal";
import FormValidationModal from "../components/feedback/FormValidationModal";

import { useAddActivityViewModel } from "@/features/admin/form-activity/viewmodel/useAddActivityViewModel";

import { styles } from "@/features/admin/form-activity/view/styles/AddActivity.styles";

import FormActivityHeader from "../components/form/FormActivityHeader";
import { useGlobalLoading } from "@/hooks/useGlobalLoading";

export default function AddActivityScreen() {
  const vm = useAddActivityViewModel();

  const scrollRef = useRef<ScrollView>(null);

  const [keyboardVisible, setKeyboardVisible] =
    useState(false);

  useGlobalLoading(vm.loading);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      y: 0,
      animated: false,
    });
  }, [vm.step]);

  useEffect(() => {
    const showSub = Keyboard.addListener(
      "keyboardDidShow",
      () => setKeyboardVisible(true)
    );

    const hideSub = Keyboard.addListener(
      "keyboardDidHide",
      () => setKeyboardVisible(false)
    );

    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  const renderStep = () => {
    switch (vm.step) {
      case 0:
        return <BasicInfoSection />;
      case 1:
        return <ScheduleSection />;
      case 2:
        return <PublishSection />;
      default:
        return null;
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={
          Platform.OS === "ios"
            ? "padding"
            : undefined
        }
      >
        <View style={styles.container}>
          <FormActivityHeader
            title={
              vm.isEditMode
                ? "Edit Activity"
                : "Add New Activity"
            }
            onBack={vm.handleBackPress}
          />

          <StepProgress currentStep={vm.step} />

         <KeyboardAwareScrollView
            style={styles.scroll}
            contentContainerStyle={styles.content}
            keyboardShouldPersistTaps="handled"
            enableOnAndroid
            extraScrollHeight={120}
            showsVerticalScrollIndicator={false}
          >
            {renderStep()}
          </KeyboardAwareScrollView>
        </View>
      </KeyboardAvoidingView>

      {!keyboardVisible && (
        <StepNavigation
          step={vm.step}
          isEditMode={vm.isEditMode}
          onBack={vm.prevStep}
          onNext={vm.nextStep}
          onSubmit={vm.handlePublish}
        />
      )}

      <ConfirmPublishModal
        visible={vm.showConfirm}
        onCancel={() => vm.setShowConfirm(false)}
        onConfirm={vm.confirmPublish}
      />

      <ConfirmDiscardModal
        visible={vm.showDiscardConfirm}
        onCancel={() => vm.setShowDiscardConfirm(false)}
        onConfirm={vm.confirmDiscard}
      />

      <FormValidationModal
        visible={vm.showValidationModal}
        message={vm.validationMessage}
        onClose={() =>
          vm.setShowValidationModal(false)
        }
      />
    </View>
  );
}
