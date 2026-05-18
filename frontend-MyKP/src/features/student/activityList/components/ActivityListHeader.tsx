import { View, Text } from "react-native";

import { styles } from "./styles/ActivityListHeader.styles";

type Props = {
  count: number;
};

export default function ActivityListHeader({
  count,
}: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.title}>
          Activity List
        </Text>

        <Text style={styles.subtitle}>
          Official announcements • {count}{" "}
          {count === 1 ? "activity" : "activities"} found
        </Text>
      </View>
    </View>
  );
}