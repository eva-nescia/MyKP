import { View } from "react-native";
import { styles } from "./styles/ProgressBar.styles";

export default function ProgressBar({ progress }: { progress: number }) {
  return (
    <View style={styles.container}>
      <View style={[styles.fill, { width: `${progress}%` }]} />
    </View>
  );
}