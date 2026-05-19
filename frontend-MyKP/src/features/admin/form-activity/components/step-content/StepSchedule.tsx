import { View } from "react-native";

import DateTimeField from "../form/DateTimeField";
import TextInputField from "../form/TextInputField";
import PickerField from "../form/PickerField";
import LocationBottomSheet from "../form/LocationBottomSheet";

import { useAddActivityStore } from "../../store/useAddActivityStore";
import { useState } from "react";

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

  const [locationOpen, setLocationOpen] = useState(false);

  return (
    <View>
      {/* EVENT DATE */}
      <DateTimeField
        label="Event Activity"
        value={eventDate}
        mode="date"
        placeholder="Select activity date"
        onChange={(value: Date) =>
          setField("eventDate", value)
        }
      />

      {/* EVENT TIME - START */}
      <DateTimeField
        label="Activity Start Time"
        value={startTime}
        mode="time"
        placeholder="Select start time"
        onChange={(value: Date) =>
          setField("startTime", value)
        }
      />

      {/* EVENT TIME - END */}
      <DateTimeField
        label="Activity End Time"
        value={endTime}
        mode="time"
        placeholder="Select end time"
        onChange={(value: Date) =>
          setField("endTime", value)
        }
      />

      {/* REGISTRATION DEADLINE DATE */}
      <DateTimeField
        label="Registration Deadline Date"
        value={registrationDeadlineDate}
        mode="date"
        placeholder="Select registration deadline date"
        onChange={(value: Date) =>
          setField("registrationDeadlineDate", value)
        }
      />

      {/* REGISTRATION DEADLINE TIME */}
      <DateTimeField
        label="Registration Deadline Time"
        value={registrationDeadlineTime}
        mode="time"
        placeholder="Select registration deadline time"
        onChange={(value: Date) =>
          setField("registrationDeadlineTime", value)
        }
      />

      {/* LOCATION */}
      <PickerField
        label="Location"
        value={location}
        placeholder="Select location"
        onPress={() => setLocationOpen(true)}
      />

      <LocationBottomSheet
        visible={locationOpen}
        value={location}
        onClose={() => setLocationOpen(false)}
        onSelect={(val) => setField("location", val)}
      />

      {/* REGISTRATION LINK */}
      <TextInputField
        label="Registration Link"
        placeholder="Paste registration URL"
        value={registrationLink}
        onChange={(text: string) =>
          setField("registrationLink", text)
        }
      />
    </View>
  );
}