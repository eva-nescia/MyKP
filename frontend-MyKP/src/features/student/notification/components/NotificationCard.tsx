import { View, Text } from "react-native";

import {
  Bell,
  Clock3,
  Check,
} from "lucide-react-native";

import styles from "src/features/student/notification/components/styles/NotificationCard.styles";

type Props = {
  item: {
    id: number;
    type: string;
    title: string;
    description: string;
    time: string;
  };
};

export default function NotificationCard({
  item,
}: Props) {
  const renderIcon = () => {
    if (item.type === "success") {
      return (
        <Check
          size={34}
          color="#F28C28"
        />
      );
    }

    if (item.type === "notification") {
      return (
        <Bell
          size={34}
          color="#F28C28"
        />
      );
    }

    return (
      <Clock3
        size={34}
        color="#F28C28"
      />
    );
  };

  return (
    <View style={styles.card}>
      <View style={styles.iconContainer}>
        {renderIcon()}
      </View>

      <View style={styles.content}>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>
            {item.type === "notification"
              ? "Notification"
              : "Reminder"}
          </Text>
        </View>

        <Text style={styles.title}>
          {item.title}
        </Text>

        <Text style={styles.description}>
          {item.description}
        </Text>

        <Text style={styles.time}>
          ◷ {item.time}
        </Text>
      </View>
    </View>
  );
}