import { View, Text } from "react-native";

function DashboardScreen() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={{ fontSize: 20, fontWeight: "600" }}>
        Student Dashboard
      </Text>
    </View>
  );
}

export default DashboardScreen;