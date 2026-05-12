import { View, Text, Image } from "react-native";

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
  return (
    <View style={styles.card}>
      <Image
        source={image}
        style={styles.image}
      />

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
            label={kp}
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