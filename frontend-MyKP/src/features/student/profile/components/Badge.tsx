import { View, Text } from "react-native";

import styles from "./styles/Badge.styles";

type Props = {
  label: string;

  variant?:
    | "default"
    | "primary"
    | "outline"
    | "success"
    | "warning";
};

export default function Badge({
  label,
  variant = "primary",
}: Props) {
  return (
    <View
      style={[
        styles.badge,

        variant === "primary" &&
          styles.primary,

        variant === "outline" &&
          styles.outline,

        variant === "success" &&
          styles.success,

        variant === "warning" &&
          styles.warning,
      ]}
    >
      <Text
        style={[
          styles.text,

          variant === "primary" &&
            styles.primaryText,

          variant === "outline" &&
            styles.outlineText,

          variant === "success" &&
            styles.successText,

          variant === "warning" &&
            styles.warningText,
        ]}
      >
        {label}
      </Text>
    </View>
  );
}