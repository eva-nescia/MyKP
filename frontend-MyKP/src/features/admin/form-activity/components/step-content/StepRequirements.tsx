import { View } from "react-native";

import BulletInputField from "../form/BulletInputField";
import ClaimMethodCard from "../form/ClaimMethodCard";

import { useAddActivityStore } from "../../store/useAddActivityStore";
import ContactInputField from "../form/ContactInputField";

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

      <ContactInputField
        label="Contacts"
        values={contacts}
        onChange={(values) =>
          setField("contacts", values)
        }
      />

      <ClaimMethodCard category={category} />
    </View>
  );
}