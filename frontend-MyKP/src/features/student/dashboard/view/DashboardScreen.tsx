import {
  ScrollView,
  View,
  Text,
} from "react-native";

import { router } from "expo-router";

import { useDashboardViewModel } from "../viewmodel/useDashboardViewModel";

import KPProgressCard from "../components/KPProgressCard";
import MandatoryActivityCarousel from "../components/MandatoryActivityCarousel";
import DashboardHeader from "../components/DashboardHeader";

import AppSnackbar from "@/components/snackbar/AppSnackbar";

import { styles } from "./styles/Dashboard.styles";

export default function DashboardScreen() {
  const vm = useDashboardViewModel();

  const { data, error } = vm;

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
        scrollEnabled={false}
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <DashboardHeader
          userName={data.userName}
          hasUnreadNotifications={vm.unreadCount > 0}
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
          // data={[]}
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