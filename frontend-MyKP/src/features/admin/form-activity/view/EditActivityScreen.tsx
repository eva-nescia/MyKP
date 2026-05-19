import { useEffect } from "react";
import { useLocalSearchParams } from "expo-router";

import AddActivityScreen from "./AddActivityScreen";
import { useAddActivityStore } from "../store/useAddActivityStore";

export default function EditActivityScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const setEditData = useAddActivityStore(
    (state) => state.setEditData
  );

  useEffect(() => {
    if (!id) return;

    // temporary mock data until CRUD/backend exists
    setEditData({
      id,

      image: null,
      name: "Oprec HOD KOOR O-WEEK 2026",
      category: "Kepanitiaan",
      kp: "25",

      generations: ["2024", "2025"],
      studyPrograms: ["All Study Program"],

      description:
        "Open recruitment for O-Week committee members.",

      eventDate: new Date(),
      startTime: new Date(),
      endTime: new Date(),

      registrationDeadlineDate: new Date(),
      registrationDeadlineTime: new Date(),

      location: "UC Makassar",
      registrationLink: "https://forms.gle/example",

      requirements: [
        "Active student",
        "Committed to attend meetings",
      ],

      contacts: [
        "BMA - 08123456789",
      ],

      claimRequirements: "",
    });
  }, [id, setEditData]);

  return <AddActivityScreen />;
}