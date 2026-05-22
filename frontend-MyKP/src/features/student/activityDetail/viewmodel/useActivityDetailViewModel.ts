import { useEffect, useState } from "react";

import { Activity } from "@/models/activity";

import { fetchActivityById } from "../services/activityDetailService";
import {
  addBookmark,
  getBookmarkStatus,
  removeBookmark,
} from "@/features/student/bookmark/services/bookmarkService";
import { registerForActivity } from "@/features/student/profile/services/participationService";
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

  const [showLinkModal, setShowLinkModal] =
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
    }, 1600);
  };

  const handleRegister = () => {
    setShowLinkModal(true);
  };

  const confirmRegister = async () => {
    setShowLinkModal(false);

    try {
      const result =
        await registerForActivity(id);

      setModalSavedState(true);

      setSaveMessage(
        result.alreadyRegistered
          ? "You're already registered for this activity."
          : "Successfully registered!"
      );
    } catch {
      setModalSavedState(false);

      setSaveMessage(
        "Couldn't register right now. Please try again."
      );
    }

    setShowSaveModal(true);

    setTimeout(() => {
      setShowSaveModal(false);
    }, 1600);
  };

  return {
    activity,

    saved,
    modalSavedState,
    saveMessage,

    showSaveModal,
    setShowSaveModal,

    showLinkModal,
    setShowLinkModal,

    handleSave,
    handleRegister,
    confirmRegister,
  };
};