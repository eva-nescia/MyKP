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
import { styles } from "@/features/admin/form-activity/components/form/styles/LocationBottomSheet.styles";

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
  const [selectedFloor, setSelectedFloor] =
    useState(UC_LOCATIONS[0].floor);

  const [search, setSearch] = useState("");
  const [tempSelected, setTempSelected] =
    useState(value);

  const getFloorFromValue = (value: string) => {
    if (!value) return UC_LOCATIONS[0].floor;

    const match = UC_LOCATIONS.find((floor) =>
      floor.items.includes(value)
    );

    return match?.floor ?? UC_LOCATIONS[0].floor;
  };

  useEffect(() => {
    if (visible) {
      setSelectedFloor(getFloorFromValue(value));
      setSearch("");
      setTempSelected(value);
    }
  }, [visible, value]);

  const activeFloor = useMemo(() => {
    return UC_LOCATIONS.find(
      (f) => f.floor === selectedFloor
    );
  }, [selectedFloor]);

  const filteredItems = useMemo(() => {
    if (!activeFloor) return [];

    return activeFloor.items.filter((item) =>
      item
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [search, activeFloor]);

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      statusBarTranslucent
    >
      <View style={styles.overlay}>
        <BlurView
          intensity={35}
          tint="dark"
          style={styles.blur}
        />

        <Pressable
          style={styles.backdrop}
          onPress={onClose}
        />

        <View style={styles.sheet}>
          <View style={styles.handle} />

          <View style={styles.header}>
            <Text style={styles.title}>
              Select Location
            </Text>

            <Pressable
              onPress={onClose}
              style={styles.closeButton}
            >
              <Ionicons
                name="close"
                size={22}
                color="#64748B"
              />
            </Pressable>
          </View>

          <View style={styles.searchContainer}>
            <Ionicons
              name="search"
              size={18}
              color="#9CA3AF"
            />

            <TextInput
              placeholder="Search room..."
              placeholderTextColor="#9CA3AF"
              value={search}
              onChangeText={setSearch}
              style={styles.searchInput}
            />
          </View>

          <FlatList
            data={UC_LOCATIONS}
            horizontal
            keyExtractor={(item) => item.floor}
            showsHorizontalScrollIndicator={false}
            style={styles.floorList}
            renderItem={({ item }) => {
              const active =
                item.floor === selectedFloor;

              return (
                <Pressable
                  onPress={() =>
                    setSelectedFloor(item.floor)
                  }
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

        {/* <View style={styles.gridContainer}> */}
          <FlatList
            data={filteredItems}
            numColumns={3}
            keyExtractor={(item) => item}
            contentContainerStyle={styles.gridList}
            renderItem={({ item }) => {
              const active = tempSelected === item;

              return (
                <Pressable
                  onPress={() =>
                    setTempSelected(item)
                  }
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
     {/* </View> */}
          <Pressable
            style={[
              styles.applyButton,
              !tempSelected &&
                styles.applyButtonDisabled,
            ]}
            disabled={!tempSelected}
            onPress={() => {
              onSelect(tempSelected);
              onClose();
            }}
          >
            <Text style={styles.applyText}>
              Apply Location
            </Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}