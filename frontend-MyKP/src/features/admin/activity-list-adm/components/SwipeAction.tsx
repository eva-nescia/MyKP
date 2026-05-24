import {
  View,
  TouchableOpacity,
} from "react-native";

import {
  Pencil,
  Trash2,
} from "lucide-react-native";

import styles from "./styles/SwipeAction.styles";

type Props = {
  onEdit: () => void;
  onDelete: () => void;
};

export default function SwipeAction({
  onEdit,
  onDelete,
}: Props) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[
          styles.actionButton,
          styles.editButton,
        ]}
        onPress={onEdit}
        activeOpacity={0.85}
      >
        <Pencil
          size={20}
          color="white"
          style={{ marginLeft: 6 }}
        />
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.actionButton,
          styles.deleteButton,
        ]}
        onPress={onDelete}
        activeOpacity={0.85}
      >
        <Trash2
          size={20}
          color="white"
          style={{ marginLeft: 6 }}
        />
      </TouchableOpacity>
    </View>
  );
}