import { View, Text, FlatList } from "react-native";

import EmptySavedState from "../components/EmptySavedState";
import SavedActivityCard from "../components/SavedActivityCard";

import styles from "src/features/student/bookmark/view/styles/Saved.styles";

const MOCK_DATA = [
  {
      id: "1",
      title: "Seminar Bela Negara & Anti Narkoba",
      organizer: "BMA",
      image: require("assets/images/activity-placeholder/seminarAntiNarkoba.jpeg"),
      type: "Talkshow Wajib",
      points: "6",
      date: "Sat, 29 November 2025",
    },
];

export default function SavedScreen() {
  const hasSaved = MOCK_DATA.length > 0;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>
        Saved Activities
      </Text>

      {hasSaved && (
        <Text style={styles.subheader}>
          {MOCK_DATA.length} saved activity
        </Text>
      )}

      {!hasSaved ? (
        <EmptySavedState />
      ) : (
        <FlatList
          data={MOCK_DATA}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <SavedActivityCard {...item} />
          )}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}