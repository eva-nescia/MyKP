import { useState } from "react";
import {
  View,
  Text,
  Pressable,
  Platform,
  Modal,
} from "react-native";

import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";

import { Ionicons } from "@expo/vector-icons";

import { COLORS } from "@/constants/colors";
import { styles } from "@/features/admin/form-activity/components/styles/FormField.styles";

interface Props {
  label: string;
  value: Date | null;
  mode: "date" | "time";
  onChange: (value: Date) => void;
  placeholder?: string;
}

export default function DateTimeField({
  label,
  value,
  mode,
  onChange,
  placeholder,
}: Props) {
  const [showPicker, setShowPicker] = useState(false);
  const [tempDate, setTempDate] = useState(value || new Date());

  const formatValue = () => {
    if (!value) {
      return (
        placeholder ||
        (mode === "date" ? "Select date" : "Select time")
      );
    }

    if (mode === "date") {
      return value.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
    }

    return value.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const openPicker = () => {
    setTempDate(value || new Date());
    setShowPicker(true);
  };

  const closePicker = () => {
    setShowPicker(false);
  };

  const handleAndroidChange = (
    event: DateTimePickerEvent,
    selectedDate?: Date
  ) => {
    setShowPicker(false);

    if (event.type === "dismissed" || !selectedDate) return;

    onChange(selectedDate);
  };

  return (
    <View style={styles.fieldContainer}>
      <Text style={styles.label}>{label}</Text>

      {/* INPUT */}
      <Pressable style={styles.dateInput} onPress={openPicker}>
        <View style={styles.dateLeft}>
          <Ionicons
            name={mode === "date" ? "calendar-outline" : "time-outline"}
            size={20}
            color={COLORS.primary}
          />

          <Text
            style={[
              styles.dateText,
              !value && styles.placeholderText,
            ]}
          >
            {formatValue()}
          </Text>
        </View>
      </Pressable>

      {/* ANDROID PICKER */}
      {showPicker && Platform.OS === "android" && (
        <DateTimePicker
          value={value || new Date()}
          mode={mode}
          display="default"
          minimumDate={mode === "date" ? new Date() : undefined}
          onChange={handleAndroidChange}
        />
      )}

      {/* IOS PICKER */}
      {Platform.OS === "ios" && (
        <Modal
          visible={showPicker}
          transparent
          animationType="slide"
        >
          {/* BACKDROP */}
          <Pressable
            style={styles.modalOverlay}
            onPress={closePicker}
          />

          {/* SHEET */}
          <View style={styles.iosPickerContainer}>
            {/* HEADER */}
            <View style={styles.iosHeader}>
              <Pressable onPress={closePicker}>
                <Text style={styles.cancelText}>Cancel</Text>
              </Pressable>

              <Pressable
                onPress={() => {
                  onChange(tempDate);
                  closePicker();
                }}
              >
                <Text style={styles.doneText}>Done</Text>
              </Pressable>
            </View>

            {/* PICKER */}
            <DateTimePicker
              value={tempDate}
              mode={mode}
              display="spinner"
              themeVariant="light"
              minimumDate={mode === "date" ? new Date() : undefined}
              onChange={(_, selectedDate) => {
                if (selectedDate) {
                  setTempDate(selectedDate);
                }
              }}
            />
          </View>
        </Modal>
      )}
    </View>
  );
}