import {
  View,
  Text,
  Pressable,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

import { COLORS } from "@/constants/colors";
import type { Activity } from "@/features/student/activity-list-stu/model/types";

import styles from "src/features/student/dashboard/components/styles/UpcomingActivities.styles";

type Props = {
  data: Activity[];
};

const MONTH_INDEX: Record<string, number> = {
  january: 0,
  february: 1,
  march: 2,
  april: 3,
  may: 4,
  june: 5,
  july: 6,
  august: 7,
  september: 8,
  october: 9,
  november: 10,
  december: 11,
};

const parseActivityDate = (date: string) => {
  const normalized = date.replace(",", "");
  const parts = normalized.split(/\s+/);
  const day = Number(parts[1]);
  const month = MONTH_INDEX[parts[2]?.toLowerCase()];
  const year = Number(parts[3]);

  if (
    Number.isNaN(day) ||
    month === undefined ||
    Number.isNaN(year)
  ) {
    return Number.POSITIVE_INFINITY;
  }

  return new Date(year, month, day).getTime();
};

export default function UpcomingActivities({
  data,
}: Props) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const upcomingActivities = data
    .filter((item) => {
      const activityDate = parseActivityDate(item.date);

      return (
        activityDate !== Number.POSITIVE_INFINITY &&
        activityDate >= today.getTime()
      );
    })
    .sort(
      (a, b) =>
        parseActivityDate(a.date) -
        parseActivityDate(b.date)
    )
    .slice(0, 3);

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>
        Upcoming Activities
      </Text>

      {upcomingActivities.map((item) => (
        <Pressable
          key={item.id}
          style={styles.card}
          onPress={() =>
            router.push({
              pathname:
                "/activity-details/details",
              params: {
                id: item.id,
              },
            })
          }
        >
          <View style={styles.iconContainer}>
            <Ionicons
              name="calendar-outline"
              size={22}
              color={COLORS.primary}
            />
          </View>

         <View style={styles.content}>
            <Text style={styles.title} numberOfLines={2}>
                {item.title}
            </Text>

            <View style={styles.dateRow}>
                <Ionicons
                name="calendar-outline"
                size={14}
                color="#94A3B8"
                />

                <Text style={styles.date}>
                {item.date}
                </Text>
            </View>

            <View style={styles.badgeRow}>
                <View style={styles.categoryBadge}>
                <Text style={styles.categoryText} numberOfLines={1}>
                    {item.type}
                </Text>
                </View>

                <View style={styles.pointBadge}>
                <Text style={styles.pointText}>
                    {item.points} KP
                </Text>
                </View>
            </View>
            </View>

            <Ionicons
            name="chevron-forward"
            size={18}
            color="#CBD5E1"
            />
        </Pressable>
      ))}
    </View>
  );
}
