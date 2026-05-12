import { View, Text, Image, TouchableOpacity } from "react-native";
import { LogOut } from "lucide-react-native";

import styles from "./styles/ProfileHeader.styles";

interface Props {
  onLogout: () => void;
}

export default function ProfileHeader({ onLogout }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Image
          source={require("assets/images/profile-placeholder/profile_picture.jpeg")}
          style={styles.image}
        />

        <View style={styles.info}>
          <Text style={styles.name}>Andi Keane Sigma Sekali</Text>
          <Text style={styles.nim}>0106052912031</Text>
          <Text style={styles.major}>MAN - Management</Text>
        </View>
        
      </View>
    </View>
  );
}