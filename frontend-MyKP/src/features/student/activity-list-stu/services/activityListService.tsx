import { Activity } from "../model/types";
import { API_URL } from '../../../../constants/apiConfig';

const MONTH_INDEX: Record<string, number> = {
  january: 0,
  february: 1,
  march: 2,
  april: 3,
  may: 4,
  june: 5,
  july: 6,
  august: 7,
  september: 8,
  october: 9,
  november: 10,
  december: 11,
};

const parseActivityDate = (date: string) => {
  const normalized = date.replace(",", "");
  const parts = normalized.split(/\s+/);
  const day = Number(parts[1]);
  const month = MONTH_INDEX[parts[2]?.toLowerCase()];
  const year = Number(parts[3]);

  if (
    Number.isNaN(day) ||
    month === undefined ||
    Number.isNaN(year)
  ) {
    return Number.POSITIVE_INFINITY;
  }

  return new Date(year, month, day).getTime();
};

const sortByNearestUpcomingDate = (
  activities: Activity[]
) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return [...activities].sort((a, b) => {
    const dateA = parseActivityDate(a.date);
    const dateB = parseActivityDate(b.date);
    const aIsPast = dateA < today.getTime();
    const bIsPast = dateB < today.getTime();

    if (aIsPast !== bIsPast) {
      return aIsPast ? 1 : -1;
    }

    return aIsPast
      ? dateB - dateA
      : dateA - dateB;
  });
};

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

    const response = await fetch(url, { headers: { Accept: 'application/json' } });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch activities (HTTP ${response.status})`);
    }

    const data = await response.json();

    // Map backend response to frontend Activity interface
    // Handle image as URI if available, otherwise use placeholder
    const activities = data.map((act: any) => ({
      id: act.id,
      title: act.title,
      image: act.image ? { uri: act.image } : require('../../../../../assets/images/activity-placeholder/seminarAntiNarkoba.jpeg'),
      type: act.type,
      points: act.points,
      date: act.date,
    }));

    return sortByNearestUpcomingDate(activities);
  } catch (error) {
    console.error('Error fetching activities:', error);
    throw error;
  }
};
