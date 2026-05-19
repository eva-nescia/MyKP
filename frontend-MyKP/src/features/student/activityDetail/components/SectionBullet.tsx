import { View, Text } from "react-native";
import styles from "src/features/student/activityDetail/components/styles/SectionBullet.styles";

type Props = {
  children: string;
};

export default function SectionBullet({
  children,
}: Props) {
  return (
    <View style={styles.row}>
      <View style={styles.dot} />

      <Text style={styles.text}>
        {children}
      </Text>
    </View>
  );
}