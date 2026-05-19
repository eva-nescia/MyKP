import { Activity } from "@/models/activity";
import { API_URL } from "@/constants/apiConfig";
import { getToken } from "@/features/auth/services/session";

export async function getAdminActivities(): Promise<Activity[]> {
  try {
    const token = getToken();
    
    const response = await fetch(`${API_URL}/admin/activities`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });

    if (!response.ok) {
      console.error('Failed to fetch admin activities:', response.status);
      return [];
    }

    const activities = await response.json();
    
    // Transform API response to Activity model
    return activities.map((activity: any) => ({
      id: activity.id,
      title: activity.name,
      image: activity.event_poster ? { uri: `${API_URL.replace('/api', '')}/${activity.event_poster}` } : require("assets/images/activity-placeholder/seminarAntiNarkoba.jpeg"),
      type: activity.kp_category,
      points: activity.kp_amount,
      date: new Date(activity.date).toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' }),
      year: new Date(activity.date).getFullYear().toString(),
      organizer: "Admin",
    }));
  } catch (error) {
    console.error('Error fetching admin activities:', error);
    return [];
  }
}