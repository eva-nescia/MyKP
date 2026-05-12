export interface KPCategory {
  id: number;
  title: string;
  current: number;
  total: number;
}

export interface ParticipationHistory {
  id: number;
  title: string;
  date: string;
  kp: string;
  status: "Completed" | "On Progress";
  image: any;
}

export interface ProfileData {
  name: string;
  studentId: string;
  studyProgram: string;
  cohort: string;
  profilePicture: any;
}