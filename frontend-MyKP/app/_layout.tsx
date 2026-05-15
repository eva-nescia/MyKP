import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { AuthProvider } from "../src/core/contexts/AuthContext";
import GlobalLoading from "@/components/loading/GlobalLoading";

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AuthProvider>
        <Stack screenOptions={{ headerShown: false }} />
        <GlobalLoading />
      </AuthProvider>
    </GestureHandlerRootView>
  );
}