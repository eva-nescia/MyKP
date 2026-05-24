import { View, Text } from "react-native";

import BulletInputField from "../form/BulletInputField";
import ClaimMethodCard from "../form/ClaimMethodCard";

import { useAddActivityStore } from "../../store/useAddActivityStore";
import ContactInputField from "../form/ContactInputField";
import { styles as contactStyles } from "@/features/admin/form-activity/components/form/styles/ContactInputField.styles";

export default function StepRequirements() {
  const {
    requirements,
    contacts,
    category,

    setField,
  } = useAddActivityStore();

  return (
    <View>
      {/* <Text style={contactStyles.helperText}>
        List the requirements needed to join this activity.
      </Text> */}

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