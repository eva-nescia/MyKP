import { API_URL } from '../../../../constants/apiConfig';
import { getToken, restoreSession } from '../../../auth/services/session';

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

const authHeaders = async (): Promise<Record<string, string>> => {
  if (!getToken()) {
    await restoreSession();
  }

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
  try {
    const token = getToken();
    const url = `${API_URL}/activities/${activityId}/register`;
    
    console.log('[REGISTER] API call details:', {
      url,
      activityId,
      hasToken: !!token,
    });

    const response = await fetch(url, {
      method: 'POST',
      headers: await authHeaders(),
    });

    console.log('[REGISTER] API response status:', response.status);

    if (response.status === 409) {
      console.log('[REGISTER] Already registered (409)');
      return { alreadyRegistered: true, kpProgressUpdated: false };
    }
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('[REGISTER] API error:', { status: response.status, text: errorText });
      throw new Error(`Failed to register (HTTP ${response.status}): ${errorText}`);
    }
    
    const data = await response.json();
    console.log('[REGISTER] Success response:', data);
    
    return {
      alreadyRegistered: false,
      kpProgressUpdated: Boolean(data?.kp_progress_updated),
    };
  } catch (error) {
    console.error('[REGISTER] Fatal error:', error);
    throw error;
  }
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

  const response = await fetch(url, { headers: await authHeaders() });
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
