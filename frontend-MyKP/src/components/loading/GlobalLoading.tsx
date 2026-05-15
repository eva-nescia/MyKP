import { View, ActivityIndicator } from "react-native";
import { useLoadingStore } from "src/store/useLoadingStore";

export default function GlobalLoading() {
  const loading = useLoadingStore((state) => state.loading);

  if (!loading) return null;

  return (
    <View
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0,0,0,0.4)",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 999999,
        elevation: 999999,
      }}
    >
      <ActivityIndicator size="large" color="#fff" />
    </View>
  );
}