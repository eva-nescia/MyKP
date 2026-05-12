import { View, Text, Image } from "react-native";

import styles from "./styles/ProfileHeader.styles";
import { ProfileUser } from "../model/types";

interface Props {
  user: ProfileUser | null;
  onLogout: () => void;
}

const PLACEHOLDER = require("assets/images/profile-placeholder/profile_picture.jpeg");

export default function ProfileHeader({ user }: Props) {
  const imageSource = user?.profile_picture
    ? { uri: user.profile_picture }
    : PLACEHOLDER;

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Image source={imageSource} style={styles.image} />

        <View style={styles.info}>
          <Text style={styles.name}>{user?.name ?? "—"}</Text>
          <Text style={styles.nim}>{user?.nim ?? "—"}</Text>
          <Text style={styles.major}>{user?.email ?? ""}</Text>
        </View>
      </View>
    </View>
  );
}
