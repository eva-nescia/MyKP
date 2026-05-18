import { View, Text } from "react-native";

import { Ionicons } from "@expo/vector-icons";

import styles from "src/features/student/activityDetail/components/styles/ContactItem.styles";

type Props = {
  children: string;
};

export default function ContactItem({
  children,
}: Props) {
  return (
    <View style={styles.row}>
      <View style={styles.iconWrapper}>
        <Ionicons
          name="logo-whatsapp"
          size={20}
          color="#22C55E"
        />
      </View>

      <Text style={styles.text}>
        {children}
      </Text>
    </View>
  );
}