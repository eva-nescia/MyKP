import { View, Text } from "react-native";
import styles from "src/features/student/activityDetail/components/styles/Section.styles";

export default function Section({ title, children }: any) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {children}
    </View>
  );
}