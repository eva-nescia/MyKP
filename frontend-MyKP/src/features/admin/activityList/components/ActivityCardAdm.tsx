import Swipeable from "react-native-gesture-handler/ReanimatedSwipeable";

import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";

import Badge from "@/components/badge/Badge";

import SwipeAction from "src/features/admin/activityList/components/SwipeAction";

import styles from "./styles/ActivityCardAdm.styles";

type Props = {
  title: string;
  image: any;
  type: string;
  points: number;
  date: string;

  onPress?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
};

export default function ActivityCardAdm({
  title,
  image,
  type,
  points,
  date,
  onPress,
  onEdit,
  onDelete,
}: Props) {
  const radius = useSharedValue(14);

  const animatedCardStyle =
    useAnimatedStyle(() => {
      return {
        borderTopRightRadius:
          withTiming(radius.value, {
            duration: 180,
          }),

        borderBottomRightRadius:
          withTiming(radius.value, {
            duration: 180,
          }),
      };
    });

  const handleDelete = () => {
    Alert.alert(
      "Delete Activity",

      "Are you sure you want to delete this activity? This action cannot be undone.",

      [
        {
          text: "Cancel",
          style: "cancel",
        },

        {
          text: "Delete",
          style: "destructive",

          onPress: () => {
            onDelete?.();
          },
        },
      ]
    );
  };

  return (
    <Swipeable
    overshootRight={false}

    friction={1.7}

    rightThreshold={40}

    onSwipeableWillOpen={() => {
        radius.value = 0;
    }}

    onSwipeableWillClose={() => {
        radius.value = 14;
    }}

    renderRightActions={() => (
        <SwipeAction
        onEdit={() => onEdit?.()}
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
        onPress={onPress}
        activeOpacity={0.92}
        >
        <Image
            source={image}
            style={styles.image}
        />

        <View style={styles.content}>
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
        </TouchableOpacity>
    </Animated.View>
    </Swipeable>
  );
}