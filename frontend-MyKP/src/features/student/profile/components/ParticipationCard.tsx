import { View, Text, Image } from "react-native";

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
        <Text style={styles.organizer}>
          Posted by {organizer}
        </Text>

        <Text style={styles.title}>
          {title}
        </Text>

        <Text style={styles.date}>
          {date}
        </Text>

        <View style={styles.badges}>
          <View style={styles.kpBadge}>
            <Text style={styles.kpText}>
              {kp}
            </Text>
          </View>

          <View
            style={[
              styles.statusBadge,

              status === "Completed"
                ? styles.completed
                : styles.progress,
            ]}
          >
            <Text style={styles.statusText}>
              {status}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}