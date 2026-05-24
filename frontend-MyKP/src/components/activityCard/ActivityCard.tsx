import { View, Text, Image, Pressable } from "react-native";
import Badge from "../badge/Badge";
import { styles } from "../activityCard/styles/ActivityCard.styles";
import { Ionicons } from "@expo/vector-icons";

interface Props {
  title: string;
  image: any;
  type: string;
  points: number;
  date: string;
  onPress?: () => void;
  rightAction?: React.ReactNode;
}

export default function ActivityCard({
    title,
    image,
    type,
    points,
    date,
    onPress,
    rightAction,
  }: Props) {

    const formattedDate = new Date(date).toLocaleDateString(
      "en-GB",
      {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      }
    );

    return (
    <Pressable onPress={onPress} style={styles.container}>
      <Image source={image} style={styles.image} />

      {rightAction && <View style={styles.action}>{rightAction}</View>}

      <Text style={styles.title} numberOfLines={2}>
        {title}
      </Text>

      <View style={styles.dateRow}>
        <Ionicons
          name="calendar-outline"
          size={13}
          color="#94A3B8"
        />

       <Text
        style={styles.date}
        numberOfLines={1}
      >
        {formattedDate}
      </Text>
      </View>

      <View style={styles.badges}>
        <Badge label={type} variant="outline" />
        <Badge label={`${points} KP`} variant="primary" />
      </View>

    </Pressable>
  );
}