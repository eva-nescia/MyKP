import {
  ScrollView,
  Text,
  Pressable,
  View,
  Image,
} from "react-native";

import {
  useRouter,
  useLocalSearchParams,
} from "expo-router";

import { Ionicons, Feather } from "@expo/vector-icons";

import Section from "@/features/student/activityDetail/components/Section";

import FloatingActionBar from "@/features/student/activityDetail/components/FloatingActionBar";

import SaveActivityModal from "@/features/student/activityDetail/components/SaveActivityModal";

import RegistrationModal from "@/features/student/activityDetail/components/RegistrationModal";

import { useActivityDetailViewModel } from "@/features/student/activityDetail/viewmodel/useActivityDetailViewModel";

import styles from "@/features/student/activityDetail/view/styles/ActivityDetail.styles";

export default function ActivityDetailScreen() {
  const router = useRouter();

  const { id } = useLocalSearchParams<{
    id: string;
  }>();

  const {
    activity,
    saved,

    saveMessage,

    showSaveModal,
    setShowSaveModal,

    showLinkModal,
    setShowLinkModal,

    handleSave,
    handleRegister,
    confirmRegister,
  } = useActivityDetailViewModel(id as string);

  if (!activity) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      {/* HEADER */}
      <View style={styles.fixedHeader}>
        <Pressable
          onPress={() =>
            router.replace(
              "/(student)/activities"
            )
          }
          style={styles.backButton}
        >
          <Ionicons
            name="arrow-back"
            size={24}
            color="black"
          />
        </Pressable>

        <Text style={styles.headerTitle}>
          Activity Details
        </Text>
      </View>

      {/* CONTENT */}
      <ScrollView
        style={styles.container}
        contentContainerStyle={
          styles.contentContainer
        }
        showsVerticalScrollIndicator={false}
      >
        {/* HERO */}
        <View style={styles.heroSection}>
          <Image
            source={activity.image}
            style={styles.imagePoster}
          />

          <View style={styles.heroContent}>
            <Text style={styles.title}>
              {activity.title}
            </Text>

            <Text style={styles.organizer}>
              ORGANIZED BY{" "}
              {activity.organizer}
            </Text>

            {/* BADGES */}
            <View style={styles.badges}>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>
                  {activity.type}
                </Text>
              </View>

              <View style={styles.badge}>
                <Text style={styles.badgeText}>
                  {activity.points} KP
                </Text>
              </View>

              {activity.eligibleStudyProgram && (
                <View style={styles.badge}>
                  <Text
                    style={styles.badgeText}
                  >
                    {
                      activity.eligibleStudyProgram
                    }
                  </Text>
                </View>
              )}

              {activity.eligibleCohort && (
                <View style={styles.badge}>
                  <Text
                    style={styles.badgeText}
                  >
                    {activity.eligibleCohort}
                  </Text>
                </View>
              )}
            </View>
          </View>
        </View>

        {/* INFO */}
        <View style={styles.infoRow}>
          <View style={styles.infoBox}>
            <View style={styles.infoHeader}>
              <Feather
                name="calendar"
                size={16}
                color="#0F172A"
              />

              <Text style={styles.infoLabel}>
                DATE & TIME
              </Text>
            </View>

            <Text style={styles.infoText}>
              {activity.date}
            </Text>

            {activity.startTime && activity.endTime && (
              <Text style={styles.infoText}>
                {activity.startTime} - {activity.endTime}
              </Text>
            )}
          </View>

          <View style={styles.infoBox}>
            <View style={styles.infoHeader}>
              <Feather
                name="map-pin"
                size={16}
                color="#0F172A"
              />

              <Text style={styles.infoLabel}>
                LOCATION
              </Text>
            </View>

            <Text style={styles.infoText}>
              {activity.location ?? "TBA"}
            </Text>
          </View>
        </View>

        {/* DESCRIPTION */}
        <Section title="Description">
          <Text style={styles.sectionText}>
            {activity.description}
          </Text>
        </Section>

        {/* REQUIREMENT */}
        <Section title="Requirement">
          {activity.requirement?.map(
            (item, index) => (
              <Text
                key={index}
                style={styles.sectionText}
              >
                • {item}
              </Text>
            )
          )}
        </Section>

        {/* HOW TO CLAIM */}
        <Section title="How to Claim KP">
          {activity.howToClaim?.map(
            (item, index) => (
              <Text
                key={index}
                style={styles.sectionText}
              >
                • {item}
              </Text>
            )
          )}
        </Section>

        {/* CONTACT */}
        <Section title="Contact Person">
          {activity.contactPerson?.map(
            (item, index) => (
              <Text
                key={index}
                style={styles.sectionText}
              >
                • {item}
              </Text>
            )
          )}
        </Section>
      </ScrollView>

      {/* FLOATING BAR */}
      <FloatingActionBar
        saved={saved}
        onSave={handleSave}
        onRegister={handleRegister}
      />

      {/* SAVE MODAL */}
      <SaveActivityModal
        visible={showSaveModal}
        message={saveMessage}
        onClose={() =>
          setShowSaveModal(false)
        }
      />

      {/* REGISTER MODAL */}
      <RegistrationModal
        visible={showLinkModal}
        onClose={() =>
          setShowLinkModal(false)
        }
        onConfirm={confirmRegister}
      />
    </View>
  );
}