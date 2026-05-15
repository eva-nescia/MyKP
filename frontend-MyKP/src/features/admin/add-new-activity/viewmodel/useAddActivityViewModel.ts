import { useState } from "react";
import { useRouter } from "expo-router";
import { useAddActivityStore } from "@/features/admin/add-new-activity/store/useAddActivityStore";

export function useAddActivityViewModel() {
  const router = useRouter();

  const { step, nextStep, prevStep, submit } = useAddActivityStore();

  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  const handlePublish = () => {
    setShowConfirm(true);
  };

  const confirmPublish = async () => {
    try {
      setShowConfirm(false);

      // smooth modal exit
      await new Promise((r) => setTimeout(r, 150));

      setLoading(true);

      await submit();

      router.replace("/(admin)/activities");
    } finally {
      setLoading(false);
    }
  };

  return {
    // store
    step,
    nextStep,
    prevStep,

    // modal state
    showConfirm,
    setShowConfirm,

    // loading
    loading,

    // actions
    handlePublish,
    confirmPublish,
  };
}