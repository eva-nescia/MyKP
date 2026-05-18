import { useEffect, useState } from "react";

import * as Linking from "expo-linking";

import { Activity } from "@/models/activity";

import { fetchActivityById } from "../services/activityDetailService";
import {
  addBookmark,
  getBookmarkStatus,
  removeBookmark,
} from "@/features/student/bookmark/services/bookmarkService";

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
