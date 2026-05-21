import { useEffect } from "react";
import { Stack, router } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { PaperProvider } from "react-native-paper";
import { AuthProvider } from "../src/core/contexts/AuthContext";
import GlobalLoading from "@/components/loading/GlobalLoading";
import {
  installNotificationHandlers,
  requestNotificationPermission,
} from "../src/features/notifications/services/pushService";
// SMOKE TEST — REMOVE
import * as Notifications from "expo-notifications";

export default function RootLayout() {
  // Foreground banner + deep-link wiring for local bookmark reminders.
  // Tapping a reminder that carries an `activity_id` opens that activity.
  useEffect(() => {
    const unsubscribe = installNotificationHandlers((activityId) => {
      router.push({
        pathname: "/activity-details/details",
        params: { id: activityId },
      });
    });
    // Fire the OS notification permission prompt on first launch so the
    // first bookmark a student creates can actually schedule reminders
    // without a permission detour.
    requestNotificationPermission();

    // SMOKE TEST — REMOVE
    // Schedules a one-off notification 5s after app boot so we can verify
    // the local-notification pipeline end to end (permission → schedule →
    // OS delivery → tap → deep link to /activity-details/details?id=1).
    (async () => {
      await requestNotificationPermission();
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "Smoke test",
          body: "fires 5s after boot",
          data: { activity_id: "1" },
        },
        trigger: {
          type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
          seconds: 5,
        } as any,
      });
      console.log("[smoke] scheduled 5s notification");
    })();

    return unsubscribe;
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <PaperProvider>
        <AuthProvider>
          <Stack
            screenOptions={{
              headerShown: false,
            }}
          />

          <GlobalLoading />
        </AuthProvider>
      </PaperProvider>
    </GestureHandlerRootView>
  );
}