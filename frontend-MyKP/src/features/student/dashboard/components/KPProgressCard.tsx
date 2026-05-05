import { View, Text, StyleSheet } from "react-native";
import ProgressBar from "@/features/student/dashboard/components/ProgressBar";
import { styles } from "src/features/student/dashboard/components/styles/KPProgressCard.styles";

interface Props {
  progress: number;
  total: number;
}

export default function KPProgressCard({ progress, total }: Props) {
  const percentage = (progress / total) * 100;

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Your KP Progress</Text>

      <View style={styles.row}>
        <Text style={styles.value}>
          {progress}/{total}
        </Text>
        <Text style={styles.remaining}>
          {total - progress} KP remaining
        </Text>
      </View>

      <ProgressBar progress={percentage} />
    </View>
  );
}