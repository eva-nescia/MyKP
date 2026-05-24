import { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { View, Text } from "react-native";

import AddActivityScreen from "./AddActivityScreen";
import { useAddActivityStore } from "../store/useAddActivityStore";
import { API_URL } from "../../../../constants/apiConfig";
import { getToken } from "../../../auth/services/session";
import { useGlobalLoading } from "@/hooks/useGlobalLoading";

export default function EditActivityScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const setEditData = useAddActivityStore(
    (state) => state.setEditData
  );

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useGlobalLoading(loading);

  useEffect(() => {
    if (!id) return;

    const fetchActivity = async () => {
      try {
        setLoading(true);
        const token = getToken();

        console.log("DEBUG: Fetching activity with ID:", id);
        console.log("DEBUG: Using API_URL:", API_URL);
        console.log("DEBUG: Token present:", !!token);

        const response = await fetch(
          `${API_URL}/activities/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("DEBUG: Fetch response status:", response.status);
        console.log("DEBUG: Fetch response ok:", response.ok);

        if (!response.ok) {
          const errorText = await response.text();
          console.error("DEBUG: Error response body:", errorText);
          throw new Error("Failed to fetch activity");
        }

        const data = await response.json();

        console.log("=== EDIT SCREEN DEBUG ===");
        console.log("Raw API Response:", JSON.stringify(data, null, 2));
        console.log("API Response Keys:", Object.keys(data));

        // Helper to parse date formats
        const parseDate = (dateStr: string | null): Date | null => {
          if (!dateStr) return null;
          const date = new Date(dateStr);
          if (isNaN(date.getTime())) {
            console.warn("Failed to parse date:", dateStr);
            return null;
          }
          console.log("Parsed date:", dateStr, "→", date.toISOString());
          return date;
        };

        // Transform backend data to form format
        console.log("\n--- Field Extraction Debug ---");
        console.log("title:", data.title);
        console.log("type:", data.type);
        console.log("points:", data.points);
        console.log("eligibleCohort:", data.eligibleCohort);
        console.log("eligibleStudyProgram:", data.eligibleStudyProgram);
        console.log("description:", data.description);
        console.log("date:", data.date);
        console.log("startTime:", data.startTime);
        console.log("endTime:", data.endTime);
        console.log("registrationDeadlineDate:", data.registrationDeadlineDate);
        console.log("registrationDeadlineTime:", data.registrationDeadlineTime);
        console.log("location:", data.location);
        console.log("registrationLink:", data.registrationLink);
        console.log("requirement:", data.requirement);
        console.log("howToClaim:", data.howToClaim);
        console.log("contactPerson:", data.contactPerson);
        console.log("image:", data.image);

        const transformedData = {
          id,
          image: data.image
            ? { uri: data.image }
            : null,
          name: data.title || "",
          category: data.type || "",
          kp: String(data.points || ""),

          generations: data.eligibleCohort
            ? data.eligibleCohort.split(", ").filter(Boolean)
            : [],
          studyPrograms: data.eligibleStudyProgram
            ? data.eligibleStudyProgram.split(", ").filter(Boolean)
            : [],

          description: data.description || "",

          eventDate: parseDate(data.date),
          startTime: data.startTime
            ? parseDate(`2000-01-01T${data.startTime}`)
            : null,
          endTime: data.endTime
            ? parseDate(`2000-01-01T${data.endTime}`)
            : null,

          registrationDeadlineDate: parseDate(
            data.registrationDeadlineDate
          ),
          registrationDeadlineTime: data.registrationDeadlineTime
            ? parseDate(`2000-01-01T${data.registrationDeadlineTime}`)
            : null,

          location: data.location || "",
          registrationLink: data.registrationLink || "",

          requirements: data.requirement || [],
          contacts: data.contactPerson || [],
          claimRequirements: data.howToClaim
            ? data.howToClaim.join("\n")
            : "",
        };

        console.log("\n--- Transformed Data ---");
        console.log("Transformed Data:", JSON.stringify(transformedData, null, 2));
        console.log("=== END DEBUG ===\n");

        setEditData(transformedData);
      } catch (err) {
        console.error("DEBUG: Fetch error caught:");
        console.error("Error:", err);
        console.error("Error message:", err instanceof Error ? err.message : String(err));
        console.error("Error stack:", err instanceof Error ? err.stack : "No stack");
        setError(
          err instanceof Error
            ? err.message
            : "Unknown error"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchActivity();
  }, [id, setEditData]);

  if (loading) {
    return null;
  }

  if (error) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          paddingHorizontal: 20,
        }}
      >
        <Text style={{ fontSize: 16, color: "red" }}>
          Error: {error}
        </Text>
      </View>
    );
  }

  return <AddActivityScreen />;
}
