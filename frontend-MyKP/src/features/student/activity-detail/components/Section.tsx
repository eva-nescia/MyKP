import { View, Text } from "react-native";
import styles from "@/features/student/activity-detail/components/styles/Section.styles";

export default function Section({ title, children }: any) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {children}
    </View>
  );
}