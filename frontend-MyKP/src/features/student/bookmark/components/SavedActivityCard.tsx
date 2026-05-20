import {
  View,
  Text,
  Image,
  Pressable,
} from "react-native";

import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import Badge from "@/components/badge/Badge";

import styles from "./styles/SavedActivityCard.styles";

type Props = {
  id: string;
  title: string;
  organizer: string;
  date: string;
  points: string;
  type: string;
  image: any;
};

export default function SavedActivityCard({
  id,
  title,
  organizer,
  date,
  points,
  type,
  image,
}: Props) {
  const router = useRouter();

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
    <Pressable
      style={styles.card}
      onPress={() =>
        router.push({
          pathname: "/activity-details/details",
          params: { id },
        })
      }
    >
      <Image source={image} style={styles.image} />

      <View style={styles.content}>
        <Text
          style={styles.title}
          numberOfLines={2}
        >
          {title}
        </Text>

        <Text
          style={styles.organizerText}
          numberOfLines={1}
        >
          Organized by {organizer}
        </Text>

        <View style={styles.dateRow}>
          <Ionicons
            name="calendar-outline"
            size={13}
            color="#94A3B8"
          />

          <Text style={styles.date}>
            {formattedDate}
          </Text>
        </View>

        <View style={styles.badges}>
          <Badge label={type} variant="outline" />
          <Badge label={`${points} KP`} variant="primary" />
        </View>
      </View>
    </Pressable>
  );
}