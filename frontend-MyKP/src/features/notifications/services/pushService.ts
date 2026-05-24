// Local notification setup. No server pushes, no FCM/APNs credentials.
//
// expo-notifications is loaded dynamically so the app still boots if someone
// forgot to install the dep — every helper just no-ops in that case.
//
// What's here:
//   - installNotificationHandlers(): foreground banner + tap-to-deep-link
//   - requestNotificationPermission(): one-shot OS prompt, idempotent
//   - scheduleBookmarkReminders(): when a student bookmarks an activity,
//       schedule 3 local notifications (3 / 2 / 1 days before the deadline
//       at 08:00). Fire even if the app is closed or the backend is down.
//   - cancelBookmarkReminders(): when the student un-bookmarks, cancel any
//       pending reminders for that activity.

import { Platform } from 'react-native';

type ExpoNotificationsModule = typeof import('expo-notifications');

let cachedNotifications: ExpoNotificationsModule | null | undefined;

const loadNotifications = (): ExpoNotificationsModule | null => {
  if (cachedNotifications !== undefined) return cachedNotifications;
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    cachedNotifications = require('expo-notifications') as ExpoNotificationsModule;
  } catch {
    console.warn('[notif] expo-notifications is not installed; skipping setup.');
    cachedNotifications = null;
  }
  return cachedNotifications;
};

/**
 * Wires Expo's foreground-notification handler so pushes received while the
 * app is open still surface a banner, plus a tap listener that deep-links
 * into the activity detail screen when the notification carries an
 * `activity_id` payload.
 */
export const installNotificationHandlers = (
  onActivityTap: (activityId: string) => void,
): (() => void) => {
  const Notifications = loadNotifications();
  if (!Notifications) return () => {};

  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowBanner: true,
      shouldShowList: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    }),
  });

  const sub = Notifications.addNotificationResponseReceivedListener((response) => {
    const data = response.notification.request.content.data as
      | { activity_id?: string }
      | undefined;
    if (data?.activity_id) {
      onActivityTap(String(data.activity_id));
    }
  });

  return () => sub.remove();
};

/**
 * Ask the OS for notification permission. Idempotent — if already granted
 * (or already denied), returns the current status without re-prompting.
 * Call once early in the app boot so the prompt appears before the first
 * bookmark is created.
 */
export const requestNotificationPermission = async (): Promise<boolean> => {
  const Notifications = loadNotifications();
  if (!Notifications) return false;

  try {
    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.DEFAULT,
      });
    }

    const existing = await Notifications.getPermissionsAsync();
    if (existing.status === 'granted') return true;

    const req = await Notifications.requestPermissionsAsync();
    return req.status === 'granted';
  } catch (err) {
    console.warn('[notif] permission request failed', err);
    return false;
  }
};

// 3 / 2 / 1 days before the deadline — matches the in-app reminder cadence.
const REMINDER_DAYS_BEFORE = [3, 2, 1] as const;
// Hour-of-day the reminders fire on. 08:00 local time matches the original
// server-side scheduled command.
const REMINDER_HOUR = 8;

interface ScheduleParams {
  activityId: string;
  activityName: string;
  /** YYYY-MM-DD (registration_deadline_date from the API). */
  deadlineDate: string;
}

/**
 * Schedule up to 3 local reminders for a bookmarked activity. Trigger points
 * already in the past are skipped (e.g. user bookmarks with 1 day left → only
 * the 1-day reminder is scheduled).
 *
 * Each scheduled notification carries the activity_id in its data payload so:
 *   1. the tap handler deep-links to the right activity, and
 *   2. cancelBookmarkReminders() can find and cancel them later.
 */
export const scheduleBookmarkReminders = async ({
  activityId,
  activityName,
  deadlineDate,
}: ScheduleParams): Promise<void> => {
  const Notifications = loadNotifications();
  if (!Notifications || !deadlineDate) return;

  const granted = await requestNotificationPermission();
  if (!granted) return;

  // Cancel any existing reminders for this activity first so a re-bookmark
  // doesn't accumulate duplicates.
  await cancelBookmarkReminders(activityId);

  const [y, m, d] = deadlineDate.split('-').map((s) => parseInt(s, 10));
  if (!y || !m || !d) return;

  const now = Date.now();
  const scheduled: number[] = [];
  const skipped: number[] = [];

  for (const daysBefore of REMINDER_DAYS_BEFORE) {
    const trigger = new Date(y, m - 1, d - daysBefore, REMINDER_HOUR, 0, 0);
    if (trigger.getTime() <= now) {
      skipped.push(daysBefore);
      continue;
    }

    const label = daysBefore === 1 ? '1 day' : `${daysBefore} days`;

    try {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: `Registration deadline in ${label}`,
          body: activityName,
          sound: 'default',
          data: {
            type: 'reminder',
            activity_id: activityId,
            days_before: daysBefore,
          },
        },
        trigger: {
          type: Notifications.SchedulableTriggerInputTypes.DATE,
          date: trigger,
        } as any,
      });
      scheduled.push(daysBefore);
    } catch (err) {
      console.warn('[notif] failed to schedule reminder', err);
    }
  }

  console.log(
    `[notif] bookmark ${activityId} (deadline ${deadlineDate}): scheduled ${scheduled.length} reminder(s) [${scheduled.join(', ')}d], skipped ${skipped.length} past [${skipped.join(', ')}d]`,
  );
};

/**
 * Cancel every scheduled reminder belonging to this activity. Cheap to call
 * even when nothing is scheduled.
 */
export const cancelBookmarkReminders = async (activityId: string): Promise<void> => {
  const Notifications = loadNotifications();
  if (!Notifications) return;

  try {
    const scheduled = await Notifications.getAllScheduledNotificationsAsync();
    for (const item of scheduled) {
      const data = item.content.data as { activity_id?: string } | undefined;
      if (String(data?.activity_id ?? '') === String(activityId)) {
        await Notifications.cancelScheduledNotificationAsync(item.identifier);
      }
    }
  } catch (err) {
    console.warn('[notif] failed to cancel reminders', err);
  }
};
