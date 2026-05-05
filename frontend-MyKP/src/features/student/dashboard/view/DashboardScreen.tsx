import { ScrollView, View, Text } from "react-native";
import { useDashboardViewModel } from "../viewmodel/useDashboardViewModel";

import KPProgressCard from "../components/KPProgressCard";
import ActivityCard from "../../../../components/activityCard/ActivityCard";
import DashboardHeader from "../components/DashboardHeader";
import { styles } from "./styles/Dashboard.styles";

export default function DashboardScreen() {
  const { data, loading, error } = useDashboardViewModel();

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
            // TODO: navigation.navigate("Notifications")
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
    </View>
  );
}