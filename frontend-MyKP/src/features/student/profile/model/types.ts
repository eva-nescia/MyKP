export interface KPCategory {
  id: number;
  title: string;
  current: number;
  target: number;
  status: "Completed" | "On Progress";
  percentage: number;
}

export interface KPSummary {
  completed: number;
  in_progress: number;
  total_current: number;
  total_target: number;
  overall_percentage: number;
}

export interface ProfileUser {
  id: number;
  name: string;
  nim: string;
  email: string;
  jurusan: string | null;
  role: string;
  profile_picture: string | null;
}

export interface ProfileResponse {
  user: ProfileUser;
  kp_categories: KPCategory[];
  kp_summary: KPSummary;
}

export interface ParticipationHistory {
  id: number;
  title: string;
  date: string;
  kp: string;
  status: "Completed" | "On Progress";
  image: any;
}
