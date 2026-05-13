import { ProfileResponse } from '../model/types';
import { API_URL } from '../../../../constants/apiConfig';

export const getProfile = async (userId: number): Promise<ProfileResponse> => {
  const response = await fetch(`${API_URL}/profile/${userId}`);

  if (!response.ok) {
    throw new Error(`Failed to load profile (HTTP ${response.status})`);
  }

  return await response.json();
};
