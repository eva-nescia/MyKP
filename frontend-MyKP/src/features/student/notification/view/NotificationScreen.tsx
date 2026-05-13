import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
} from "react-native";

import { router } from "expo-router";

import { ArrowLeft } from "lucide-react-native";

import NotificationCard from "src/features/student/notification/components/NotificationCard";

import useNotificationViewModel from "../viewmodel/useNotificationViewModel";

import styles from "src/features/student/notification/view/styles/Notification.styles";

export default function NotificationScreen() {
  const vm = useNotificationViewModel();

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <TouchableOpacity
          onPress={() => router.back()}
        >
          <ArrowLeft
            size={26}
            color="#0F172A"
          />
        </TouchableOpacity>

        <Text style={styles.header}>
          Notification
        </Text>
      </View>

      <Text style={styles.count}>
        4 notifications
      </Text>

      <Text style={styles.sectionTitle}>
        Today
      </Text>

      <FlatList
        data={vm.notifications.today}
        scrollEnabled={false}
        keyExtractor={(item) =>
          item.id.toString()
        }
        renderItem={({ item }) => (
          <NotificationCard item={item} />
        )}
      />

      <Text style={styles.sectionTitle}>
        Yesterday
      </Text>

      <FlatList
        data={vm.notifications.yesterday}
        scrollEnabled={false}
        keyExtractor={(item) =>
          item.id.toString()
        }
        renderItem={({ item }) => (
          <NotificationCard item={item} />
        )}
      />
    </View>
  );
}