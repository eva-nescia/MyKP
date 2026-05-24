import { View, Text } from "react-native";
import { useEffect } from "react";

import BulletInputField from "../form/BulletInputField";
import ClaimMethodCard from "../form/ClaimMethodCard";

import { useAddActivityStore } from "../../store/useAddActivityStore";
import ContactInputField from "../form/ContactInputField";
import { styles as contactStyles } from "@/features/admin/form-activity/components/form/styles/ContactInputField.styles";
import { getClaimConfig } from "../../services/kpClaimConfig";

export default function StepRequirements() {
  const {
    requirements,
    contacts,
    category,
    claimRequirements,

    setField,
  } = useAddActivityStore();

  // Auto-populate claimRequirements when category changes
  useEffect(() => {
    if (category) {
      const config = getClaimConfig(category);
      const claimText = [
        `Method: ${config.method}`,
        `Description: ${config.description}`,
        ...config.checklist.map((item) => `• ${item}`),
      ].join('\n');
      
      console.log("DEBUG: Auto-populating claimRequirements for category:", category);
      console.log("DEBUG: Claim text:", claimText);
      setField("claimRequirements", claimText);
    }
  }, [category, setField]);

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