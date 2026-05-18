import { Activity } from "@/models/activity";
import { API_URL } from '../../../../constants/apiConfig';

export const fetchActivityById = async (id: string): Promise<Activity> => {
try {
    const url = `${API_URL}/activities/${id}`;

    const response = await fetch(url, { headers: { Accept: 'application/json' } });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch activity (HTTP ${response.status})`);
    }

    const act = await response.json();

    return {
      id: act.id,
      title: act.title,
      image: act.image ? { uri: act.image } : require('../../../../../assets/images/activity-placeholder/seminarAntiNarkoba.jpeg'),
      organizer: act.organizer,
      location: act.location,
      type: act.type,
      points: act.points,
      year: new Date(act.date).getFullYear().toString(),
      eligibleStudyProgram: act.eligibleStudyProgram,
      eligibleCohort: act.eligibleCohort,
      date: act.date,
      description: act.description,
      requirement: act.requirement,
      howToClaim: act.howToClaim,
      contactPerson: act.contactPerson,
      registrationLink: act.registrationLink,
    };
  } catch (error) {
    console.error('Error fetching activity:', error);
    throw error;
  }
};