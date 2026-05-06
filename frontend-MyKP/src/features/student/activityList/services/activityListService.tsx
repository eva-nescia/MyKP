import { Activity } from "../model/types";

export const fetchActivities = async (): Promise<Activity[]> => {
  return [
    {
      id: "1",
      title: "Seminar Bela Negara & Anti Narkoba",
      image: require("assets/images/activity-placeholder/seminarAntiNarkoba.jpeg"),
      type: "Talkshow Wajib",
      points: 6,
      date: "Sat, 29 November 2025",
    },
    {
      id: "2",
      title: "Leadership Workshop",
      image: require("assets/images/activity-placeholder/seminarAntiNarkoba.jpeg"),
      type: "Workshop",
      points: 4,
      date: "Mon, 12 October 2025",
    },
  ];
};