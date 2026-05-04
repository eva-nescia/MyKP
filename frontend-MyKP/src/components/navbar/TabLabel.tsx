import { View, Text } from "react-native";
import Underline from "./Underline";

export default function TabLabel({
  label,
  focused,
  color,
}: {
  label: string;
  focused: boolean;
  color: string;
}) {
  return (
    <View style={{ alignItems: "center", marginTop: 2 }}>
      <Text
        style={{
          color,
          fontSize: 12,
          fontWeight: "500",
        }}
      >
        {label}
      </Text>

      <Underline focused={focused} />
    </View>
  );
}