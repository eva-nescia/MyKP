import {
  View,
  Text,
  FlatList,
} from "react-native";
import { useState } from "react";

import SearchBar from "@/components/search-filter/SearchBar";
import AdminActivityCard from "../components/ActivityCardAdm";
import AddActivityButton from "../components/AddActivityBtn";
import YearFilter from "../components/YearFilter";
import { useActivityListAdminViewModel } from "../viewmodel/useActivityListAdmViewModel";
import styles from "./styles/ActivityListAdm.styles";

export default function ActivityListAdminScreen() {
  const vm =
    useActivityListAdminViewModel();

  const [showFilter, setShowFilter] =
    useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Activity List
      </Text>

      <Text style={styles.subtitle}>
        Published announcements •{" "}
        {vm.data.length}{" "}
        {vm.data.length === 1
          ? "activity"
          : "activities"}{" "}
        found
      </Text>

      <SearchBar
        value={vm.search}
        onChange={vm.setSearch}
        onOpenFilter={() =>
          setShowFilter(true)
        }
      />

      <FlatList
        data={vm.data}
        keyExtractor={(item) => item.id}
        contentContainerStyle={
          styles.list
        }
        renderItem={({ item }) => (
          <AdminActivityCard
            title={item.title}
            image={item.image}
            type={item.type}
            points={item.points}
            date={item.date}

            onPress={() => {
              console.log(
                "Open activity details"
              );
            }}

            onEdit={() => {
              console.log(
                "Edit activity"
              );
            }}

            onDelete={() => {
              console.log(
                "Delete activity"
              );
            }}
          />
        )}
        showsVerticalScrollIndicator={false}
      />

      <AddActivityButton
        onPress={() => {
          console.log("Add activity");
        }}
      />

      <YearFilter
        visible={showFilter}
        selected={vm.selectedYear}
        onApply={(year) =>
          vm.setSelectedYear(year)
        }
        onClose={() =>
          setShowFilter(false)
        }
      />
    </View>
  );
}