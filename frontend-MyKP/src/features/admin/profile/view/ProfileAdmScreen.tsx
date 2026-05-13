import {
  View,
  Text,
} from "react-native";

export default function ProfileAdminScreen() {
  return (
    <View
      style={{
        flex: 1,

        justifyContent: "center",
        alignItems: "center",

        backgroundColor: "white",
      }}
    >
      <Text
        style={{
          fontSize: 22,
          fontWeight: "700",
          color: "#0F172A",
        }}
      >
        Admin Profile
      </Text>

      <Text
        style={{
          marginTop: 10,
          color: "#64748B",
          fontSize: 15,
        }}
      >
        Placeholder Screen
      </Text>
    </View>
  );
}