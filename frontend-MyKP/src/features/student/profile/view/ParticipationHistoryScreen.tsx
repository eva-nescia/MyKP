import {
  View,
  Text,
  Image,
} from "react-native";

import styles from "../view/styles/ParticipationHistory.styles";

type Props = {
  item: {
    id: number;
    title: string;
    date: string;
    kp: string;
    status: "Completed" | "On Progress";
    image: any;
  };
};

export default function ParticipationCard({
  item,
}: Props) {
  return (
    <View style={styles.card}>
      <Image
        source={item.image}
        style={styles.image}
      />

      <View style={styles.content}>
        <View>
          <Text style={styles.title}>
            {item.title}
          </Text>

          <Text style={styles.date}>
            {item.date}
          </Text>
        </View>

        <View style={styles.badgeRow}>
          <View style={styles.kpBadge}>
            <Text style={styles.kpText}>
              {item.kp}
            </Text>
          </View>

          <View
            style={[
              styles.statusBadge,
              item.status === "Completed"
                ? styles.completed
                : styles.progress,
            ]}
          >
            <Text style={styles.statusText}>
              {item.status}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}