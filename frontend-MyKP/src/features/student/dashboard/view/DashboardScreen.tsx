import { ScrollView, View, Text } from "react-native";
import { useDashboardViewModel } from "../viewmodel/useDashboardViewModel";
import { router } from "expo-router";

import KPProgressCard from "../components/KPProgressCard";
import ActivityCard from "../../../../components/activityCard/ActivityCard";
import DashboardHeader from "../components/DashboardHeader";
import { styles } from "./styles/Dashboard.styles";
import AppSnackbar from "@/components/snackbar/AppSnackbar";

export default function DashboardScreen() {
  const { data, loading, error } = useDashboardViewModel();
  const vm = useDashboardViewModel();

  if (loading) return <Text style={styles.center}>Loading...</Text>;
  if (error) return <Text style={styles.center}>{error}</Text>;
  if (!data) return null;

  return (
    <View style={styles.wrapper}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* header */}
        <DashboardHeader
          userName={data.userName}
          onPressNotification={() => {
            console.log("Go to notifications");
            router.push(
              "/notification/notification"
            )
          }}
        />

        {/* KP Progress */}
        <KPProgressCard
          progress={data.kpProgress}
          total={data.totalKP}
        />

        {/* section */}
        <Text style={styles.section}>
          Mandatory Activities (WAJIB)
        </Text>

        {/* horizontal List */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontalList}
        >
          {data.activities.map((item) => (
            <ActivityCard key={item.id} {...item} />
          ))}
        </ScrollView>
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