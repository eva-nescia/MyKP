import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, Text } from "react-native";

const Stack = createNativeStackNavigator();

function ActivityListAdminScreen() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={{ fontSize: 20, fontWeight: "600" }}>
        Admin Activity List
      </Text>
      <Text style={{ marginTop: 10, color: "#888" }}>
        (Placeholder)
      </Text>
    </View>
  );
}

function ProfileAdminScreen() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={{ fontSize: 20, fontWeight: "600" }}>
        Admin Profile
      </Text>
    </View>
  );
}

export default function AdminNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Activities"
        component={ActivityListAdminScreen}
      />

      <Stack.Screen
        name="Profile"
        component={ProfileAdminScreen}
      />
    </Stack.Navigator>
  );
}