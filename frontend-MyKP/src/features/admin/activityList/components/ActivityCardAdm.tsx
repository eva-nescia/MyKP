import { useRef } from "react";

import Swipeable from "react-native-gesture-handler/ReanimatedSwipeable";

import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import {
  Text,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import Badge from "@/components/badge/Badge";
import SwipeAction from "src/features/admin/activityList/components/SwipeAction";

import styles from "./styles/ActivityCardAdm.styles";

let openedSwipeable: any = null;

type Props = {
  title: string;
  image: any;
  type: string;
  points: number;
  date: string;
  onEdit?: () => void;
  onDelete?: () => void;
};

export default function ActivityCardAdm({
  title,
  image,
  type,
  points,
  date,
  onEdit,
  onDelete,
}: Props) {
  const swipeableRef = useRef<any>(null);
  const radius = useSharedValue(18);

  const closeActions = () => {
    swipeableRef.current?.close();

    if (openedSwipeable === swipeableRef.current) {
      openedSwipeable = null;
    }
  };

  const openActions = () => {
    if (
      openedSwipeable &&
      openedSwipeable !== swipeableRef.current
    ) {
      openedSwipeable.close();
    }

    openedSwipeable = swipeableRef.current;
    swipeableRef.current?.openRight();
  };

  const parsedDate = new Date(date);

  const formattedDate = isNaN(parsedDate.getTime())
    ? date
    : parsedDate.toLocaleDateString("en-GB", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      });

  const animatedCardStyle = useAnimatedStyle(() => ({
    borderTopRightRadius: withTiming(radius.value, {
      duration: 240,
    }),
    borderBottomRightRadius: withTiming(radius.value, {
      duration: 240,
    }),
  }));

  const handleDelete = () => {
    Alert.alert(
      "Delete Activity",
      "Are you sure you want to delete this activity? This action cannot be undone.",
      [
        {
          text: "Cancel",
          style: "cancel",
          onPress: closeActions,
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            closeActions();
            onDelete?.();
          },
        },
      ]
    );
  };

  return (
   <Swipeable
      ref={swipeableRef}
      overshootRight={false}
      friction={1.15}
      rightThreshold={38}
      dragOffsetFromRightEdge={8}
      onSwipeableWillOpen={() => {
        if (
          openedSwipeable &&
          openedSwipeable !== swipeableRef.current
        ) {
          openedSwipeable.close();
        }

        openedSwipeable = swipeableRef.current;
        radius.value = 0;
      }}
      onSwipeableWillClose={() => {
        if (openedSwipeable === swipeableRef.current) {
          openedSwipeable = null;
        }

        radius.value = 18;
      }}
      renderRightActions={() => (
        <SwipeAction
          onEdit={() => {
            closeActions();
            onEdit?.();
          }}
          onDelete={handleDelete}
        />
      )}
    >
      <Animated.View
        style={[
          styles.card,
          animatedCardStyle,
        ]}
      >
        <TouchableOpacity
          style={styles.touchable}
          onPress={openActions}
          activeOpacity={0.92}
        >
          <Image
            source={image}
            style={styles.image}
          />

          <Animated.View style={styles.content}>
            <Text
              style={styles.title}
              numberOfLines={2}
            >
              {title}
            </Text>

            <Animated.View style={styles.dateRow}>
              <Ionicons
                name="calendar-outline"
                size={13}
                color="#94A3B8"
              />

              <Text style={styles.date}>
                {formattedDate}
              </Text>
            </Animated.View>

            <Animated.View style={styles.badges}>
              <Badge
                label={type}
                variant="outline"
              />

              <Badge
                label={`${points} KP`}
                variant="primary"
              />
            </Animated.View>
          </Animated.View>
        </TouchableOpacity>
      </Animated.View>
    </Swipeable>
  );
}