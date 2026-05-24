import {
  ScrollView,
  View,
  Text,
} from "react-native";

import {
  router,
  useNavigation,
} from "expo-router";

import React, {
  useEffect,
  useRef,
} from "react";

import type { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";

import { useDashboardViewModel } from "../viewmodel/useDashboardViewModel";

import KPProgressCard from "../components/KPProgressCard";
import MandatoryActivityCarousel from "../components/MandatoryActivityCarousel";
import DashboardHeader from "../components/DashboardHeader";
import UpcomingActivities from "../components/UpcomingActivities";

import AppSnackbar from "@/components/snackbar/AppSnackbar";

import { styles } from "./styles/Dashboard.styles";

type StudentTabParamList = {
  dashboard: undefined;
  activities: undefined;
  saved: undefined;
  profile: undefined;
};

export default function DashboardScreen() {
  const vm = useDashboardViewModel();

  const { data, error } = vm;

  const scrollRef =
    useRef<ScrollView>(null);

  const navigation =
    useNavigation<
      BottomTabNavigationProp<
        StudentTabParamList,
        "dashboard"
      >
    >();

  useEffect(() => {
    const unsubscribe = navigation.addListener(
      "tabPress",
      () => {
        scrollRef.current?.scrollTo({
          y: 0,
          animated: false,
        });
      }
    );

    return unsubscribe;
  }, [navigation]);

  if (error) {
    return (
      <Text style={styles.center}>
        {error}
      </Text>
    );
  }

  if (!data) return null;

  return (
    <View style={styles.wrapper}>
      <ScrollView
        ref={scrollRef}
        scrollEnabled
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <DashboardHeader
          userName={data.userName}
          hasUnreadNotifications={
            vm.unreadCount > 0
          }
          onPressNotification={() => {
            router.push(
              "/notification/notification"
            );
          }}
        />

        <KPProgressCard
          progress={data.kpProgress}
          total={data.totalKP}
        />

        <Text style={styles.section}>
          Mandatory Activities (WAJIB)
        </Text>

        <MandatoryActivityCarousel
          data={data.activities}
        />

        <UpcomingActivities
          data={vm.allActivities}
        />
      </ScrollView>

      <AppSnackbar
        visible={vm.showLoginSuccess}
        message="Login successful"
        type="success"
        onHide={() =>
          vm.setShowLoginSuccess(false)
        }
      />
    </View>
  );
}
