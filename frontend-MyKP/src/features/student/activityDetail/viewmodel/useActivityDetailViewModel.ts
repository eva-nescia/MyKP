import { useEffect, useState } from "react";

import * as Linking from "expo-linking";

import { Activity } from "@/models/activity";

import { fetchActivityById } from "../services/activityDetailService";
import {
  addBookmark,
  getBookmarkStatus,
  removeBookmark,
} from "@/features/student/bookmark/services/bookmarkService";
import { registerForActivity } from "@/features/student/profile/services/participationService";

export const useActivityDetailViewModel = (
  id: string
) => {
  const [activity, setActivity] =
    useState<Activity | null>(null);

  const [saved, setSaved] =
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
        const status = await getBookmarkStatus(id);
        setSaved(status);
      } catch {
        // ignore — unauthenticated viewers default to unsaved
      }
    };

    load();
  }, [id]);

  /* SAVE */

  const handleSave = async () => {
    const nextSaved = !saved;

    setSaved(nextSaved);

    try {
      if (nextSaved) {
        await addBookmark(id);
      } else {
        await removeBookmark(id);
      }

      setSaveMessage(
        nextSaved
          ? "Activity saved successfully."
          : "Activity removed from saved."
      );
    } catch {
      setSaved(!nextSaved);
      setSaveMessage(
        "Couldn't update saved status. Please try again."
      );
    }

    setShowSaveModal(true);

    setTimeout(() => {
      setShowSaveModal(false);
    }, 1600);
  };

  /* REGISTER */

  const handleRegister = () => {
    setShowLinkModal(true);
  };

  const confirmRegister = async () => {
    setShowLinkModal(false);

    // Record the participation + bump KP before opening the external form.
    // We deliberately don't block the link open on a failed register — if the
    // user is already registered (409) or the network burps, they should still
    // be able to fill the form. We surface a toast via the save modal instead.
    try {
      const result = await registerForActivity(id);
      if (!result.alreadyRegistered) {
        setSaveMessage(
          result.kpProgressUpdated
            ? "Registered. KP added to your progress."
            : "Registered. (No matching KP category to update.)"
        );
        setShowSaveModal(true);
        setTimeout(() => setShowSaveModal(false), 1600);
      }
    } catch {
      // Silent — the link will still open below.
    }

    setTimeout(async () => {
      if (activity?.registrationLink) {
        await Linking.openURL(
          activity.registrationLink
        );
      }
    }, 250);
  };

  return {
    activity,

    saved,
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
