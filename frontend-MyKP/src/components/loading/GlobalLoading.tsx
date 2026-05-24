import { View, ActivityIndicator } from "react-native";
import { useLoadingStore } from "src/store/useLoadingStore";
import { COLORS } from "@/constants/colors";
import { loadingStyles } from "./styles/Loading.styles";

export default function GlobalLoading() {
  const loading = useLoadingStore((state) => state.loading);

  if (!loading) return null;

  return (
    <View style={loadingStyles.overlay}>
      <View style={loadingStyles.card}>
        <ActivityIndicator
          size="large"
          color={COLORS.primary}
        />
      </View>
    </View>
  );
}
