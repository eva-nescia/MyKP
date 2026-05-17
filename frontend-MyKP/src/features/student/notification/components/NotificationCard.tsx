import { View, Text } from "react-native";

import {
  Bell,
  Clock3,
  CheckCheck,
} from "lucide-react-native";

import styles from "./styles/NotificationCard.styles";

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
    <View style={styles.card}>
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
    </View>
  );
}