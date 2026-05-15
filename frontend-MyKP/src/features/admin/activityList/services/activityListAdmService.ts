import { Activity } from "@/models/activity";

export function getAdminActivities(): Activity[] {
  return [
    {
      id: "1",

      title:
        "Oprec President & Vice Student Council 26/27",

      image: require(
        "assets/images/activity-placeholder/seminarAntiNarkoba.jpeg"
      ),

      type: "Organisasi",

      points: 25,

      date: "Sat, 29 November 2025",

      year: "2025",

      organizer: "Student Council",
    },

    {
      id: "2",

      title:
        "Seminar Bela Negara & Anti Narkoba",

      image: require(
        "assets/images/activity-placeholder/seminarAntiNarkoba.jpeg"
      ),

      type: "Talkshow Wajib BMA",

      points: 6,

      date: "Sat, 29 November 2025",

      year: "2025",

      organizer: "BMA",
    },
  ];
}