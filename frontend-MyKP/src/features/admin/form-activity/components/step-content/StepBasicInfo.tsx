import { View } from "react-native";

import TextInputField from "@/features/admin/form-activity/components/form/TextInputField";
import TextAreaField from "@/features/admin/form-activity/components/form/TextAreaField";
import DropdownField from "@/features/admin/form-activity/components/form/DropDownField";
import MultiInputField from "@/features/admin/form-activity/components/form/MultiInputField";
import ImageUploadField from "../form/ImageUploadField";

import {
  CATEGORIES,
  GENERATIONS,
  STUDY_PROGRAMS,
} from "../../model/constants";

import { useAddActivityStore } from "../../store/useAddActivityStore";

export default function StepBasicInfo() {
  const {
    image,
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
      <ImageUploadField
        label="Activity Poster"
        image={image}
        onChange={(value) => setField("image", value)}
      />

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