import {
  ActivityIndicator,
  View,
  Text,
  FlatList,
  ScrollView,
} from "react-native";

import { router } from "expo-router";

import NotificationCard from "src/features/student/notification/components/NotificationCard";
import NotificationHeader from "src/features/student/notification/components/NotificationHeader";
import EmptyNotification from "src/features/student/notification/components/EmptyNotification";

import useNotificationViewModel from "../viewmodel/useNotificationViewModel";

import styles from "src/features/student/notification/view/styles/Notification.styles";

export default function NotificationScreen() {
  const vm = useNotificationViewModel();

  const totalNotifications =
    vm.notifications.today.length +
    vm.notifications.yesterday.length +
    vm.notifications.thisWeek.length +
    vm.notifications.older.length;

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
        paddingBottom: 40,
      }}>
      <NotificationHeader
        count={totalNotifications}
        onBack={() => router.back()}
      />

      {vm.loading ? (
        <View style={{ paddingTop: 60 }}>
          <ActivityIndicator size="large" />
        </View>
      ) : vm.error ? (
        <Text style={{ textAlign: "center", paddingTop: 60 }}>{vm.error}</Text>
      ) : totalNotifications === 0 ? (
        <EmptyNotification />
      ) : (
        <>
          {/* TODAY */}
          {!!vm.notifications.today.length && (
            <>
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
            </>
          )}

          {/* YESTERDAY */}
          {!!vm.notifications.yesterday.length && (
            <>
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
            </>
          )}

          {/* THIS WEEK */}
          {!!vm.notifications.thisWeek.length && (
            <>
              <Text style={styles.sectionTitle}>
                This Week
              </Text>

              <FlatList
                data={vm.notifications.thisWeek}
                scrollEnabled={false}
                keyExtractor={(item) =>
                  item.id.toString()
                }
                renderItem={({ item }) => (
                  <NotificationCard item={item} />
                )}
              />
            </>
          )}

          {/* OLDER */}
          {!!vm.notifications.older.length && (
            <>
              <Text style={styles.sectionTitle}>
                Older
              </Text>

              <FlatList
                data={vm.notifications.older}
                scrollEnabled={false}
                keyExtractor={(item) =>
                  item.id.toString()
                }
                renderItem={({ item }) => (
                  <NotificationCard item={item} />
                )}
              />
            </>
          )}
        </>
      )}
       </ScrollView>
    </View>
  );
}