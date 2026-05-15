import {
  View,
  Text,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import { COLORS } from "@/constants/colors";

import { getClaimConfig } from
  "src/features/admin/add-new-activity/services/kpClaimConfig";

import { styles } from
  "src/features/admin/add-new-activity/components/form/styles/ClaimMethodCard.styles";

import type { CategoryLabel } from "@/constants/categories";

interface Props {
  category: CategoryLabel;
}

export default function ClaimMethodCard({
  category,
}: Props) {
  const config = getClaimConfig(category);

  return (
    <View style={styles.card}>
      <Text style={styles.title}>
        {config.title}
      </Text>

      <View style={styles.methodBadge}>
        <Text style={styles.methodText}>
          {config.method}
        </Text>
      </View>

      <Text style={styles.description}>
        {config.description}
      </Text>

      <View style={styles.listContainer}>
        {config.checklist.map((item) => (
          <View
            key={item}
            style={styles.listItem}
          >
            <Ionicons
              name="checkmark-circle"
              size={18}
              color={COLORS.primary}
            />

            <Text style={styles.itemText}>
              {item}
            </Text>
          </View>
        ))}
      </View>

      {config.note && (
        <Text style={styles.note}>
          {config.note}
        </Text>
      )}
    </View>
  );
}