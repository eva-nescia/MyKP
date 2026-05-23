import React, { useState } from "react";
import { View } from "react-native";

import DateTimeField from "../form/DateTimeField";
import TextInputField from "../form/TextInputField";
import PickerField from "../form/PickerField";
import LocationBottomSheet from "../form/LocationBottomSheet";

import { useAddActivityStore } from "../../store/useAddActivityStore";
import ScheduleValidationModal from "../feedback/ScheduleValidationModal";

export default function StepSchedule() {
  const {
    eventDate,
    startTime,
    endTime,

    registrationDeadlineDate,
    registrationDeadlineTime,

    location,
    registrationLink,

    setField,
  } = useAddActivityStore();

  const [locationOpen, setLocationOpen] =
    useState(false);

  const combineDateAndTime = (
    date: Date | null,
    time: Date | null
  ) => {
    if (!date || !time) return null;

    const combined = new Date(date);

    combined.setHours(
      time.getHours(),
      time.getMinutes(),
      0,
      0
    );

    return combined;
  };

  const resetInvalidDeadline = (
    activityDate: Date | null,
    activityTime: Date | null
  ) => {
    const activityStart =
      combineDateAndTime(
        activityDate,
        activityTime
      );

    const deadline =
      combineDateAndTime(
        registrationDeadlineDate,
        registrationDeadlineTime
      );

    if (
      activityStart &&
      deadline &&
      deadline > activityStart
    ) {
      setField("registrationDeadlineDate", null);
      setField("registrationDeadlineTime", null);
    }
  };

  const handleEventDateChange = (value: Date) => {
    setField("eventDate", value);

    resetInvalidDeadline(value, startTime);
  };

  const handleStartTimeChange = (value: Date) => {
    setField("startTime", value);

    if (endTime && value > endTime) {
      setField("endTime", null);
    }

    resetInvalidDeadline(eventDate, value);
  };

  const handleEndTimeChange = (value: Date) => {
    if (startTime && value < startTime) {
      showValidation(
        "Activity end time cannot be earlier than the start time."
      );

      return;
    }

    setField("endTime", value);
  };

  const handleRegistrationDeadlineDateChange = (
    value: Date
  ) => {
    const activityStart =
      combineDateAndTime(
        eventDate,
        startTime
      );

    const deadline =
      combineDateAndTime(
        value,
        registrationDeadlineTime
      );

    if (
      activityStart &&
      deadline &&
      deadline > activityStart
    ) {
      showValidation(
        "Registration deadline cannot exceed the activity start time."
      );

      return;
    }

    setField(
      "registrationDeadlineDate",
      value
    );
  };

  const handleRegistrationDeadlineTimeChange = (
    value: Date
  ) => {
    const activityStart =
      combineDateAndTime(
        eventDate,
        startTime
      );

    const deadline =
      combineDateAndTime(
        registrationDeadlineDate,
        value
      );

    if (
      activityStart &&
      deadline &&
      deadline > activityStart
    ) {
      showValidation(
        "Registration deadline cannot exceed the activity start time."
      );

      return;
    }

    setField(
      "registrationDeadlineTime",
      value
    );
  };

  const [validationMessage, setValidationMessage] =
    useState("");

  const [showValidationModal, setShowValidationModal] =
    useState(false);

  const showValidation = (message: string) => {
    setValidationMessage(message);
    setShowValidationModal(true);
  };

  const normalizeUrl = (url: string) => {
    if (
      url.startsWith("http://") ||
      url.startsWith("https://")
    ) {
      return url;
    }

    return `https://${url}`;
  };

  const isValidUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  return (
    <View>
      <DateTimeField
        label="Activity Date"
        value={eventDate}
        mode="date"
        placeholder="Select activity date"
        onChange={handleEventDateChange}
      />

      <DateTimeField
        label="Activity Start Time"
        value={startTime}
        mode="time"
        placeholder="Select start time"
        onChange={handleStartTimeChange}
      />

      <DateTimeField
        label="Activity End Time"
        value={endTime}
        mode="time"
        placeholder="Select end time"
        onChange={handleEndTimeChange}
      />

      <DateTimeField
        label="Registration Deadline Date"
        value={registrationDeadlineDate}
        mode="date"
        placeholder="Select registration deadline date"
        onChange={
          handleRegistrationDeadlineDateChange
        }
      />

      <DateTimeField
        label="Registration Deadline Time"
        value={registrationDeadlineTime}
        mode="time"
        placeholder="Select registration deadline time"
        onChange={
          handleRegistrationDeadlineTimeChange
        }
      />

      <PickerField
        label="Location"
        value={location}
        placeholder="Select location"
        icon="location-outline"
        onPress={() => setLocationOpen(true)}
      />

      <LocationBottomSheet
        visible={locationOpen}
        value={location}
        onClose={() => setLocationOpen(false)}
        onSelect={(val) =>
          setField("location", val)
        }
      />

     <TextInputField
      label="Registration Link"
      placeholder="Paste registration URL"
      value={registrationLink}
      icon="link-outline"
      onChange={(text: string) =>
        setField("registrationLink", text)
      }
      onBlur={() => {
        if (!registrationLink) return;

        const normalized =
          normalizeUrl(registrationLink);

        if (!isValidUrl(normalized)) {
          showValidation(
            "Please enter a valid registration link."
          );
          return;
        }

        setField("registrationLink", normalized);
      }}
    />
      <ScheduleValidationModal
        visible={showValidationModal}
        message={validationMessage}
        onClose={() => setShowValidationModal(false)}
      />
    </View>
  );
}