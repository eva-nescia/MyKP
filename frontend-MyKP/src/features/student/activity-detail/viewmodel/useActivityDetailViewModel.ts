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
    const registrationLink =
      activity?.registrationLink;

    if (!registrationLink) {
      Alert.alert(
        "Registration unavailable",
        "This activity does not have a registration link yet."
      );
      return;
    }

    const canOpen =
      await Linking.canOpenURL(registrationLink);

    if (!canOpen) {
      Alert.alert(
        "Cannot open link",
        "Please check the registration link and try again."
      );
      return;
    }

    Linking.openURL(registrationLink);
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
