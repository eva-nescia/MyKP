import { useState } from "react";

import {
  View,
  Text,
  TextInput,
  Pressable,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import { COLORS } from "@/constants/colors";

import DeleteContactModal from "../feedback/DeleteContactModal";

import { styles as formStyles } from "@/features/admin/form-activity/components/styles/FormField.styles";
import { styles as contactStyles } from "@/features/admin/form-activity/components/form/styles/ContactInputField.styles";

interface Props {
  label: string;
  values: string[];
  onChange: (values: string[]) => void;
}

export default function ContactInputField({
  label,
  values,
  onChange,
}: Props) {
  const [selectedDeleteIndex, setSelectedDeleteIndex] =
    useState<number | null>(null);

  const parseContact = (value: string) => {
    const [number = "", name = ""] =
      value.split(" - ");

    return {
      number,
      name,
    };
  };

  const updateContact = (
    index: number,
    field: "name" | "number",
    text: string
  ) => {
    const current = parseContact(values[index]);

    const next = {
      ...current,
      [field]:
        field === "number"
          ? text.replace(/\D/g, "")
          : text,
    };

    const updated = [...values];

    updated[index] =
      `${next.number} - ${next.name}`;

    onChange(updated);
  };

  const addItem = () => {
    onChange([...values, " - "]);
  };

  const removeItem = (index: number) => {
    const updated = values.filter(
      (_, i) => i !== index
    );

    onChange(updated);
  };

  const confirmDelete = () => {
    if (selectedDeleteIndex === null) return;

    removeItem(selectedDeleteIndex);
    setSelectedDeleteIndex(null);
  };

  return (
    <View style={formStyles.fieldContainer}>
      <Text style={formStyles.label}>
        {label}
      </Text>

      <Text style={contactStyles.helperText}>
        Students will contact this number through WhatsApp.
      </Text>

      {values.map((item, index) => {
        const contact = parseContact(item);

        return (
          <View
            key={index}
            style={contactStyles.contactCard}
          >
            <View style={contactStyles.contactHeader}>
              <Text style={contactStyles.contactTitle}>
                Contact {index + 1}
              </Text>

              {values.length > 1 && (
                <Pressable
                  onPress={() =>
                    setSelectedDeleteIndex(index)
                  }
                  style={formStyles.removeBulletBtn}
                  hitSlop={8}
                >
                  <Ionicons
                    name="close"
                    size={18}
                    color="#94A3B8"
                  />
                </Pressable>
              )}
            </View>

            <TextInput
              value={contact.name}
              placeholder="Contact Name"
              placeholderTextColor="#9CA3AF"
              onChangeText={(text) =>
                updateContact(index, "name", text)
              }
              style={formStyles.bulletInput}
            />

            <View style={contactStyles.phoneRow}>
              <View style={contactStyles.contactPrefix}>
                <Text style={contactStyles.contactPrefixText}>
                  +62
                </Text>
              </View>

              <TextInput
                value={contact.number}
                placeholder="8123456789"
                placeholderTextColor="#9CA3AF"
                keyboardType="number-pad"
                onChangeText={(text) =>
                  updateContact(index, "number", text)
                }
                style={formStyles.bulletInput}
              />
            </View>
          </View>
        );
      })}

      <Pressable
        style={formStyles.addBulletBtn}
        onPress={addItem}
      >
        <Ionicons
          name="add"
          size={18}
          color={COLORS.primary}
        />

        <Text style={formStyles.addBulletText}>
          Add Contact
        </Text>
      </Pressable>

      <DeleteContactModal
        visible={selectedDeleteIndex !== null}
        onCancel={() =>
          setSelectedDeleteIndex(null)
        }
        onConfirm={confirmDelete}
      />
    </View>
  );
}