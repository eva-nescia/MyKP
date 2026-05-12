import { ProfileResponse } from '../model/types';

const API_URL = 'http://192.168.1.15:8000/api';

export const getProfile = async (userId: number): Promise<ProfileResponse> => {
  const response = await fetch(`${API_URL}/profile/${userId}`);

  if (!response.ok) {
    throw new Error(`Failed to load profile (HTTP ${response.status})`);
  }

  return await response.json();
};
