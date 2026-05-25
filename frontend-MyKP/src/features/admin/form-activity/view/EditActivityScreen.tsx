import { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { View, Text } from "react-native";

import AddActivityScreen from "./AddActivityScreen";
import { useAddActivityStore } from "../store/useAddActivityStore";
import { API_URL } from "../../../../constants/apiConfig";
import { getToken } from "../../../auth/services/session";
import { useGlobalLoading } from "@/hooks/useGlobalLoading";
import { normalizeEligibleGenerationYears } from "@/constants/generations";

const MONTH_NAMES = [
  "january",
  "february",
  "march",
  "april",
  "may",
  "june",
  "july",
  "august",
  "september",
  "october",
  "november",
  "december",
];

const toSelectionList = (value: unknown): string[] => {
  if (Array.isArray(value)) {
    return value.filter((item): item is string => typeof item === "string");
  }

  if (typeof value !== "string") return [];

  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
};

const toTextLines = (value: unknown): string[] => {
  if (Array.isArray(value)) {
    return value.filter((item): item is string => typeof item === "string");
  }

  if (typeof value !== "string") return [];

  return value
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);
};

const normalizeCategory = (value: unknown): string => {
  if (typeof value !== "string") return "";

  return value === "Organisasi Kemahasiswaan"
    ? "Organisasi"
    : value;
};

const normalizeStudyPrograms = (value: unknown): string[] =>
  toSelectionList(value).map((program) =>
    program === "All Prodi" ? "All Study Program" : program
  );

const createLocalDate = (
  year: number,
  month: number,
  day: number
): Date | null => {
  const date = new Date(year, month, day);

  return date.getFullYear() === year &&
    date.getMonth() === month &&
    date.getDate() === day
    ? date
    : null;
};

const parseCalendarDate = (value: unknown): Date | null => {
  if (typeof value !== "string" || !value.trim()) return null;

  const dateString = value.trim();
  const isoMatch = /^(\d{4})-(\d{2})-(\d{2})/.exec(dateString);

  if (isoMatch) {
    return createLocalDate(
      Number(isoMatch[1]),
      Number(isoMatch[2]) - 1,
      Number(isoMatch[3])
    );
  }

  const fullDateMatch = /^(?:[A-Za-z]+,\s*)?(\d{1,2})\s+([A-Za-z]+)\s+(\d{4})$/.exec(
    dateString
  );

  if (fullDateMatch) {
    const monthValue = fullDateMatch[2].toLowerCase();
    const month = MONTH_NAMES.findIndex((name) =>
      name.startsWith(monthValue)
    );

    if (month !== -1) {
      return createLocalDate(
        Number(fullDateMatch[3]),
        month,
        Number(fullDateMatch[1])
      );
    }
  }

  return null;
};

const parseTime = (value: unknown): Date | null => {
  if (typeof value !== "string") return null;

  const timeMatch = /^(\d{2}):(\d{2})(?::(\d{2}))?$/.exec(value);
  if (!timeMatch) return null;

  const date = new Date(2000, 0, 1);
  date.setHours(
    Number(timeMatch[1]),
    Number(timeMatch[2]),
    Number(timeMatch[3] ?? 0),
    0
  );

  return date;
};

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

        const responseData = await response.json();
        const data = responseData.data ?? responseData;

        console.log("=== EDIT SCREEN DEBUG ===");
        console.log("Raw API Response:", JSON.stringify(data, null, 2));
        console.log("API Response Keys:", Object.keys(data));

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
          name: data.title ?? data.name ?? "",
          category: normalizeCategory(data.type ?? data.kp_category),
          kp: String(data.points ?? data.kp_amount ?? ""),

          generations: normalizeEligibleGenerationYears(
            data.eligibleCohort ?? data.eligible_generation
          ),
          studyPrograms: normalizeStudyPrograms(
            data.eligibleStudyProgram ?? data.eligible_study_program
          ),

          description: data.description || "",

          eventDate: parseCalendarDate(data.date),
          startTime: parseTime(data.startTime ?? data.start_time),
          endTime: parseTime(data.endTime ?? data.end_time),

          registrationDeadlineDate: parseCalendarDate(
            data.registrationDeadlineDate ?? data.registration_deadline_date
          ),
          registrationDeadlineTime: parseTime(
            data.registrationDeadlineTime ?? data.registration_deadline_time
          ),

          location: data.location || "",
          registrationLink:
            data.registrationLink ?? data.registration_link ?? "",

          requirements: toTextLines(
            data.requirement ?? data.requirements
          ),
          contacts: toTextLines(
            data.contactPerson ?? data.contact_person
          ),
          claimRequirements: toTextLines(
            data.howToClaim ?? data.claiming_procedure
          ).join("\n"),
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
