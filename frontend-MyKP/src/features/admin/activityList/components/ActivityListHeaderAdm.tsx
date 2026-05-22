import { View, Text } from "react-native";

import styles from "src/features/admin/activityList/components/styles/ActivityListHeaderAdm.styles";

type Props = {
  count: number;
};

export default function ActivityListHeaderAdm({
  count,
}: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.title}>
          Activity List
        </Text>

        <Text style={styles.subtitle}>
          Published announcements •{" "}
          {count}{" "}
          {count === 1
            ? "activity"
            : "activities"}{" "}
          found
        </Text>
      </View>
    </View>
  );
}