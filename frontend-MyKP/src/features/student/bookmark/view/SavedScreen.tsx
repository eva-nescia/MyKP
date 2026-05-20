import {
  ActivityIndicator,
  FlatList,
  Text,
  View,
} from "react-native";

import EmptySavedState from "../components/EmptySavedState";
import SavedActivityCard from "../components/SavedActivityCard";
import { useSavedActivitiesViewModel } from "../viewmodel/useSavedActivitiesViewModel";

import styles from "src/features/student/bookmark/view/styles/Saved.styles";
import SavedHeader from "../components/SavedHeader";

export default function SavedScreen() {
  const { data, loading, error } = useSavedActivitiesViewModel();

  const hasSaved = data.length > 0;

  return (
  <View style={styles.container}>
    <SavedHeader count={data.length} />

      {loading ? (
        <View style={{ flex: 1, justifyContent: "center" }}>
          <ActivityIndicator size="large" />
        </View>
      ) : error ? (
        <View style={{ flex: 1, justifyContent: "center" }}>
          <Text style={{ textAlign: "center" }}>
            {error}
          </Text>
        </View>
      ) : !hasSaved ? (
        <EmptySavedState />
      ) : (
        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <SavedActivityCard
              id={item.id}
              title={item.title}
              organizer={item.organizer}
              date={item.date}
              points={String(item.points)}
              type={item.type}
              image={item.image}
            />
          )}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}
