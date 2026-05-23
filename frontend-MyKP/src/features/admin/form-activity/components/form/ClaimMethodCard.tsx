import {
  View,
  Text,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import { COLORS } from "@/constants/colors";

import { getClaimConfig } from
  "@/features/admin/form-activity/services/kpClaimConfig";

import { styles } from
  "@/features/admin/form-activity/components/form/styles/ClaimMethodCard.styles";

import type { CategoryLabel } from "@/constants/categories";

interface Props {
  category: CategoryLabel | "";
}

export default function ClaimMethodCard({
  category,
}: Props) {
  if (!category) {
    return (
      <View style={styles.emptyCard}>
        <View style={styles.emptyIcon}>
          <Ionicons
            name="information-circle-outline"
            size={28}
            color={COLORS.primary}
          />
        </View>

        <Text style={styles.emptyTitle}>
          Choose a category first
        </Text>

        <Text style={styles.emptyDescription}>
          The KP claim method will be shown here after you select an activity category.
        </Text>
      </View>
    );
  }

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