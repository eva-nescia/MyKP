import { API_URL } from '../../../../constants/apiConfig';
import { getToken } from '../../../auth/services/session';

export type NotificationType =
  | "reminder"
  | "success"
  | "notification";

export type NotificationItem = {
  id: string;
  type: NotificationType;
  title: string;
  description: string;
  time: string;
};

export type NotificationGroups = {
  today: NotificationItem[];
  yesterday: NotificationItem[];
  thisWeek: NotificationItem[];
  older: NotificationItem[];
};

type BackendRow = {
  id: string;
  type: NotificationType;
  title: string;
  description: string;
  fired_at: string;
};

const authHeaders = (): Record<string, string> => {
  const token = getToken();
  return {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

const emptyGroups = (): NotificationGroups => ({
  today: [],
  yesterday: [],
  thisWeek: [],
  older: [],
});

const formatRelativeTime = (firedAtMs: number, nowMs: number): string => {
  const diffMs = Math.max(0, nowMs - firedAtMs);
  const minutes = Math.floor(diffMs / 60_000);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);

  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes} minute${minutes === 1 ? "" : "s"} ago`;
  if (hours < 24) return `${hours} hour${hours === 1 ? "" : "s"} ago`;
  if (days < 7) return `${days} day${days === 1 ? "" : "s"} ago`;
  return `${weeks} week${weeks === 1 ? "" : "s"} ago`;
};

const bucketOf = (firedAt: Date, now: Date): keyof NotificationGroups => {
  const startOfDay = (d: Date) => {
    const c = new Date(d);
    c.setHours(0, 0, 0, 0);
    return c.getTime();
  };
  const today0 = startOfDay(now);
  const fired0 = startOfDay(firedAt);
  const daysAgo = Math.round((today0 - fired0) / 86_400_000);

  if (daysAgo <= 0) return 'today';
  if (daysAgo === 1) return 'yesterday';
  if (daysAgo < 7) return 'thisWeek';
  return 'older';
};

export const fetchUnreadCount = async (): Promise<number> => {
  try {
    const response = await fetch(`${API_URL}/notifications/unread-count`, { headers: authHeaders() });
    if (!response.ok) return 0;
    const data = await response.json();
    return typeof data?.count === 'number' ? data.count : 0;
  } catch {
    return 0;
  }
};

export const fetchNotifications = async (): Promise<NotificationGroups> => {
  const response = await fetch(`${API_URL}/notifications`, { headers: authHeaders() });
  if (!response.ok) {
    throw new Error(`Failed to fetch notifications (HTTP ${response.status})`);
  }

  const rows: BackendRow[] = await response.json();
  const now = new Date();
  const nowMs = now.getTime();

  const groups = emptyGroups();
  for (const row of rows) {
    const firedAt = new Date(row.fired_at);
    const item: NotificationItem = {
      id: row.id,
      type: row.type,
      title: row.title,
      description: row.description,
      time: formatRelativeTime(firedAt.getTime(), nowMs),
    };
    groups[bucketOf(firedAt, now)].push(item);
  }

  return groups;
};
