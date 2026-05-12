import { View, Text, Image, Pressable } from "react-native";
import { useRouter } from "expo-router";
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
        <View style={styles.organizerRow}>
          <View style={styles.orangeDot} />

          <Text style={styles.organizerText}>
            Posted by {organizer}
          </Text>
        </View>

        <Text style={styles.title}>
          {title}
        </Text>

        <Text style={styles.date}>
          {date}
        </Text>

        <View style={styles.badges}>
          <Badge
            label={type}
            variant="outline"
          />

          <Badge
            label={`${points} KP`}
            variant="primary"
          />
        </View>
      </View>
    </Pressable>
  );
}