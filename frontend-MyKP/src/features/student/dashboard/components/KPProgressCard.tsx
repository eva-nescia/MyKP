import { View, Text, StyleSheet } from "react-native";
import ProgressBar from "@/features/student/dashboard/components/ProgressBar";

import { COLORS } from "@/constants/colors";
import { FONT_WEIGHT } from "@/constants/typography";

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

const styles = StyleSheet.create({
  card: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: COLORS.primary,
    backgroundColor: COLORS.white,
    marginBottom: 20,
  },

  title: { 
    marginBottom: 0,
    fontSize: 20,
    fontWeight: FONT_WEIGHT.semiBold, 
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },

  value: { 
    fontSize: 50, 
    fontWeight: FONT_WEIGHT.bold, 
    color: COLORS.primary 
  },

  remaining: { 
    fontSize: 16,
    color: COLORS.text,
    marginTop: 50,
  },
});