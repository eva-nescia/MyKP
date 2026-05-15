import { View } from "react-native";

import TextInputField from "src/features/admin/add-new-activity/components/form/TextInputField";
import TextAreaField from "src/features/admin/add-new-activity/components/form/TextAreaField";
import DropdownField from "src/features/admin/add-new-activity/components/form/DropDownField";
import MultiInputField from "src/features/admin/add-new-activity/components/form/MultiInputField";

import {
  CATEGORIES,
  GENERATIONS,
  STUDY_PROGRAMS,
} from "../../model/constants";

import { useAddActivityStore } from "../../store/useAddActivityStore";

export default function StepBasicInfo() {
  const {
    name,
    category,
    kp,
    generations,
    studyPrograms,
    description,

    setField,
    toggleGeneration,
    toggleStudyProgram,
  } = useAddActivityStore();

  return (
    <View>
      <TextInputField
        label="Activity Name"
        placeholder="Enter activity title"
        value={name}
        onChange={(text: string) =>
          setField("name", text)
        }
      />

      <DropdownField
        label="Category"
        placeholder="Select activity category"
        value={category}
        items={CATEGORIES}
        onSelect={(value: string) =>
          setField("category", value)
        }
      />

      <TextInputField
        label="KP Amount"
        placeholder="e.g. 10"
        value={kp}
        keyboardType="numeric"
        onChange={(text: string) =>
          setField("kp", text)
        }
      />

      <MultiInputField
        label="Eligible Generations"
        items={GENERATIONS}
        selected={generations}
        onToggle={toggleGeneration}
      />

      <MultiInputField
        label="Eligible Study Programs"
        items={STUDY_PROGRAMS}
        selected={studyPrograms}
        onToggle={toggleStudyProgram}
      />

      <TextAreaField
        label="Event Description"
        placeholder="Write detailed event description..."
        value={description}
        maxLength={300}
        onChange={(text: string) =>
          setField("description", text)
        }
      />
    </View>
  );
}