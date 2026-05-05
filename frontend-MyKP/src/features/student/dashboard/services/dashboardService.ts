import { DashboardData } from "../model/types";

//  replace with axios later
export const fetchDashboard = async (): Promise<DashboardData> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        userName: "Ye Shunguang",
        kpProgress: 35,
        totalKP: 100,
        activities: [
          {
            id: "1",
            title: "Seminar Bela Negara & Anti Narkoba",
            image: require("assets/images/activity-placeholder/seminarAntiNarkoba.jpeg"), 
            type: "Talkshow Wajib",
            points: 6,
            date: "Sat, 29 November 2025",
          },
        ],
      });
    }, 500);
  });
};