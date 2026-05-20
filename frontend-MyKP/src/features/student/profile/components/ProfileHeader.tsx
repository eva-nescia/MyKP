import { View, Text, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import styles from "./styles/ProfileHeader.styles";
import { ProfileUser } from "../model/types";

interface Props {
  user: ProfileUser | null;
  onLogout: () => void;
}

const PLACEHOLDER = require("assets/images/profile-placeholder/profile_picture.jpeg");

export default function ProfileHeader({
  user,
}: Props) {
  const imageSource = user?.profile_picture
    ? { uri: user.profile_picture }
    : PLACEHOLDER;

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Image
          source={imageSource}
          style={styles.image}
        />

        <Text style={styles.name}>
          {user?.name ?? "—"}
        </Text>

        <View style={styles.badgeContainer}>
          <View style={styles.badgeRow}>
            <View style={styles.badge}>
              <Ionicons
                name="card-outline"
                size={13}
                color="#64748B"
              />

              <Text style={styles.badgeText}>
                {user?.nim ?? "—"}
              </Text>
            </View>

            {user?.jurusan ? (
              <View style={styles.badge}>
                <Ionicons
                  name="school-outline"
                  size={13}
                  color="#64748B"
                />

                <Text style={styles.badgeText}>
                  {user.jurusan}
                </Text>
              </View>
            ) : null}
          </View>

          <View style={styles.badge}>
            <Ionicons
              name="mail-outline"
              size={13}
              color="#64748B"
            />

            <Text
              style={styles.badgeText}
              numberOfLines={1}
            >
              {user?.email ?? ""}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}