import { API_URL } from '../../../../constants/apiConfig';
import { getToken } from '../../../auth/services/session';

export interface SavedActivity {
  id: string;
  title: string;
  image: any;
  organizer: string;
  type: string;
  points: number;
  date: string;
}

const placeholder = require('../../../../../assets/images/activity-placeholder/seminarAntiNarkoba.jpeg');

const authHeaders = (): Record<string, string> => {
  const token = getToken();
  return {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

export const fetchBookmarks = async (): Promise<SavedActivity[]> => {
  const response = await fetch(`${API_URL}/bookmarks`, { headers: authHeaders() });
  if (!response.ok) {
    throw new Error(`Failed to fetch bookmarks (HTTP ${response.status})`);
  }
  const data = await response.json();
  return data.map((act: any) => ({
    id: act.id,
    title: act.title,
    image: act.image ? { uri: act.image } : placeholder,
    organizer: act.organizer,
    type: act.type,
    points: act.points,
    date: act.date,
  }));
};

export const addBookmark = async (activityId: string): Promise<void> => {
  const response = await fetch(`${API_URL}/bookmarks`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify({ activity_id: Number(activityId) }),
  });
  if (!response.ok) {
    throw new Error(`Failed to save bookmark (HTTP ${response.status})`);
  }
};

export const removeBookmark = async (activityId: string): Promise<void> => {
  const response = await fetch(`${API_URL}/bookmarks/${activityId}`, {
    method: 'DELETE',
    headers: authHeaders(),
  });
  if (!response.ok) {
    throw new Error(`Failed to remove bookmark (HTTP ${response.status})`);
  }
};

export const getBookmarkStatus = async (activityId: string): Promise<boolean> => {
  const response = await fetch(`${API_URL}/bookmarks/${activityId}`, { headers: authHeaders() });
  if (!response.ok) {
    return false;
  }
  const data = await response.json();
  return Boolean(data.saved);
};
