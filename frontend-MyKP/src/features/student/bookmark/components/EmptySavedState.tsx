import { View, Text, Image } from "react-native";

import styles from "./styles/EmptySaved.styles";

export default function EmptySavedState() {
  return (
    <View style={styles.container}>
      <Image
        source={require("assets/images/illustration/no_saved_activity.png")}
        style={styles.image}
        resizeMode="contain"
      />

      <Text style={styles.title}>
        No saved activities yet
      </Text>

      <Text style={styles.subtitle}>
        Save events you're interested in{"\n"}
        to find them here later.
      </Text>
    </View>
  );
}