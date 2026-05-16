import { View, Pressable, Text } from "react-native";
import { styles } from "@/features/admin/form-activity/components/styles/BottomStepper.styles";

interface Props {
  step: number;
  onNext: () => void;
  onBack: () => void;
}

export default function BottomStepper({
  step,
  onNext,
  onBack,
}: Props) {
  return (
    <View style={styles.container}>
      {step > 0 ? (
        <Pressable
          style={styles.backBtn}
          onPress={onBack}
        >
          <Text style={styles.backText}>
            Back
          </Text>
        </Pressable>
      ) : (
        <View />
      )}

      <Pressable
        style={styles.nextBtn}
        onPress={onNext}
      >
        <Text style={styles.nextText}>
          {step === 2 ? "Requirement" : "Next"}
        </Text>
      </Pressable>
    </View>
  );
}