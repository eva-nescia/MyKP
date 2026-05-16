import {
  View,
  ScrollView,
  ActivityIndicator,
  Text,
} from "react-native";
import { useEffect, useRef } from "react";

import Header from "@/features/admin/form-activity/components/header/Header";
import StepProgress from "@/features/admin/form-activity/components/stepper/StepProgress";
import StepNavigation from "@/features/admin/form-activity/components/navigation/StepNavigation";

import BasicInfoSection from "@/features/admin/form-activity/components/step-content/StepBasicInfo";
import ScheduleSection from "@/features/admin/form-activity/components/step-content/StepSchedule";
import PublishSection from "@/features/admin/form-activity/components/step-content/StepRequirements";

import ConfirmPublishModal from "@/features/admin/form-activity/components/feedback/ConfirmPublishModal";
import ConfirmDiscardModal from "@/features/admin/form-activity/components/feedback/ConfirmDiscardModal";

import { useAddActivityViewModel } from "@/features/admin/form-activity/viewmodel/useAddActivityViewModel";

import { styles } from "@/features/admin/form-activity/view/styles/AddActivity.styles";
import { loadingStyles } from "src/components/loading/styles/Loading.styles";

export default function AddActivityScreen() {
  const vm = useAddActivityViewModel();

  const scrollRef = useRef<ScrollView>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      y: 0,
      animated: false,
    });
  }, [vm.step]);

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
    <View style={styles.container}>
      <Header
        title={vm.isEditMode ? "Edit Activity" : "Add New Activity"}
        onBack={vm.handleBackPress}
      />

      <StepProgress currentStep={vm.step} />

      <ScrollView
        ref={scrollRef}
        style={styles.scroll}
        contentContainerStyle={styles.content}
      >
        {renderStep()}
      </ScrollView>

      <StepNavigation
        step={vm.step}
        isEditMode={vm.isEditMode}
        onBack={vm.prevStep}
        onNext={vm.nextStep}
        onSubmit={vm.handlePublish}
      />

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

      {vm.loading && (
        <View style={loadingStyles.overlay}>
          <View style={loadingStyles.card}>
            <ActivityIndicator size="large" color="#fff" />

            <Text style={loadingStyles.title}>
              {vm.isEditMode ? "Saving Changes" : "Publishing"}
            </Text>

            <Text style={loadingStyles.subtitle}>
              Please wait...
            </Text>
          </View>
        </View>
      )}
    </View>
  );
}