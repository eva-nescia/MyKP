import { Tabs } from "expo-router";

import { useSafeAreaInsets } from "react-native-safe-area-context";

import { COLORS } from "@/constants/colors";

import TabIcon from "@/components/navbar/TabIcon";
import TabLabel from "@/components/navbar/TabLabel";

import {
  ADMIN_TAB_CONFIG,
  AdminTabKey,
} from "@/core/navigation/config/adminTabConfig";

export default function AdminLayout() {
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={({ route }) => {
        const routeName =
          route.name as AdminTabKey;

        const config =
          ADMIN_TAB_CONFIG[routeName];

        return {
          headerShown: false,

          tabBarActiveTintColor:
            COLORS.primary,

          tabBarInactiveTintColor:
            "#D1D5DB",

          tabBarStyle: {
            backgroundColor:
              COLORS.secondary,

            borderTopWidth: 0,

            height: 60 + insets.bottom,

            paddingBottom:
              insets.bottom,

            paddingTop: 6,
          },

          tabBarLabel: ({
            focused,
            color,
          }) =>
            config ? (
              <TabLabel
                label={config.label}
                focused={focused}
                color={color}
              />
            ) : null,

          tabBarIcon: ({
            color,
            size,
            focused,
          }) =>
            config ? (
              <TabIcon
                name={
                  focused
                    ? config.active
                    : config.inactive
                }
                color={color}
                size={size}
                focused={focused}
              />
            ) : null,
        };
      }}
    >
      <Tabs.Screen
        name="activities"
        options={{
          href: "/(admin)/activities",
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          href: "/(admin)/profile",
        }}
      />
    </Tabs>
  );
}