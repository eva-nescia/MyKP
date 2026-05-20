import { View, Text } from "react-native";

import { styles } from "@/features/student/bookmark/components/styles/SavedHeader.styles";

type Props = {
  count: number;
};

export default function SavedHeader({
  count,
}: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.title}>
          Saved Activities
        </Text>

        <Text style={styles.subtitle}>
          Your bookmarked activities •{" "}
          {count}{" "}
          {count === 1
            ? "activity"
            : "activities"}
        </Text>
      </View>
    </View>
  );
}