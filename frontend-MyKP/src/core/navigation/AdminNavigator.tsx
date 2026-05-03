import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, Text } from "react-native";

const Stack = createNativeStackNavigator();

// temporary placeholders
function ActivityListAdminScreen() {
  return <View><Text>Activity List</Text></View>;
}

function ProfileAdminScreen() {
  return <View><Text>Profile</Text></View>;
}

export default function AdminNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Activities" component={ActivityListAdminScreen} />
      <Stack.Screen name="Profile" component={ProfileAdminScreen} />
    </Stack.Navigator>
  );
}