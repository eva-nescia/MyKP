import { createNativeStackNavigator } from "@react-navigation/native-stack";

import ActivityListAdminScreen from "../../features/admin/activityList/view/ActivityListAdmScreen";


const Stack = createNativeStackNavigator();

export default function AdminNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Activities" component={ActivityListAdminScreen} />
      {/* <Stack.Screen name="Profile" component={ProfileAdminScreen} /> */}
    </Stack.Navigator>
  );
}