import { Activity } from "@/models/activity";

export const fetchActivityById = async (id: string): Promise<Activity> => {
  const data: Activity[] = [
    {
      id: "1",
      title: "Seminar Bela Negara & Anti Narkoba",
      image: require("assets/images/activity-placeholder/seminarAntiNarkoba.jpeg"),
      organizer: "BMA",
      location: "Auditorium\n7th floor",
      type: "Talkshow Wajib",
      points: 6,
      eligibleStudyProgram: "All Prodi",
      eligibleCohort: "All Gen",
      date: "Fri, 26 Feb 2026\n23:59",

      description:
        "Seminar ini bertujuan untuk meningkatkan kesadaran mahasiswa terhadap pentingnya bela negara dan bahaya narkoba.",

      requirement: [
        "Mahasiswa aktif UC Makassar",
        "Mengisi form pendaftaran",
      ],

      howToClaim: [
        "Hadiri seminar",
        "Isi absensi",
        "KP akan diberikan setelah verifikasi",
      ],

      contactPerson: [
        "Jose BMA - 08123456789", 
        "Patrick BMA -08123456789"],

      registrationLink: "https://example.com",
    },
  ];

  return data.find((item) => item.id === id)!;
};