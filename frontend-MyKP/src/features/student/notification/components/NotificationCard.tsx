import {
  View,
  Text,
  Pressable,
} from "react-native";

import { useRouter } from "expo-router";

import {
  Bell,
  Clock3,
  CheckCheck,
} from "lucide-react-native";

import styles from "./styles/NotificationCard.styles";
import type { NotificationItem } from "../services/notificationService";

type Props = {
  item: NotificationItem;
};

export default function NotificationCard({
  item,
}: Props) {
  const router = useRouter();

  const getTypeStyle = () => {
    if (item.type === "success") {
      return {
        iconBg: "#ECFDF5",
        iconColor: "#16A34A",
        badgeBg: "#DCFCE7",
        badgeText: "#15803D",
      };
    }

    if (item.type === "notification") {
      return {
        iconBg: "#EFF6FF",
        iconColor: "#2563EB",
        badgeBg: "#DBEAFE",
        badgeText: "#1D4ED8",
      };
    }

    return {
      iconBg: "#FFF7ED",
      iconColor: "#F28C28",
      badgeBg: "#FEF3C7",
      badgeText: "#C97A04",
    };
  };

  const typeStyle = getTypeStyle();

  const renderIcon = () => {
    if (item.type === "success") {
      return (
        <CheckCheck
          size={20}
          color={typeStyle.iconColor}
        />
      );
    }

    if (item.type === "notification") {
      return (
        <Bell
          size={20}
          color={typeStyle.iconColor}
        />
      );
    }

    return (
      <Clock3
        size={20}
        color={typeStyle.iconColor}
      />
    );
  };

  const badgeLabel =
    item.type === "notification"
      ? "Notification"
      : item.type === "success"
      ? "Success"
      : "Reminder";

  return (
    <Pressable
      style={({ pressed }) => [
        styles.card,
        pressed && styles.cardPressed,
      ]}
      disabled={!item.activityId}
      accessibilityRole={item.activityId ? "button" : undefined}
      onPress={() => {
        if (!item.activityId) return;

        router.push({
          pathname: "/activity-details/details",
          params: { id: item.activityId },
        });
      }}
    >
      <View
        style={[
          styles.iconContainer,
          {
            backgroundColor:
              typeStyle.iconBg,
          },
        ]}
      >
        {renderIcon()}
      </View>

     <View style={styles.content}>
      <View style={styles.topRow}>
        <Text
          style={styles.title}
          numberOfLines={2}
        >
          {item.title}
        </Text>

        <View
          style={[
            styles.badge,
            {
              backgroundColor:
                typeStyle.badgeBg,
            },
          ]}
        >
          <Text
            style={[
              styles.badgeText,
              {
                color:
                  typeStyle.badgeText,
              },
            ]}
          >
            {badgeLabel}
          </Text>
        </View>
      </View>

      <Text
        style={styles.description}
        numberOfLines={2}
      >
        {item.description}
      </Text>

      <Text style={styles.time}>
        {item.time}
      </Text>
    </View>
    </Pressable>
  );
}
