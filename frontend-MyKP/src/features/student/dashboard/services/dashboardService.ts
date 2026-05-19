import { DashboardData } from "../model/types";
import { API_URL } from '../../../../constants/apiConfig';

export const fetchDashboard = async (token: string): Promise<DashboardData> => {
  console.log(`[DEBUG] fetchDashboard initiated to URL: ${API_URL}/dashboard`);
  console.log(`[DEBUG] Using token length: ${token ? token.length : 'NULL'}`);
  
  try {
    const response = await fetch(`${API_URL}/dashboard`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });

    console.log(`[DEBUG] fetchDashboard response status:`, response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.log(`[DEBUG] Response Error Text:`, errorText);
      throw new Error(`Error ${response.status}: Failed to fetch dashboard data`);
    }

    const data = await response.json();
    console.log(`[DEBUG] fetchDashboard successful data payload:`, JSON.stringify(data).substring(0, 100) + '...');

    data.activities = data.activities.map((act: any) => ({
      ...act,
      image: act.image ? { uri: act.image } : require('../../../../../assets/images/activity-placeholder/seminarAntiNarkoba.jpeg')
    }));

    return data;
  } catch (error) {
    console.error(`[DEBUG] fetchDashboard fatal error:`, error);
    throw error;
  }
};