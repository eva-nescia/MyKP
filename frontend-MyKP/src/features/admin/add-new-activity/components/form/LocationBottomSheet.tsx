import {
  View,
  Text,
  Modal,
  Pressable,
  TextInput,
  FlatList,
} from "react-native";
import { BlurView } from "expo-blur";
import { useMemo, useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";

import { UC_LOCATIONS } from "@/constants/ucLocations";
import { styles } from "src/features/admin/add-new-activity/components/form/styles/LocationBottomSheet.styles";

interface Props {
  visible: boolean;
  value: string;
  onClose: () => void;
  onSelect: (value: string) => void;
}

export default function LocationBottomSheet({
  visible,
  value,
  onClose,
  onSelect,
}: Props) {
  const [selectedFloor, setSelectedFloor] = useState(
    UC_LOCATIONS[0].floor
  );

  const [search, setSearch] = useState("");

  // ✅ resolve floor from selected value
  const getFloorFromValue = (value: string) => {
    if (!value) return UC_LOCATIONS[0].floor;

    const match = UC_LOCATIONS.find((floor) =>
      floor.items.includes(value)
    );

    return match?.floor ?? UC_LOCATIONS[0].floor;
  };

  // ✅ sync floor + reset search whenever modal opens
  useEffect(() => {
    if (visible) {
      setSelectedFloor(getFloorFromValue(value));
      setSearch("");
    }
  }, [visible, value]);

  // ✅ active floor data
  const activeFloor = useMemo(() => {
    return UC_LOCATIONS.find(
      (f) => f.floor === selectedFloor
    );
  }, [selectedFloor]);

  // ✅ filtered rooms
  const filteredItems = useMemo(() => {
    if (!activeFloor) return [];

    return activeFloor.items.filter((item) =>
      item.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, activeFloor]);

  return (
    <Modal visible={visible} animationType="slide" transparent>
      {/* OVERLAY */}
      <Pressable style={{ flex: 1 }} onPress={onClose}>
        <BlurView
          intensity={40}
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
          }}
        />
      </Pressable>

      {/* SHEET */}
      <View style={styles.sheet}>
        {/* HEADER */}
        <View style={styles.header}>
          <Text style={styles.title}>Select Location</Text>

          <Pressable onPress={onClose}>
            <Ionicons name="close" size={22} />
          </Pressable>
        </View>

        {/* SEARCH */}
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={18} color="#9CA3AF" />

          <TextInput
            placeholder="Search room..."
            value={search}
            onChangeText={setSearch}
            style={styles.searchInput}
          />
        </View>

        {/* FLOOR TABS */}
        <FlatList
          data={UC_LOCATIONS}
          horizontal
          keyExtractor={(item) => item.floor}
          showsHorizontalScrollIndicator={false}
          style={{ marginBottom: 12 }}
          renderItem={({ item }) => {
            const active = item.floor === selectedFloor;

            return (
              <Pressable
                onPress={() => setSelectedFloor(item.floor)}
                style={[
                  styles.floorTab,
                  active
                    ? styles.floorTabActive
                    : styles.floorTabInactive,
                ]}
              >
                <Text
                  style={
                    active
                      ? styles.floorTextActive
                      : styles.floorTextInactive
                  }
                >
                  {item.floor}
                </Text>
              </Pressable>
            );
          }}
        />

        {/* GRID */}
        <FlatList
          data={filteredItems}
          numColumns={3}
          keyExtractor={(item) => item}
          renderItem={({ item }) => {
            const active = value === item;

            return (
              <Pressable
                onPress={() => {
                  onSelect(item);
                  onClose();
                }}
                style={[
                  styles.gridItem,
                  active
                    ? styles.gridItemActive
                    : styles.gridItemInactive,
                ]}
              >
                <Text
                  style={
                    active
                      ? styles.gridTextActive
                      : styles.gridTextInactive
                  }
                >
                  {item}
                </Text>
              </Pressable>
            );
          }}
        />
      </View>
    </Modal>
  );
}