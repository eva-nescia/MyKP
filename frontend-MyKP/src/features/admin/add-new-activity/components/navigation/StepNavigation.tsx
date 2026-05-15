import { View, Text, Pressable } from "react-native";
import { styles } from "src/features/admin/add-new-activity/components/navigation/styles/StepNavigation.styles";

interface Props {
  step: number;

  onBack: () => void;
  onNext: () => void;
  onSubmit: () => void;
}

export default function StepNavigation({
  step,
  onBack,
  onNext,
  onSubmit,
}: Props) {
  return (
    <View style={styles.container}>
      <Pressable
        style={styles.backBtn}
        onPress={onBack}
      >
        <Text style={styles.backText}>
          Back
        </Text>
      </Pressable>

      {step === 2 ? (
        <Pressable
          style={styles.nextBtn}
          onPress={onSubmit}
        >
          <Text style={styles.nextText}>
            Publish
          </Text>
        </Pressable>
      ) : (
        <Pressable
          style={styles.nextBtn}
          onPress={onNext}
        >
          <Text style={styles.nextText}>
            Next
          </Text>
        </Pressable>
      )}
    </View>
  );
}