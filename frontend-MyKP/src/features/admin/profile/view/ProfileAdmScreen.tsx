import {
  View,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";

import { useState } from "react";

import { SafeAreaView } from "react-native-safe-area-context";

import { useRouter } from "expo-router";

import {
  Mail,
  ShieldCheck,
  LogOut,
} from "lucide-react-native";

import { COLORS } from "@/constants/colors";

import { useAuth } from "src/core/contexts/AuthContext";

import { clearSession } from "src/features/auth/services/session";
import { logout as revokeServerToken } from "src/features/auth/services/authService";

import { getAdminProfile } from "src/features/admin/profile/services/profileAdmService";

import LogoutModal from "@/components/modal/logout/LogoutModal";

import styles from "src/features/admin/profile/view/styles/ProfileAdm.styles";

export default function ProfileAdminScreen() {
  const [showLogout, setShowLogout] =
    useState(false);

  const { signOut } = useAuth();

  const router = useRouter();

  const profile =
    getAdminProfile();

  const handleLogout = async () => {
    try {
      setShowLogout(false);

      await revokeServerToken();
      await clearSession();

      signOut();

      router.replace("/login");
    } catch (error) {
      console.log(
        "Logout failed:",
        error
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* header */}
      <View style={styles.header}>
        <Text style={styles.title}>
          Admin Profile
        </Text>

        <Text style={styles.subtitle}>
          Manage organization account
        </Text>
      </View>

      {/* profile card */}
      <View style={styles.profileCard}>
        <View style={styles.logoWrapper}>
          <Image
            source={profile.logo}
            style={styles.logo}
          />
        </View>

        <Text style={styles.name}>
          {profile.organizationName}
        </Text>

        <View style={styles.roleBadge}>
          <ShieldCheck
            size={16}
            color={COLORS.primary}
          />

          <Text style={styles.roleText}>
            {profile.role}
          </Text>
        </View>
      </View>

      {/* info section */}
      <View style={styles.infoSection}>
        <Text style={styles.sectionTitle}>
          Account Information
        </Text>

        <View style={styles.infoCard}>
          <View style={styles.infoIcon}>
            <Mail
              size={18}
              color={COLORS.primary}
            />
          </View>

          <View>
            <Text style={styles.infoLabel}>
              Email
            </Text>

            <Text style={styles.infoValue}>
              {profile.email}
            </Text>
          </View>
        </View>
      </View>

      {/* logout */}
      <TouchableOpacity
        style={styles.logoutButton}
        activeOpacity={0.9}
        onPress={() =>
          setShowLogout(true)
        }
      >
        <LogOut
          size={18}
          color={COLORS.white}
        />

        <Text style={styles.logoutText}>
          Logout
        </Text>
      </TouchableOpacity>

      <LogoutModal
        visible={showLogout}
        onClose={() =>
          setShowLogout(false)
        }
        onConfirm={handleLogout}
      />
    </SafeAreaView>
  );
}