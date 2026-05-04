import { View, Text } from "react-native";
import { styles } from "../badge/styles/Badge.styles";

interface Props {
  label: string;
  variant?: "default" | "primary" | "outline";
}

export default function Badge({
  label,
  variant = "default",
}: Props) {
  return (
    <View style={[styles.badge, styles[variant]]}>
      <Text style={[styles.text, styles[`${variant}Text`]]}>
        {label}
      </Text>
    </View>
  );
}