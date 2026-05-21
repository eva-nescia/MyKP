import { Tabs } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { COLORS } from "@/constants/colors";
import TabIcon from "@/components/navbar/TabIcon";
import TabLabel from "@/components/navbar/TabLabel";
import {
  STUDENT_TAB_CONFIG,
  StudentTabKey,
} from "@/core/navigation/config/studentTabConfig";

export default function StudentLayout() {
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={({ route }) => {
       const rawName = route.name;

     const isDetailsScreen =
      rawName === "activities/details";

    const routeName = rawName.startsWith("activities")
      ? "activities"
      : (rawName as StudentTabKey);

      const config = STUDENT_TAB_CONFIG[routeName];

        return {
          headerShown: false,

          tabBarActiveTintColor: COLORS.primary,
          tabBarInactiveTintColor: "#D1D5DB",

          tabBarStyle: isDetailsScreen
            ? { display: "none" }
            : {
                backgroundColor: COLORS.secondary,
                borderTopWidth: 0,
                height: 85 + insets.bottom,
                paddingBottom: insets.bottom,
                paddingTop: 6,
              },

          tabBarLabel: ({ focused, color }) =>
            config ? (
              <TabLabel
                label={config.label}
                focused={focused}
                color={color}
              />
            ) : null,

          tabBarIcon: ({ color, size, focused }) =>
            config ? (
              <TabIcon
                name={focused ? config.active : config.inactive}
                color={color}
                size={size}
                focused={focused}
              />
            ) : null,
        };
      }}
    >
      <Tabs.Screen name="dashboard" options={{ href: "/(student)/dashboard" }} />
      <Tabs.Screen name="activities" options={{ href: "/(student)/activities" }} />
      <Tabs.Screen name="saved" options={{ href: "/(student)/saved" }} />
      <Tabs.Screen name="profile" options={{ href: "/(student)/profile" }} />

    </Tabs>
  );
}