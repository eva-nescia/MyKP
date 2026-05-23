import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
} from "react-native";

import React, { useState, useEffect } from "react";
import {
  router,
  useLocalSearchParams,
} from "expo-router";

import SearchBar from "@/components/search-filter/SearchBar";
import AppSnackbar from "@/components/snackbar/AppSnackbar";

import AdminActivityCard from "../components/ActivityCardAdm";
import AddActivityButton from "../components/AddActivityBtn";
import YearFilter from "../components/YearFilter";
import { useActivityListAdminViewModel } from "../viewmodel/useActivityListAdmViewModel";

import styles from "./styles/ActivityListAdm.styles";
import ActivityListHeaderAdm from "../components/ActivityListHeaderAdm";
import EmptyActivityListAdm from "../components/EmptyActivityListAdm";

export default function ActivityListAdminScreen() {
  const vm = useActivityListAdminViewModel();

  const { loginSuccess } =
    useLocalSearchParams();

  const [showFilter, setShowFilter] =
    useState(false);

  const [
    showLoginSuccess,
    setShowLoginSuccess,
  ] = useState(false);

  useEffect(() => {
    if (loginSuccess === "true") {
      setShowLoginSuccess(true);
    }
  }, [loginSuccess]);

  return (
      <View style={styles.container}>
        <ActivityListHeaderAdm
          count={vm.data.length}
      />

      <SearchBar
        value={vm.search}
        onChange={vm.setSearch}
        onOpenFilter={() =>
          setShowFilter(true)
        }
      />

      {vm.loading ? (
        <ActivityIndicator
          size="large"
          color="#0000ff"
          style={{ marginTop: 20 }}
        />
      ) : (
        <FlatList
          data={vm.data}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <AdminActivityCard
              title={item.title}
              image={item.image}
              type={item.type}
              points={item.points}
              date={item.date}
              onEdit={() => {
                router.push({
                  pathname:
                    "/new-activity/edit/[id]",
                  params: {
                    id: item.id,
                  },
                });
              }}
              onDelete={() => {
                vm.deleteActivity(item.id);
              }}
            />
          )}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={<EmptyActivityListAdm />}
        />
      )}

      <AddActivityButton
        onPress={() =>
          router.push(
            "/new-activity/new-activity"
          )
        }
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

      <AppSnackbar
        visible={showLoginSuccess}
        message="Login successful"
        type="success"
        onHide={() =>
          setShowLoginSuccess(false)
        }
      />
    </View>
  );
}