import { View, Text } from "react-native";

import Animated, {
  useAnimatedStyle,
  withTiming,
  interpolateColor,
} from "react-native-reanimated";

import { Ionicons } from "@expo/vector-icons";

import { COLORS } from "@/constants/colors";

import { styles } from
  "src/features/admin/add-new-activity/components/stepper/styles/StepProgress.styles";

interface Props {
  currentStep: number;
}

const STEPS = [
  "Basic Info",
  "Schedule",
  "Requirements",
];

export default function StepProgress({
  currentStep,
}: Props) {
  return (
    <View style={styles.container}>
      {STEPS.map((step, index) => {
        const active = index <= currentStep;
        const completed =
          index < currentStep;

        const circleStyle =
          useAnimatedStyle(() => {
            return {
              transform: [
                {
                  scale: withTiming(
                    active ? 1 : 0.95,
                    {
                      duration: 250,
                    }
                  ),
                },
              ],

              backgroundColor:
                interpolateColor(
                  active ? 1 : 0,
                  [0, 1],
                  [
                    "#F3F4F6",
                    COLORS.primary,
                  ]
                ),

              borderColor:
                interpolateColor(
                  active ? 1 : 0,
                  [0, 1],
                  [
                    "#E5E7EB",
                    COLORS.primary,
                  ]
                ),
            };
          });

        const lineStyle =
          useAnimatedStyle(() => {
            return {
              transform: [
                {
                  scaleX: withTiming(
                    active ? 1 : 0,
                    {
                      duration: 300,
                    }
                  ),
                },
              ],
            };
          });

        return (
          <View
            key={step}
            style={styles.stepGroup}
          >
            {/* LINE */}
            {index !== 0 && (
              <View style={styles.lineBg}>
                <Animated.View
                  style={[
                    styles.lineFill,
                    lineStyle,
                  ]}
                />
              </View>
            )}

            {/* STEP */}
            <View style={styles.stepWrapper}>
              <Animated.View
                style={[
                  styles.circle,
                  circleStyle,
                ]}
              >
                {completed ? (
                  <Ionicons
                    name="checkmark"
                    size={18}
                    color="#fff"
                  />
                ) : (
                  <Text
                    style={[
                      styles.number,
                      active &&
                        styles.numberActive,
                    ]}
                  >
                    {index + 1}
                  </Text>
                )}
              </Animated.View>

              <Text
                style={[
                  styles.label,
                  active &&
                    styles.labelActive,
                ]}
              >
                {step}
              </Text>
            </View>
          </View>
        );
      })}
    </View>
  );
}