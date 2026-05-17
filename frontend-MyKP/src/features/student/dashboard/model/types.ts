import { Activity } from "@/models/activity";


export interface DashboardData {
  userName: string;
  kpProgress: number;
  totalKP: number;
  date: string;
  activities: Activity[];
}