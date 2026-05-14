import { TouchableOpacity } from "react-native";

import { Plus } from "lucide-react-native";

import { COLORS } from "@/constants/colors";

import styles from "src/features/admin/activityList/components/styles/AddBtn.styles";

type Props = {
  onPress: () => void;
};

export default function AddActivityButton({
  onPress,
}: Props) {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={onPress}
      activeOpacity={0.85}
    >
      <Plus
        size={28}
        color={COLORS.white}
      />
    </TouchableOpacity>
  );
}