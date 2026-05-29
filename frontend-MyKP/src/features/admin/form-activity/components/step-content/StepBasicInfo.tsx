import { View } from "react-native";

import TextInputField from "@/features/admin/form-activity/components/form/TextInputField";
import TextAreaField from "@/features/admin/form-activity/components/form/TextAreaField";
import DropdownField from "@/features/admin/form-activity/components/form/DropDownField";
import MultiInputField from "@/features/admin/form-activity/components/form/MultiInputField";
import ImageUploadField from "../form/ImageUploadField";

import {
  CATEGORIES,
  STUDY_PROGRAMS,
} from "../../model/constants";
import { getGenerationOptions } from "@/constants/generations";

import { useAddActivityStore } from "../../store/useAddActivityStore";
import { useState } from "react";
import InvalidImageModal from "../feedback/InvalidImageModal";

export default function StepBasicInfo() {
  const [showInvalidImageModal, setShowInvalidImageModal] =
    useState(false);
    
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
        onChange={(value) =>
          setField("image", value)
        }
        onInvalidFile={() =>
          setShowInvalidImageModal(true)
        }
      />

      <TextInputField
        label="Activity Name"
        placeholder="Enter activity title"
        value={name}
        maxLength={100}
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
        placeholder="e.g. 10, 6-10"
        value={kp}
        keyboardType="numeric"
        onChange={(text: string) =>
          setField("kp", text)
        }
      />

      <MultiInputField
        label="Eligible Generations"
        items={getGenerationOptions()}
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
        label="Activity Description"
        placeholder="Write detailed event description..."
        value={description}
        maxLength={1000}
        onChange={(text: string) =>
          setField("description", text)
        }
      />
       <InvalidImageModal
          visible={showInvalidImageModal}
          onClose={() =>
            setShowInvalidImageModal(false)
          }
        />
    </View>
  );
}
