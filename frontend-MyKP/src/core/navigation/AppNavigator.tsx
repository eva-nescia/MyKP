import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SplashScreen from "../../features/auth/view/SplashScreen";
import LoginScreen from "../../features/auth/view/LoginScreen";

import StudentNavigator from "../navigation/StudentNavigator";
import AdminNavigator from "../navigation/AdminNavigator";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* auth flow */}
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />

      {/* role-based  */}
      <Stack.Screen name="StudentStack" component={StudentNavigator} />
      <Stack.Screen name="AdminStack" component={AdminNavigator} />
    </Stack.Navigator>
  );
}