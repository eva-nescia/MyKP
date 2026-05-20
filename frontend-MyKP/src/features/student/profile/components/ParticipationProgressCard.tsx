import { View, Text } from "react-native";

import styles from "src/features/student/profile/components/styles/ParticipationProgressCard.styles";

type Props = {
  current: number;
  target: number;
  percentage: number;
};

export default function ParticipationProgressCard({
  current,
  target,
  percentage,
}: Props) {
  return (
    <View style={styles.progressCard}>
      <View style={styles.progressInfo}>
        <Text style={styles.point}>
          {current}/{target} 
        </Text>

        <Text style={styles.percentage}>
          {Math.round(percentage)}%
        </Text>
      </View>

      <View style={styles.progressBarBackground}>
        <View
          style={[
            styles.progressBarFill,
            {
              width: `${percentage}%`,
            },
          ]}
        />
      </View>

      <Text style={styles.progressFooter}>
        {Math.max(target - current, 0)} KP remaining
      </Text>
    </View>
  );
}