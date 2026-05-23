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
      date: activity.date,
      year: new Date(activity.date).getFullYear().toString(),
      organizer: "Admin",
    }));
  } catch (error) {
    console.error('Error fetching admin activities:', error);
    return [];
  }
}

export async function deleteAdminActivity(
  id: string
): Promise<boolean> {
  try {
    const token = getToken();

    console.log("DEBUG: Deleting activity with ID:", id);
    console.log("DEBUG: Using API_URL:", API_URL);
    console.log("DEBUG: Token present:", !!token);

    const response = await fetch(
      `${API_URL}/activities/${id}`,
      {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          ...(token
            ? {
                Authorization: `Bearer ${token}`,
              }
            : {}),
        },
      }
    );

    console.log("DEBUG: Delete response status:", response.status);
    console.log("DEBUG: Delete response ok:", response.ok);

    if (!response.ok) {
      const errorText = await response.text();
      console.error(
        "Failed to delete activity:",
        response.status,
        errorText
      );

      return false;
    }

    const result = await response.json();
    console.log("DEBUG: Activity deleted successfully:", result);

    return true;
  } catch (error) {
    console.error(
      "Error deleting activity:",
      error instanceof Error ? error.message : String(error)
    );

    return false;
  }
}
