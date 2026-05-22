import { SafeAreaView } from "react-native-safe-area-context";

import LogoutModal from "@/components/modal/logout/LogoutModal";

import useProfileAdmViewModel from "../viewmodel/useProfileAdmViewModel";

import ProfileAdmHeader from "../components/ProfileAdmHeader";
import ProfileAdmCard from "../components/ProfileAdmCard";
import ProfileAdmInfoSection from "../components/ProfileAdmInfoSection";
import ProfileAdmLogoutButton from "../components/ProfileAdmLogoutBtn";

import styles from "src/features/admin/profile/view/styles/ProfileAdm.styles";

export default function ProfileAdminScreen() {
  const vm = useProfileAdmViewModel();

  return (
    <SafeAreaView style={styles.container}>
      <ProfileAdmHeader />

      <ProfileAdmCard
        profile={vm.profile}
      />

      <ProfileAdmInfoSection
        email={vm.profile.email}
      />

      <ProfileAdmLogoutButton
        onPress={() =>
          vm.setShowLogout(true)
        }
      />

      <LogoutModal
        visible={vm.showLogout}
        onClose={() =>
          vm.setShowLogout(false)
        }
        onConfirm={vm.handleLogout}
      />
    </SafeAreaView>
  );
}