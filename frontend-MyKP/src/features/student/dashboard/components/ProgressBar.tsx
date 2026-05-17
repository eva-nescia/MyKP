import { View } from "react-native";
import { styles } from "./styles/ProgressBar.styles";

type Props = {
  progress: number;
  variant?: "default" | "light";
};

export default function ProgressBar({
  progress,
  variant = "default",
}: Props) {
  return (
    <View
      style={[
        styles.container,
        variant === "light" && styles.lightContainer,
      ]}
    >
      <View
        style={[
          styles.fill,
          variant === "light" && styles.lightFill,
          {
            width: `${progress}%`,
          },
        ]}
      />
    </View>
  );
}