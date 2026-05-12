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
  const percentage =
    (item.current / item.target) * 100;

  const completed =
    item.current >= item.target;

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.row}>
        <Text style={styles.title}>
          {item.title}
        </Text>

        <Text style={styles.point}>
          {item.current}/{item.target}
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

      <Text
        style={[
          styles.status,
          completed &&
            styles.completed,
        ]}
      >
        {completed
          ? "Completed"
          : "On Progress"}
      </Text>
    </TouchableOpacity>
  );
}