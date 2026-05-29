import {
  ScrollView,
  Text,
  View,
  Image,
} from "react-native";

import {
  useLocalSearchParams,
} from "expo-router";

import { Feather } from "@expo/vector-icons";

import Section from "@/features/student/activity-detail/components/Section";
import FloatingActionBar from "@/features/student/activity-detail/components/FloatingActionBar";
import SaveActivityModal from "@/features/student/activity-detail/components/SaveActivityModal";
import ActivityDetailHeader from "@/features/student/activity-detail/components/ActivityDetailHeader";
import styles from "@/features/student/activity-detail/view/styles/ActivityDetail.styles";
import SectionBullet from "../components/SectionBullet";
import ContactItem from "../components/ContactItem";

import { useActivityDetailViewModel } from "@/features/student/activity-detail/viewmodel/useActivityDetailViewModel";
import { useGlobalLoading } from "@/hooks/useGlobalLoading";
import { formatUcLocationWithFloor } from "@/constants/ucLocations";
import { formatEligibleGenerations } from "@/constants/generations";

export default function ActivityDetailScreen() {
  const { id } = useLocalSearchParams<{
    id: string;
  }>();

  const {
    activity,
    saved,

    modalSavedState,

    saveMessage,

    showSaveModal,
    setShowSaveModal,

    handleSave,
    handleRegister,
  } = useActivityDetailViewModel(id as string);

  useGlobalLoading(!activity);

  if (!activity) {
    return null;
  }

  return (
    <View style={styles.screen}>
      {/* HEADER */}
      <ActivityDetailHeader />

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
              Organized by {activity.organizer || "TBA"}
            </Text>

            <View style={styles.primaryBadgeRow}>
              <View style={styles.categoryBadge}>
                <Text
                  style={styles.categoryBadgeText}
                  numberOfLines={1}
                >
                  {activity.type}
                </Text>
              </View>

              <View style={styles.kpBadge}>
                <Text style={styles.kpBadgeText}>
                  {activity.points} KP
                </Text>
              </View>
            </View>

            <View style={styles.metaTagRow}>
              {activity.eligibleStudyProgram && (
                <View style={styles.metaTag}>
                  <Text
                    style={styles.metaTagText}
                    numberOfLines={1}
                  >
                    {activity.eligibleStudyProgram}
                  </Text>
                </View>
              )}

              {activity.eligibleCohort && (
                <View style={styles.metaTag}>
                  <Text
                    style={styles.metaTagText}
                    numberOfLines={1}
                  >
                    {formatEligibleGenerations(activity.eligibleCohort)}
                  </Text>
                </View>
              )}
            </View>
          </View>
        </View>

        {/* INFO */}
        <View style={styles.infoCard}>
          <View style={styles.infoItem}>
            <View style={styles.infoIconBox}>
              <Feather
                name="calendar"
                size={20}
                color="#FB923C"
              />
            </View>

            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>
                Date & Time
              </Text>

              <Text style={styles.infoText}>
                {activity.date}
              </Text>

              {activity.startTime && activity.endTime && (
                <Text style={styles.infoText}>
                  {activity.startTime} - {activity.endTime}
                </Text>
              )}
            </View>
          </View>

          <View style={styles.infoDivider} />

          <View style={styles.infoItem}>
            <View style={styles.infoIconBox}>
              <Feather
                name="map-pin"
                size={20}
                color="#FB923C"
              />
            </View>

            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>
                Location
              </Text>

              <Text style={styles.infoText}>
                {formatUcLocationWithFloor(activity.location)}
              </Text>
            </View>
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
              <SectionBullet key={index}>
                {item}
              </SectionBullet>
            )
          )}
        </Section>

        {/* HOW TO CLAIM */}
        <Section title="How to Claim KP">
          {activity.howToClaim?.map(
            (item, index) => (
         <SectionBullet key={index}>
            {item}
          </SectionBullet>
            )
          )}
        </Section>

        {/* CONTACT */}
        <Section title="Contact Person">
          {activity.contactPerson?.map(
            (item, index) => {
              const [number = "", name = ""] =
                item.split(" - ");

              const cleanNumber =
                number.replace(/\D/g, "");

              const waNumber =
                cleanNumber.startsWith("62")
                  ? cleanNumber
                  : `62${cleanNumber}`;

              return (
                <ContactItem
                  key={index}
                  name={name || "Contact Person"}
                  number={cleanNumber}
                  whatsappUrl={`https://wa.me/${waNumber}`}
                />
              );
            }
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
        saved={modalSavedState}
        onClose={() =>
          setShowSaveModal(false)
        }
      />
    </View>
    
  );
}
