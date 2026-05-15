import { Activity } from "../model/types";
import { API_URL } from '../../../../constants/apiConfig';

export const fetchActivities = async (search?: string, category?: string): Promise<Activity[]> => {
  try {
    // Build query string
    const params = new URLSearchParams();
    if (search && search.trim()) {
      params.append('search', search.trim());
    }
    if (category && category !== 'All' && category.trim()) {
      params.append('category', category.trim());
    }

    const queryString = params.toString();
    const url = queryString ? `${API_URL}/activities?${queryString}` : `${API_URL}/activities`;

    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch activities (HTTP ${response.status})`);
    }

    const data = await response.json();

    // Map backend response to frontend Activity interface
    // Handle image as URI if available, otherwise use placeholder
    return data.map((act: any) => ({
      id: act.id,
      title: act.title,
      image: act.image ? { uri: act.image } : require('../../../../../assets/images/activity-placeholder/seminarAntiNarkoba.jpeg'),
      type: act.type,
      points: act.points,
      date: act.date,
    }));
  } catch (error) {
    console.error('Error fetching activities:', error);
    throw error;
  }
};