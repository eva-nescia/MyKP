import {
  View,
  FlatList,
} from "react-native";
import {
  useCallback,
  useRef,
  useState,
} from "react";
import {
  useFocusEffect,
  useRouter,
} from "expo-router";

import ActivityCard from "@/components/activityCard/ActivityCard";
import SearchBar from "@/components/search-filter/SearchBar";
import FilterDropdown from "@/components/search-filter/FilterDropdown";
import { useActivityListViewModel } from "../viewmodel/useActivityListViewModel";
import { styles } from "./styles/ActivityList.styles";
import ActivityListHeader from "../components/ActivityListHeader";
import EmptyActivityList from "../components/EmptyActivityList";
import { useGlobalLoading } from "@/hooks/useGlobalLoading";
import type { Activity } from "../model/types";

export default function ActivityListScreen() {
  const vm = useActivityListViewModel();
  const listRef = useRef<FlatList<Activity>>(null);

  const [showFilter, setShowFilter] =
    useState(false);

  const router = useRouter();

  useGlobalLoading(vm.loading);

  useFocusEffect(
    useCallback(() => {
      const frame = requestAnimationFrame(() => {
        listRef.current?.scrollToOffset({
          offset: 0,
          animated: false,
        });
      });

      return () => cancelAnimationFrame(frame);
    }, [])
  );

  if (vm.loading) {
    return null;
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
        ref={listRef}
        data={vm.data}
        scrollEnabled={vm.data.length > 2}
        numColumns={2}
        keyExtractor={(item) => item.id}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.list}
        ListEmptyComponent={<EmptyActivityList />}
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
