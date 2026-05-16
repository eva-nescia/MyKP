import { View, Text, Pressable } from "react-native";

import { styles } from "@/features/admin/form-activity/components/navigation/styles/StepNavigation.styles";

interface Props {
  step: number;

  isEditMode: boolean;

  onBack: () => void;
  onNext: () => void;
  onSubmit: () => void;
}

export default function StepNavigation({
  step,
  isEditMode,

  onBack,
  onNext,
  onSubmit,
}: Props) {
  const isFirstStep = step === 0;
  const isLastStep = step === 2;

  return (
    <View style={styles.container}>
      {!isFirstStep && (
        <Pressable
          style={styles.backBtn}
          onPress={onBack}
        >
          <Text style={styles.backText}>
            Back
          </Text>
        </Pressable>
      )}

      <Pressable
        style={[
          styles.nextBtn,
          isFirstStep && styles.fullWidth,
        ]}
        onPress={
          isLastStep
            ? onSubmit
            : onNext
        }
      >
        <Text style={styles.nextText}>
          {isLastStep
            ? isEditMode
              ? "Save Changes"
              : "Publish"
            : "Next"}
        </Text>
      </Pressable>
    </View>
  );
}