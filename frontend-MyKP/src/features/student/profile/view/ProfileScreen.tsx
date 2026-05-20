import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import { Ionicons } from "@expo/vector-icons";

import ProfileHeader from "../components/ProfileHeader";
import KPProgressCard from "../components/KPProgressCard";
import LogoutModal from "../../../../components/modal/logout/LogoutModal";

import useProfileViewModel from "../viewmodel/useProfileViewModel";

import { COLORS } from "@/constants/colors";
import styles from "@/features/student/profile/view/styles/Profile.styles";
import ProfileScreenHeader from "../components/ProfileScreenHeader";

export default function ProfileScreen() {
  const vm = useProfileViewModel();

  return (
    <SafeAreaView style={styles.container}>
     <ProfileScreenHeader 
        onLogout={() =>
        vm.setLogoutVisible(true)
      }/>

      <ProfileHeader user={vm.user} onLogout={() => vm.setLogoutVisible(true)} />

      <Text style={styles.sectionTitle}>
        KP Category Progress
      </Text>

      {vm.loading ? (
        <ActivityIndicator size="large" color={COLORS.secondary} />
      ) : vm.error ? (
        <Text style={{ color: COLORS.secondary, padding: 16 }}>{vm.error}</Text>
      ) : (
        <FlatList
          data={vm.categories}
          keyExtractor={(item) =>
            item.id.toString()
          }
          showsVerticalScrollIndicator={false}
          contentContainerStyle={
            styles.listContent
          }
          renderItem={({ item }) => (
            <KPProgressCard
              item={item}
              onPress={() =>
                vm.openCategory(
                  item.id,
                  item.title,
                  item.current,
                  item.target
                )
              }
            />
          )}
        />
      )}

      <LogoutModal
        visible={vm.logoutVisible}
        onClose={() =>
          vm.setLogoutVisible(false)
        }
        onConfirm={vm.logout}
      />
    </SafeAreaView>
  );
}