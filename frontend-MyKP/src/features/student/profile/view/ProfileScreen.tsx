import {
  Text,
  FlatList,
} from "react-native";
import { useRef, useCallback } from "react";
import { useFocusEffect } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";


import ProfileHeader from "../components/ProfileHeader";
import KPProgressCard from "../components/KPProgressCard";
import LogoutModal from "../../../../components/modal/logout/LogoutModal";

import useProfileViewModel from "../viewmodel/useProfileViewModel";

import styles from "@/features/student/profile/view/styles/Profile.styles";
import ProfileScreenHeader from "../components/ProfileScreenHeader";

export default function ProfileScreen() {
  const vm = useProfileViewModel();
  const listRef = useRef<FlatList>(null);

useFocusEffect(
  useCallback(() => {
    listRef.current?.scrollToOffset({
      offset: 0,
      animated: false,
    });
  }, [])
);

  return (
   <SafeAreaView style={styles.container}>
    <ProfileScreenHeader
      onLogout={() => vm.setLogoutVisible(true)}
    />

    <FlatList
      ref={listRef}
      data={vm.categories}
      keyExtractor={(item) => item.id.toString()}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.listContent}
      ListHeaderComponent={
        <>
          <ProfileHeader user={vm.user} onLogout={() => vm.setLogoutVisible(true)} />

          <Text style={styles.sectionTitle}>
            KP Category Progress
          </Text>
        </>
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