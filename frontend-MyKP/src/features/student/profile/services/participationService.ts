import { API_URL } from '../../../../constants/apiConfig';
import { getToken } from '../../../auth/services/session';

export interface ParticipationHistoryItem {
  id: string;
  activityId: string;
  title: string;
  organizer: string;
  date: string;
  kp: string;
  status: 'Completed' | 'On Progress';
  kpCategory: string;
  image: any;
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

export interface RegisterResult {
  alreadyRegistered: boolean;
  kpProgressUpdated: boolean;
}

export const registerForActivity = async (activityId: string): Promise<RegisterResult> => {
  const response = await fetch(`${API_URL}/activities/${activityId}/register`, {
    method: 'POST',
    headers: authHeaders(),
  });

  if (response.status === 409) {
    return { alreadyRegistered: true, kpProgressUpdated: false };
  }
  if (!response.ok) {
    throw new Error(`Failed to register (HTTP ${response.status})`);
  }
  const data = await response.json();
  return {
    alreadyRegistered: false,
    kpProgressUpdated: Boolean(data?.kp_progress_updated),
  };
};

export const fetchParticipationHistory = async (
  category?: string,
): Promise<ParticipationHistoryItem[]> => {
  const params = new URLSearchParams();
  if (category && category.trim()) {
    params.append('category', category.trim());
  }
  const qs = params.toString();
  const url = qs ? `${API_URL}/participations?${qs}` : `${API_URL}/participations`;

  const response = await fetch(url, { headers: authHeaders() });
  if (!response.ok) {
    throw new Error(`Failed to fetch participation history (HTTP ${response.status})`);
  }
  const data = await response.json();
  return data.map((row: any) => ({
    id: row.id,
    activityId: row.activity_id,
    title: row.title,
    organizer: row.organizer,
    date: row.date,
    kp: row.kp,
    status: row.status,
    kpCategory: row.kp_category,
    image: row.image ? { uri: row.image } : placeholder,
  }));
};
