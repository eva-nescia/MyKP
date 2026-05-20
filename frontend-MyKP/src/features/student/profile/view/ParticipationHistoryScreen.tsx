import {
  ActivityIndicator,
  View,
  Text,
  FlatList,
} from "react-native";

import { router } from "expo-router";

import ParticipationCard from "@/features/student/profile/components/ParticipationCard";

import useParticipationHistoryViewModel from "../viewmodel/useParticipationHistoryViewModel";

import styles from "../view/styles/ParticipationHistory.styles";
import ParticipationHistoryHeader from "../components/ParticipationHistoryHeader";
import ParticipationProgressCard from "../components/ParticipationProgressCard";
import EmptyParticipationState from "../components/EmptyParticipationState";

export default function ParticipationHistoryScreen() {
  const vm = useParticipationHistoryViewModel();

  return (
    <View style={styles.container}>
      <ParticipationHistoryHeader
        title={vm.title}
        subtitle={`Track your KP ${vm.title} progress`}
        onBack={() => router.back()}
      />

      <ParticipationProgressCard
        current={vm.current}
        target={vm.target}
        percentage={vm.percentage}
      />

      <Text style={styles.sectionTitle}>
        Participation History
      </Text>

      {vm.loading ? (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
          }}
        >
          <ActivityIndicator size="large" />
        </View>
      ) : vm.error ? (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
          }}
        >
          <Text
            style={[
              styles.emptyText,
              { textAlign: "center" },
            ]}
          >
            {vm.error}
          </Text>
        </View>
      ) : (
        <FlatList
          data={vm.history}
          keyExtractor={(item) =>
            item.id.toString()
          }
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
            <EmptyParticipationState />
          }
          contentContainerStyle={
            styles.listContent
          }
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}