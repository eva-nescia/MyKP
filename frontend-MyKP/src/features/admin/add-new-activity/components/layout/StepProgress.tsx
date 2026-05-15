import { View } from "react-native";
import { styles } from "src/features/admin/add-new-activity/components/styles/StepProgress.styles";

interface Props {
  step: number;
}

export default function StepProgress({
  step,
}: Props) {
  return (
    <View style={styles.container}>
      {[0, 1, 2].map((item) => (
        <View
          key={item}
          style={[
            styles.dot,
            item <= step && styles.active,
          ]}
        />
      ))}
    </View>
  );
}