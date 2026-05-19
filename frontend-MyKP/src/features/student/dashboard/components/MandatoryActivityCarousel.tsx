import { useState } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  Dimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Pressable,
} from "react-native";

import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

import { styles } from "src/features/student/dashboard/components/styles/MandatoryActivityCarousel";
import type { Activity } from "src/models/activity";
import EmptyMandatoryActivity from "./EmptyMandatoryActivity";

type Props = {
  data: Activity[];
};

const { width } = Dimensions.get("window");

const ITEM_WIDTH = width * 0.4;
const ITEM_SPACING = 18;
const SNAP_INTERVAL = ITEM_WIDTH + ITEM_SPACING;

export default function MandatoryActivityCarousel({
  data,
}: Props) {
  const [activeIndex, setActiveIndex] =
    useState(0);

  const activeItem = data[activeIndex];

  const handleScrollEnd = (
    event: NativeSyntheticEvent<NativeScrollEvent>
  ) => {
    const index = Math.round(
      event.nativeEvent.contentOffset.x /
        SNAP_INTERVAL
    );

    setActiveIndex(
      Math.max(
        0,
        Math.min(index, data.length - 1)
      )
    );
  };

  if (!data.length) {
    return <EmptyMandatoryActivity />;
  }

  return (
    <LinearGradient
      colors={["#FFFFFF", "#FFF7D6"]}
      style={styles.section}
    >
      <FlatList
        data={data}
        horizontal
        keyExtractor={(item) => item.id}
        scrollEnabled={data.length > 1}
        showsHorizontalScrollIndicator={false}
        snapToInterval={SNAP_INTERVAL}
        decelerationRate="fast"
        onMomentumScrollEnd={handleScrollEnd}
        contentContainerStyle={{
          paddingHorizontal:
            (width - ITEM_WIDTH) / 2,
        }}
        ItemSeparatorComponent={() => (
          <View style={{ width: ITEM_SPACING }} />
        )}
        renderItem={({ item }) => (
          <Pressable
            style={styles.posterWrapper}
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
            <Image
              source={item.image}
              style={[
                styles.poster,
                {
                  width: ITEM_WIDTH,
                  height: ITEM_WIDTH * 1.48,
                },
              ]}
            />
          </Pressable>
        )}
      />

      <View style={styles.info}>
        <Text
          style={styles.title}
          numberOfLines={2}
        >
          {activeItem.title}
        </Text>

        <View style={styles.dateRow}>
          <Ionicons
            name="calendar-outline"
            size={13}
            color="#94A3B8"
            style={{ marginBottom: 10 }}
          />

          <Text style={styles.date}>
            {activeItem.date ||
              "No date available"}
          </Text>
        </View>

        <View style={styles.badgeRow}>
          <View style={styles.typeBadge}>
            <Text
              style={styles.typeText}
              numberOfLines={1}
            >
              {activeItem.type}
            </Text>
          </View>

          <View style={styles.pointBadge}>
            <Text style={styles.pointText}>
              {activeItem.points} KP
            </Text>
          </View>
        </View>
      </View>
    </LinearGradient>
  );
}