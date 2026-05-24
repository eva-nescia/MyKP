import {
  View,
  Text,
  Pressable,
  Linking,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import styles from "@/features/student/activity-detail/components/styles/ContactItem.styles";

type Props = {
  name: string;
  number: string;
  whatsappUrl: string;
};

export default function ContactItem({
  name,
  number,
  whatsappUrl,
}: Props) {
  return (
    <Pressable
      style={styles.row}
      onPress={() =>
        Linking.openURL(whatsappUrl)
      }
    >
      <View style={styles.iconWrapper}>
        <Ionicons
          name="logo-whatsapp"
          size={20}
          color="#22C55E"
        />
      </View>

      <View style={styles.textContainer}>
        <Text style={styles.name}>
          {name}
        </Text>

        <Text style={styles.number}>
          +62 {number}
        </Text>
      </View>

      <Ionicons
        name="chevron-forward"
        size={18}
        color="#CBD5E1"
      />
    </Pressable>
  );
}