import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { View, Text } from "react-native";

import DashboardScreen from "src/features/student/dashboard/view/DashboardScreen";
import ActivityListScreen from "@/features/student/activityList/view/ActivityListScreen";
import { COLORS } from "@/constants/colors";

import TabIcon from "src/components/navbar/TabIcon";
import TabLabel from "src/components/navbar/TabLabel";
import { STUDENT_TAB_CONFIG } from "src/core/navigation/config/studentTabConfig";

const Tab = createBottomTabNavigator();

const Placeholder = ({ label }: any) => (
  <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    <Text>{label}</Text>
  </View>
);

export default function StudentNavigator() {
  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,

        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: "#D1D5DB",

        tabBarStyle: {
          backgroundColor: COLORS.secondary,
          borderTopWidth: 0,
          height: 60 + insets.bottom,
          paddingBottom: insets.bottom,
          paddingTop: 6,
        },

        tabBarLabel: ({ focused, color }) => (
          <TabLabel
            label={route.name}
            focused={focused}
            color={color}
          />
        ),

        tabBarIcon: ({ color, size, focused }) => (
          <TabIcon
            name={STUDENT_TAB_CONFIG[route.name as keyof typeof STUDENT_TAB_CONFIG]}
            color={color}
            size={size}
            focused={focused}
          />
        ),
      })}
    >
      <Tab.Screen 
        name="Dashboard" 
        component={DashboardScreen} 
      />

      <Tab.Screen
        name="Activities"
        component={ActivityListScreen}
      />
      
      <Tab.Screen name="Saved">
        {() => <Placeholder label="Saved" />}
      </Tab.Screen>
      <Tab.Screen name="Profile">
        {() => <Placeholder label="Profile" />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}