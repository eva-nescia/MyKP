export interface Activity {
  id: string;
  title: string;
  image: any;
  type: string;
  points: number;
  date: string;
}

export interface DashboardData {
  userName: string;
  kpProgress: number;
  totalKP: number;
  activities: Activity[];
}