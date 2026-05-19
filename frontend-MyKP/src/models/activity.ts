export interface Activity {
  id: string;
  title: string;
  image: any;
  type: string;
  points: number;
  
  date: string;
  startTime?: string;
  endTime?: string;
  year: string;

  organizer?: string;
  location?: string;
  eligibleStudyProgram?: string; // e.g., "All Prodi"
  eligibleCohort?: string; // e.g., "All Gen"

  description?: string;
  requirement?: string[];
  howToClaim?: string[];
  contactPerson?: string[];
  registrationLink?: string;
}