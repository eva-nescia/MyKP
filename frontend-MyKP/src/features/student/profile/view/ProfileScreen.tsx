import {
  Text,
  FlatList,
} from "react-native";
import { useEffect, useRef } from "react";
import { useNavigation } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import type { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";


import ProfileHeader from "../components/ProfileHeader";
import KPProgressCard from "../components/KPProgressCard";
import LogoutModal from "../../../../components/modal/logout/LogoutModal";

import useProfileViewModel from "../viewmodel/useProfileViewModel";

import styles from "@/features/student/profile/view/styles/Profile.styles";
import ProfileScreenHeader from "../components/ProfileScreenHeader";
import { useGlobalLoading } from "@/hooks/useGlobalLoading";

type StudentTabParamList = {
  dashboard: undefined;
  activities: undefined;
  saved: undefined;
  profile: undefined;
};

export default function ProfileScreen() {
  const vm = useProfileViewModel();
  const listRef = useRef<FlatList>(null);
  const navigation =
    useNavigation<
      BottomTabNavigationProp<
        StudentTabParamList,
        "profile"
      >
    >();

  useGlobalLoading(vm.loading);

  useEffect(() => {
    const unsubscribe = navigation.addListener(
      "tabPress",
      () => {
        listRef.current?.scrollToOffset({
          offset: 0,
          animated: false,
        });
      }
    );

    return unsubscribe;
  }, [navigation]);

  return (
   <SafeAreaView
    style={styles.container}
    edges={["top", "left", "right"]}
   >
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
