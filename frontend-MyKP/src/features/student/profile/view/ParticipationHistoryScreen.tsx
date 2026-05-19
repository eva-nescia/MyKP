import {
  ActivityIndicator,
  View,
  Text,
  FlatList,
  TouchableOpacity,
} from "react-native";

import { router } from "expo-router";

import { ArrowLeft } from "lucide-react-native";

import ParticipationCard from "@/features/student/profile/components/ParticipationCard";

import useParticipationHistoryViewModel from "../viewmodel/useParticipationHistoryViewModel";

import styles from "../view/styles/ParticipationHistory.styles";

export default function ParticipationHistoryScreen() {
  const vm = useParticipationHistoryViewModel();

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <TouchableOpacity
          onPress={() => router.back()}
        >
          <ArrowLeft
            size={26}
            color="#0F172A"
          />
        </TouchableOpacity>

        <Text style={styles.header}>
          {vm.title}
        </Text>
      </View>

     <View style={styles.progressCard}>
      
    <View style={styles.progressHeader}>
      <Text style={styles.progressTitle}>
        {vm.current} / {vm.target}
      </Text>
    </View>

    <View style={styles.progressBarBackground}>
      <View
        style={[
          styles.progressBarFill,
          {
            width: `${vm.percentage}%`,
          },
        ]}
      />
    </View>

   <Text style={styles.progressFooter}>
    {Math.max(vm.target - vm.current, 0)} points remaining
  </Text>
  </View>

      <Text style={styles.sectionTitle}>
        Participation History
      </Text>

      {vm.loading ? (
        <View style={{ flex: 1, justifyContent: "center" }}>
          <ActivityIndicator size="large" />
        </View>
      ) : vm.error ? (
        <View style={{ flex: 1, justifyContent: "center" }}>
          <Text style={[styles.emptyText, { textAlign: "center" }]}>
            {vm.error}
          </Text>
        </View>
      ) : (
        <FlatList
          data={vm.history}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <ParticipationCard
              title={item.title}
              date={item.date}
              kp={item.kp}
              status={item.status}
              organizer={item.organizer}
              image={item.image}
            />
          )}
          ListEmptyComponent={
            <Text style={styles.emptyText}>
              No participation history found.
            </Text>
          }
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}