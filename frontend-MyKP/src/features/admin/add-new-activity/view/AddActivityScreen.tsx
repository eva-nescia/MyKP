import { View, ScrollView, ActivityIndicator, Text } from "react-native";

import Header from "src/features/admin/add-new-activity/components/header/Header";
import StepProgress from "src/features/admin/add-new-activity/components/stepper/StepProgress";
import StepNavigation from "src/features/admin/add-new-activity/components/navigation/StepNavigation";

import BasicInfoSection from "src/features/admin/add-new-activity/components/step-content/StepBasicInfo";
import ScheduleSection from "src/features/admin/add-new-activity/components/step-content/StepSchedule";
import PublishSection from "@/features/admin/add-new-activity/components/step-content/StepRequirements";

import ConfirmPublishModal from "src/features/admin/add-new-activity/components/feedback/ConfirmPublishModal";

import { useAddActivityViewModel } from "@/features/admin/add-new-activity/viewmodel/useAddActivityViewModel";

import { styles } from "src/features/admin/add-new-activity/view/styles/AddActivity.styles";
import { loadingStyles } from "src/components/loading/styles/Loading.styles";

export default function AddActivityScreen() {
  const vm = useAddActivityViewModel();

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
      <Header />

      <StepProgress currentStep={vm.step} />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
      >
        {renderStep()}
      </ScrollView>

      <StepNavigation
        step={vm.step}
        onBack={vm.prevStep}
        onNext={vm.nextStep}
        onSubmit={vm.handlePublish}
      />

      {/* MODAL */}
      <ConfirmPublishModal
        visible={vm.showConfirm}
        onCancel={() => vm.setShowConfirm(false)}
        onConfirm={vm.confirmPublish}
      />

      {/* LOADING */}
      {vm.loading && (
        <View style={loadingStyles.overlay}>
          <View style={loadingStyles.card}>
            <ActivityIndicator size="large" color="#fff" />

            <Text style={loadingStyles.title}>
              Publishing
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