import {
  View,
  Text,
  FlatList,
} from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";

import ActivityCard from "@/components/activityCard/ActivityCard";
import SearchBar from "@/components/search-filter/SearchBar";
import FilterDropdown from "@/components/search-filter/FilterDropdown";
import { useActivityListViewModel } from "../viewmodel/useActivityListViewModel";
import { styles } from "./styles/ActivityList.styles";
import ActivityListHeader from "../components/ActivityListHeader";
import Loading from "src/components/loading/GlobalLoading";

export default function ActivityListScreen() {
  const vm = useActivityListViewModel();

  const [showFilter, setShowFilter] =
    useState(false);

  const router = useRouter();

  if (vm.loading) {
    return <Loading />;
  }

  return (
    <View style={styles.container}>
     <ActivityListHeader count={vm.data.length} />
      <SearchBar
        value={vm.search}
        onChange={vm.setSearch}
        onOpenFilter={() => setShowFilter(true)}
      />

      <FlatList
        data={vm.data}
        scrollEnabled={vm.data.length > 2}
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