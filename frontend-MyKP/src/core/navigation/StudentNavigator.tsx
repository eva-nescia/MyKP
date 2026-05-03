import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import DashboardScreen from "../../features/student/dashboard/view/DashboardScreen";


const Tab = createBottomTabNavigator();

export default function StudentNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Dashboard" component={DashboardScreen} />
      {/* <Tab.Screen name="Activities" component={ActivityListScreen} />
      <Tab.Screen name="Bookmarks" component={BookmarkScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} /> */}
    </Tab.Navigator>
  );
}