import {
  View,
  Text,
  TouchableOpacity,
} from "react-native";

import styles from "@/features/student/profile/components/styles/KPProgressCard.styles";

type Props = {
  item: {
    id: number;
    title: string;
    current: number;
    target: number;
  };

  onPress: () => void;
};

export default function KPProgressCard({
  item,
  onPress,
}: Props) {
  const percentage = Math.min(
    (item.current / item.target) * 100,
    100
  );

  const completed =
    item.current >= item.target;

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      activeOpacity={0.85}
    >
      <View style={styles.topRow}>
        <Text
          style={styles.title}
          numberOfLines={2}
        >
          {item.title}
        </Text>

        <View
          style={[
            styles.statusBadge,
            completed &&
              styles.completedBadge,
          ]}
        >
          <Text
            style={[
              styles.statusText,
              completed &&
                styles.completedText,
            ]}
          >
            {completed
              ? "Completed"
              : "On Progress"}
          </Text>
        </View>
      </View>

      <View style={styles.progressInfo}>
        <Text style={styles.point}>
          {item.current}/{item.target} 
        </Text>

        <Text style={styles.percentage}>
          {Math.round(percentage)}%
        </Text>
      </View>

      <View style={styles.progressBackground}>
        <View
          style={[
            styles.progressFill,
            {
              width: `${percentage}%`,
            },
          ]}
        />
      </View>

      <Text style={styles.progressFooter}>
        {Math.max(
          item.target - item.current,
          0
        )} KP remaining
      </Text>
    </TouchableOpacity>
  );
}