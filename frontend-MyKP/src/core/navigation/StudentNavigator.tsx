import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, Text } from "react-native";

const Tab = createBottomTabNavigator();

// temporary placeholders (replace later with real screens)
function DashboardScreen() {
  return <View><Text>Home</Text></View>;
}

function ActivityListScreen() {
  return <View><Text>Activities</Text></View>;
}

function BookmarkScreen() {
  return <View><Text>Bookmarks</Text></View>;
}

function ProfileScreen() {
  return <View><Text>Profile</Text></View>;
}

export default function StudentNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Dashboard" component={DashboardScreen} />
      <Tab.Screen name="Activities" component={ActivityListScreen} />
      <Tab.Screen name="Bookmarks" component={BookmarkScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}