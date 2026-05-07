import {
  View,
  Text,
  FlatList,
} from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";

import ActivityCard from "@/components/activityCard/ActivityCard";
import SearchBar from "../components/SearchBar";
import FilterDropdown from "../components/FilterDropdown";
import { useActivityListViewModel } from "../viewmodel/useActivityListViewModel";
import { styles } from "./styles/ActivityList.styles";

export default function ActivityListScreen() {
  const vm = useActivityListViewModel();
  const [showFilter, setShowFilter] = useState(false);
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Activity List</Text>
      <Text style={styles.subtitle}>
        Official announcements• {vm.data.length} {vm.data.length === 1 ? 'activity' : 'activities'} found
      </Text>

      <SearchBar
        value={vm.search}
        onChange={vm.setSearch}
        onOpenFilter={() => setShowFilter(true)}
      />

      <FlatList
        data={vm.data}
        numColumns={2}
        keyExtractor={(item) => item.id}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <ActivityCard
            {...item}
            onPress={() =>
              router.push({
                pathname: "/activity-details/details",
                params: { id: item.id },
              })
            }
          />
        )}
      />

      {/* overlay dropdown */}
      <FilterDropdown
        visible={showFilter}
        selected={vm.selectedCategory}
        onApply={vm.setSelectedCategory}
        onClose={() => setShowFilter(false)}
      />
    </View>
  );
}