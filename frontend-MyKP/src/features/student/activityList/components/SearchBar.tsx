import { View, TextInput, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "./styles/SearchBar.styles";

export default function SearchBar({
  value,
  onChange,
  onOpenFilter,
}: any) {
  return (
    <View style={styles.container}>
      <Ionicons name="search" size={18} color="#9CA3AF" />

      <TextInput
        placeholder="Search activities..."
        value={value}
        onChangeText={onChange}
        style={styles.input}
      />

      {/* measure this */}
      <Pressable
        style={styles.filterBtn}
        onPress={(e) => {
          e.target.measure((x, y, width, height, pageX, pageY) => {
            onOpenFilter({
              x: pageX,
              y: pageY,
              width,
              height,
            });
          });
        }}
      >
        <Ionicons name="options" size={18} color="#fff" />
      </Pressable>
    </View>
  );
}