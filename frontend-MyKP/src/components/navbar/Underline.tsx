import Animated, { useAnimatedStyle, withSpring } from "react-native-reanimated";
import { COLORS } from "@/constants/colors";

export default function Underline({ focused }: { focused: boolean }) {
  const animatedStyle = useAnimatedStyle(() => ({
    width: withSpring(focused ? 30 : 0),
    opacity: withSpring(focused ? 1 : 0),
  }));

  return (
    <Animated.View
      style={[
        {
          height: 3,
          borderRadius: 2,
          backgroundColor: COLORS.white,
          marginTop: 4,
        },
        animatedStyle,
      ]}
    />
  );
}