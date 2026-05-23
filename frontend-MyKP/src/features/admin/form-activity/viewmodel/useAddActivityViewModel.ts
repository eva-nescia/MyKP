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

  const validateRequiredFields = () => {
    const state = useAddActivityStore.getState();

    const rules = [
      {
        label: "Activity Poster",
        invalid: !state.image,
      },
      {
        label: "Activity Name",
        invalid: !state.name.trim(),
      },
      {
        label: "Category",
        invalid: !state.category,
      },
      {
        label: "KP Amount",
        invalid: !state.kp.trim(),
      },
      {
        label: "Eligible Generations",
        invalid: state.generations.length === 0,
      },
      {
        label: "Eligible Study Programs",
        invalid: state.studyPrograms.length === 0,
      },
      {
        label: "Event Description",
        invalid: !state.description.trim(),
      },
      {
        label: "Activity Date",
        invalid: !state.eventDate,
      },
      {
        label: "Start Time",
        invalid: !state.startTime,
      },
      {
        label: "End Time",
        invalid: !state.endTime,
      },
      {
        label: "Registration Deadline Date",
        invalid: !state.registrationDeadlineDate,
      },
      {
        label: "Registration Deadline Time",
        invalid: !state.registrationDeadlineTime,
      },
      {
        label: "Location",
        invalid: !state.location.trim(),
      },
      {
        label: "Registration Link",
        invalid: !state.registrationLink.trim(),
      },
      {
        label: "Requirements",
        invalid:
          state.requirements.length === 0 ||
          state.requirements.some((item) => !item.trim()),
      },
      {
        label: "Contacts",
        invalid:
          state.contacts.length === 0 ||
          state.contacts.some((item) => !item.trim()),
      },
    ];

    return rules
      .filter((rule) => rule.invalid)
      .map((rule) => rule.label);
  };

  const [showValidationModal, setShowValidationModal] =
  useState(false);

  const [validationMessage, setValidationMessage] =
  useState("");

  const showValidation = (message: string) => {
    setValidationMessage(message);
    setShowValidationModal(true);
  };

  const handlePublish = () => {
    const missingFields =
      validateRequiredFields();

    if (missingFields.length > 0) {
      if (missingFields.length === 1) {
        showValidation(
          `${missingFields[0]} is still required.`
        );
      } else {
        const formattedList =
          missingFields
            .map((field) => `• ${field}`)
            .join("\n");

        showValidation(
          `Please complete the following fields:\n\n${formattedList}`
        );
      }

      return;
    }

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

    showValidationModal,
    setShowValidationModal,
    validationMessage,
  };
}