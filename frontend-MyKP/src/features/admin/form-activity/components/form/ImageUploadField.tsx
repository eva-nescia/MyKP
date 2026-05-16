// components/form/ImageUploadField.tsx
import { View, Text, Pressable, Image } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";

import { COLORS } from "@/constants/colors";
import { styles } from "@/features/admin/form-activity/components/styles/FormField.styles";

interface Props {
  label: string;
  image: any | null;
  onChange: (image: any) => void;
}

export default function ImageUploadField({
  label,
  image,
  onChange,
}: Props) {
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [3, 4],
      quality: 0.8,
    });

    if (!result.canceled) {
      onChange(result.assets[0]);
    }
  };

  return (
    <View style={styles.fieldContainer}>
      <Text style={styles.label}>{label}</Text>

      <Pressable style={styles.imageUploadBox} onPress={pickImage}>
        {image?.uri ? (
          <Image source={{ uri: image.uri }} style={styles.posterPreview} />
        ) : (
          <View style={styles.imagePlaceholder}>
            <Ionicons
              name="cloud-upload-outline"
              size={32}
              color={COLORS.primary}
            />
            <Text style={styles.uploadText}>Upload poster</Text>
            <Text style={styles.uploadHint}>JPG/PNG • 3:4 ratio</Text>
          </View>
        )}
      </Pressable>
    </View>
  );
}