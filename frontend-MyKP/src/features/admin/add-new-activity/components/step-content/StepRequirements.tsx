import { View } from "react-native";

import BulletInputField from "../form/BulletInputField";
import ClaimMethodCard from "../form/ClaimMethodCard";

import { useAddActivityStore } from "../../store/useAddActivityStore";

export default function StepRequirements() {
  const {
    requirements,
    contacts,
    category,

    setField,
  } = useAddActivityStore();

  return (
    <View>
      <BulletInputField
        label="Requirements"
        values={requirements}
        placeholder="Enter requirement..."
        onChange={(values) =>
          setField("requirements", values)
        }
      />

      <BulletInputField
        label="Contacts"
        values={contacts}
        placeholder="Enter contact information..."
        onChange={(values) =>
          setField("contacts", values)
        }
      />

      <ClaimMethodCard category={category} />
    </View>
  );
}