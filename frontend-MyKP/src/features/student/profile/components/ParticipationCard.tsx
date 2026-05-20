import {
  View,
  Text,
  Image,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import Badge from "src/features/student/profile/components/Badge";

import styles from "./styles/ParticipationCard.styles";

type Props = {
  title: string;
  date: string;
  kp: string;
  organizer: string;
  image: any;

  status: "Completed" | "On Progress";
};

export default function ParticipationCard({
  title,
  date,
  kp,
  organizer,
  image,
  status,
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
    <View style={styles.card}>
      <Image
        source={image}
        style={styles.image}
      />

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
          <Badge
            label={`${kp} KP`}
            variant="outline"
          />

          <Badge
            label={status}
            variant={
              status === "Completed"
                ? "success"
                : "warning"
            }
          />
        </View>
      </View>
    </View>
  );
}