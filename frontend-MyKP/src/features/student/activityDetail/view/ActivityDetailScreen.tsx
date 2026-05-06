import {
  ScrollView,
  Text,
  Pressable,
  View,
  Image,
  Animated,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import * as Linking from "expo-linking";
import { useRef, useState } from "react";
import { Ionicons, Feather } from "@expo/vector-icons";

import { useActivityDetailViewModel } from "@/features/student/activityDetail/viewmodel/useActivityDetailViewModel";
import Section from "@/features/student/activityDetail/components/Section";
import styles from "@/features/student/activityDetail/view/styles/ActivityDetail.styles";

export default function ActivityDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { activity } = useActivityDetailViewModel(id as string);

  const [saved, setSaved] = useState(false);
  const scaleAnim = useRef(new Animated.Value(1)).current;

  if (!activity) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  const openLink = () => {
    if (activity.registrationLink) {
      Linking.openURL(activity.registrationLink);
    }
  };

  const handleSave = () => {
    setSaved(!saved);

    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1.15,
        duration: 120,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 120,
        useNativeDriver: true,
      }),
    ]).start();
  };

  return (
    <ScrollView style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()}>
            <Text>←</Text>
        </Pressable>
        <Text style={styles.headerTitle}>Activity Details</Text>
      </View>

      {/* TITLE */}
      <Text style={styles.title}>{activity.title}</Text>

      {/* ORGANIZER */}
      <Text style={styles.organizer}>
        ORGANIZED BY {activity.organizer}
      </Text>

      {/* IMAGE */}
      <Image source={activity.image} style={styles.imageFull} />

      {/* META CARD */}
      <View style={styles.metaCard}>
        {/* BADGES */}
        <View style={styles.badges}>
          <Text style={styles.badge}>{activity.type}</Text>
          <Text style={styles.badge}>{activity.points} KP</Text>

          {activity.eligibleStudyProgram && (
            <Text style={styles.badge}>
              {activity.eligibleStudyProgram}
            </Text>
          )}

          {activity.eligibleCohort && (
            <Text style={styles.badge}>
              {activity.eligibleCohort}
            </Text>
          )}
        </View>

        {/* INFO */}
        <View style={styles.infoRow}>
          <View style={styles.infoBox}>
            <View style={styles.infoHeader}>
              <Feather name="calendar" size={14} />
              <Text style={styles.infoLabel}>DATE & TIME</Text>
            </View>

            <Text style={styles.infoText}>{activity.date}</Text>
          </View>

          <View style={styles.infoBox}>
            <View style={styles.infoHeader}>
              <Feather name="map-pin" size={14} />
              <Text style={styles.infoLabel}>LOCATION</Text>
            </View>

            <Text style={styles.infoText}>
              {activity.location ?? "TBA"}
            </Text>
          </View>
        </View>
      </View>

      {/* SAVE BUTTON */}
      <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
        <Pressable
          style={[
            styles.saveButton,
            saved && { backgroundColor: "#94A3B8" },
          ]}
          onPress={handleSave}
        >
          <Ionicons
            name={saved ? "bookmark" : "bookmark-outline"}
            size={18}
            color="white"
          />
          <Text style={styles.saveText}>
            {saved ? "Activity Saved" : "Save Activity"}
          </Text>
        </Pressable>
      </Animated.View>

      {/* REGISTER BUTTON */}
      <Pressable style={styles.registerButton} onPress={openLink}>
        <Feather name="link" size={18} color="white" />
        <Text style={styles.registerText}>Registration Link</Text>
      </Pressable>

      {/* CONTENT */}
      <Section title="Description">
        <Text>{activity.description}</Text>
      </Section>

      <Section title="Requirement">
        {activity.requirement?.map((item, index) => (
          <Text key={index}>• {item}</Text>
        ))}
      </Section>

      <Section title="How to Claim KP">
        {activity.howToClaim?.map((item, index) => (
          <Text key={index}>• {item}</Text>
        ))}
      </Section>

      <Section title="Contact Person">
        {activity.contactPerson?.map((item, index) => (
          <Text key={index}>• {item}</Text>
        ))}
      </Section>
    </ScrollView>
  );
}