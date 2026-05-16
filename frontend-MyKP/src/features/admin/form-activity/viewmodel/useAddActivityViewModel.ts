import { useState } from "react";
import { useRouter } from "expo-router";
import { useAddActivityStore } from "@/features/admin/form-activity/store/useAddActivityStore";

export function useAddActivityViewModel() {
  const router = useRouter();

  const {
    mode,
    step,
    nextStep,
    prevStep,
    submit,
    reset,
  } = useAddActivityStore();

  const isEditMode = mode === "edit";

  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showDiscardConfirm, setShowDiscardConfirm] = useState(false);

  const handlePublish = () => {
    setShowConfirm(true);
  };

  const handleBackPress = () => {
    setShowDiscardConfirm(true);
  };

  const confirmDiscard = () => {
    reset();
    setShowDiscardConfirm(false);
    router.back();
  };

  const confirmPublish = async () => {
    try {
      setShowConfirm(false);

      await new Promise((r) => setTimeout(r, 150));

      setLoading(true);

      await submit();

      reset();

      router.replace("/(admin)/activities");
    } finally {
      setLoading(false);
    }
  };

  return {
    mode,
    isEditMode,

    step,
    nextStep,
    prevStep,

    showConfirm,
    setShowConfirm,

    loading,

    handlePublish,
    confirmPublish,

    showDiscardConfirm,
    setShowDiscardConfirm,
    handleBackPress,
    confirmDiscard,
  };
}