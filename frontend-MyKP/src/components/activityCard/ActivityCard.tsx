// src/components/activityCard/ActivityCard.tsx

import { View, Text, Image, Pressable } from "react-native";
import Badge from "../badge/Badge";
import { styles } from "../activityCard/styles/ActivityCard.styles";

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
  return (
    <Pressable onPress={onPress} style={styles.container}>
      <Image source={image} style={styles.image} />

      {rightAction && <View style={styles.action}>{rightAction}</View>}

      <Text style={styles.title} numberOfLines={2}>
        {title}
      </Text>

      <View style={styles.badges}>
        <Badge label={type} variant="outline" />
        <Badge label={`${points} KP`} variant="primary" />
      </View>

      <Text style={styles.date}>{date}</Text>
    </Pressable>
  );
}