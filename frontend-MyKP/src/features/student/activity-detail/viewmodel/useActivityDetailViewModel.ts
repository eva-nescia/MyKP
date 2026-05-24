import { useEffect, useState } from "react";
import {
  Alert,
  Linking,
} from "react-native";

import { Activity } from "@/models/activity";

import { fetchActivityById } from "../services/activityDetailService";
import {
  addBookmark,
  getBookmarkStatus,
  removeBookmark,
} from "@/features/student/bookmark/services/bookmarkService";
import {
  cancelBookmarkReminders,
  scheduleBookmarkReminders,
} from "@/features/notifications/services/pushService";
import { registerForActivity } from "@/features/student/profile/services/participationService";

export const useActivityDetailViewModel = (
  id: string
) => {
  const [activity, setActivity] =
    useState<Activity | null>(null);

  const [saved, setSaved] = useState(false);

  const [modalSavedState, setModalSavedState] =
    useState(false);

  const [saveMessage, setSaveMessage] =
    useState("");

  const [showSaveModal, setShowSaveModal] =
    useState(false);

  useEffect(() => {
    const load = async () => {
      const data =
        await fetchActivityById(id);

      setActivity(data);

      try {
        const status =
          await getBookmarkStatus(id);

        setSaved(status);
      } catch {
        // unauthenticated viewers default to unsaved
      }
    };

    load();
  }, [id]);

  const handleSave = async () => {
    const nextSaved = !saved;

    setSaved(nextSaved);
    setModalSavedState(nextSaved);

    try {
      if (nextSaved) {
        await addBookmark(id);
        // Local notif: schedule 3/2/1-day reminders. No-ops if there's no
        // deadline, or if all 3 fire-points are already past.
        if (activity?.registrationDeadlineDate) {
          await scheduleBookmarkReminders({
            activityId: id,
            activityName: activity.title,
            deadlineDate: activity.registrationDeadlineDate,
          });
        }
      } else {
        await removeBookmark(id);
        await cancelBookmarkReminders(id);
      }

      setSaveMessage(
        nextSaved
          ? "Activity saved successfully."
          : "Activity removed from saved."
      );
    } catch {
      setSaved(!nextSaved);
      setModalSavedState(!nextSaved);

      setSaveMessage(
        "Couldn't update saved status. Please try again."
      );
    }

    setShowSaveModal(true);

    setTimeout(() => {
      setShowSaveModal(false);
    }, 1000);
  };

  const handleRegister = async () => {
    if (!activity) {
      Alert.alert("Error", "Activity data not loaded");
      return;
    }

    try {
      // Step 1: Call API to record participation + update KP
      console.log('[REGISTER] Calling API for activity ID:', activity.id);
      const result = await registerForActivity(activity.id);

      // Step 2: Check if already registered
      if (result.alreadyRegistered) {
        Alert.alert(
          "Already Registered",
          "You have already registered for this activity."
        );
        return;
      }

      // Step 3: Show success message
      let message = "✅ Registered! KP recorded.";
      if (result.kpProgressUpdated) {
        message += " Progress updated!";
      }

      // Step 4: Open external registration form if available
      const registrationLink = activity?.registrationLink;
      
      if (!registrationLink) {
        Alert.alert("Success", message);
        return;
      }

      Alert.alert("Success", message + "\n\nOpen the registration form?", [
        {
          text: "Open Form",
          onPress: async () => {
            const canOpen = await Linking.canOpenURL(registrationLink);
            if (!canOpen) {
              Alert.alert(
                "Cannot open link",
                "Please copy and paste the link manually."
              );
              return;
            }
            Linking.openURL(registrationLink);
          },
        },
        { text: "Done", style: "default" },
      ]);
    } catch (error) {
      console.error('[REGISTER] Error:', error);
      const errorMsg = error instanceof Error ? error.message : "Unknown error";
      Alert.alert("Registration Failed", errorMsg);
    }
  };

  return {
    activity,

    saved,
    modalSavedState,
    saveMessage,

    showSaveModal,
    setShowSaveModal,

    handleSave,
    handleRegister,
  };
};
