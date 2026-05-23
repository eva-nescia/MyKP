import { create } from "zustand";
import { Platform } from "react-native";
import { getToken } from '../../../auth/services/session';
import { API_URL } from '../../../../constants/apiConfig';
import {
  GENERATIONS,
  STUDY_PROGRAMS,
} from "../model/constants";

export type ActivityFormMode = "create" | "edit";

export interface AddActivityState {
  // mode
  mode: ActivityFormMode;
  editingId: string | null;

  // stepper
  step: 0 | 1 | 2;

  // basic info
  image: any | null;
  name: string;
  category: string;
  kp: string;

  generations: string[];
  studyPrograms: string[];

  description: string;

  // schedule
  eventDate: Date | null;
  startTime: Date | null;
  endTime: Date | null;

  registrationDeadlineDate: Date | null;
  registrationDeadlineTime: Date | null;

  location: string;
  registrationLink: string;

  // requirements
  requirements: string[];
  contacts: string[];
  claimRequirements: string;

  // picker
  pickerVisible: boolean;
  pickerMode: "date" | "time";
  pickerField: string | null;

  // actions
  nextStep: () => void;
  prevStep: () => void;

  setField: (
    field: keyof AddActivityFields,
    value: any
  ) => void;

  toggleGeneration: (value: string) => void;
  toggleStudyProgram: (value: string) => void;

  openPicker: (
    mode: "date" | "time",
    field: string
  ) => void;

  closePicker: () => void;

  setCreateMode: () => void;
  setEditData: (activity: Partial<AddActivityFields> & { id: string }) => void;

  submit: () => Promise<void>;
  reset: () => void;
}

type AddActivityFields = Omit<
  AddActivityState,
  | "nextStep"
  | "prevStep"
  | "setField"
  | "toggleGeneration"
  | "toggleStudyProgram"
  | "openPicker"
  | "closePicker"
  | "setCreateMode"
  | "setEditData"
  | "submit"
  | "reset"
>;

const initialState: AddActivityFields = {
  mode: "create",
  editingId: null,

  step: 0,

  image: null,
  name: "",
  category: "",
  kp: "",

  generations: [],
  studyPrograms: [],

  description: "",

  eventDate: null,
  startTime: null,
  endTime: null,

  registrationDeadlineDate: null,
  registrationDeadlineTime: null,

  location: "",
  registrationLink: "",

  requirements: [],
  contacts: [],
  claimRequirements: "",

  pickerVisible: false,
  pickerMode: "date",
  pickerField: null,
};

export const useAddActivityStore = create<AddActivityState>((set, get) => ({
  ...initialState,

  nextStep: () => {
    const current = get().step;

    if (current < 2) {
      set({
        step: (current + 1) as 0 | 1 | 2,
      });
    }
  },

  prevStep: () => {
    const current = get().step;

    if (current > 0) {
      set({
        step: (current - 1) as 0 | 1 | 2,
      });
    }
  },

  setField: (field, value) => {
    set({
      [field]: value,
    } as Pick<AddActivityState, keyof AddActivityFields>);
  },

 toggleGeneration: (value) => {
  const current = get().generations;

  if (value === "All Gen") {
    set({
      generations: current.includes("All Gen")
        ? []
        : ["All Gen"],
    });

    return;
  }

  const nonAllItems = GENERATIONS.filter(
    (item: string) => item !== "All Gen"
  );

  let updated = current.filter(
    (item) => item !== "All Gen"
  );

  if (updated.includes(value)) {
    updated = updated.filter(
      (item) => item !== value
    );
  } else {
    updated = [...updated, value];
  }

  const selectedAllIndividuals =
    nonAllItems.every((item: string) =>
      updated.includes(item)
    );

  set({
    generations: selectedAllIndividuals
      ? ["All Gen"]
      : updated,
  });
},

 toggleStudyProgram: (value) => {
  const current = get().studyPrograms;

  if (value === "All Study Program") {
    set({
      studyPrograms: current.includes("All Study Program")
        ? []
        : ["All Study Program"],
    });

    return;
  }

  const nonAllItems = STUDY_PROGRAMS.filter(
    (item: string) =>
      item !== "All Study Program"
  );

  let updated = current.filter(
    (item) => item !== "All Study Program"
  );

  if (updated.includes(value)) {
    updated = updated.filter(
      (item) => item !== value
    );
  } else {
    updated = [...updated, value];
  }

  const selectedAllIndividuals =
    nonAllItems.every((item: string) =>
      updated.includes(item)
    );

  set({
    studyPrograms: selectedAllIndividuals
      ? ["All Study Program"]
      : updated,
  });
},

  openPicker: (mode, field) => {
    set({
      pickerVisible: true,
      pickerMode: mode,
      pickerField: field,
    });
  },

  closePicker: () => {
    set({
      pickerVisible: false,
      pickerField: null,
    });
  },

  setCreateMode: () => {
    set({
      ...initialState,
      mode: "create",
      editingId: null,
    });
  },

  setEditData: (activity) => {
    set({
      ...initialState,

      mode: "edit",
      editingId: activity.id,

      step: 0,

      image: activity.image ?? null,
      name: activity.name ?? "",
      category: activity.category ?? "",
      kp: activity.kp ?? "",

      generations: activity.generations ?? [],
      studyPrograms: activity.studyPrograms ?? [],

      description: activity.description ?? "",

      eventDate: activity.eventDate ?? null,
      startTime: activity.startTime ?? null,
      endTime: activity.endTime ?? null,

      registrationDeadlineDate:
        activity.registrationDeadlineDate ?? null,
      registrationDeadlineTime:
        activity.registrationDeadlineTime ?? null,

      location: activity.location ?? "",
      registrationLink: activity.registrationLink ?? "",

      requirements: activity.requirements ?? [],
      contacts: activity.contacts ?? [],
      claimRequirements: activity.claimRequirements ?? "",
    });
  },

  submit: async () => {
    const state = get();

    // Format times to HH:mm:ss
    const formatTimeToString = (date: Date | null): string | null => {
      if (!date) return null;
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      return `${hours}:${minutes}:00`;
    };

    // Format dates to YYYY-MM-DD
    const formatDateToString = (date: Date | null): string | null => {
      if (!date) return null;
      return date.toISOString().split('T')[0];
    };

    // First: Create activity WITHOUT image
    const activityData = {
      name: state.name,
      kp_category: state.category,
      kp_amount: parseInt(state.kp, 10),
      eligible_generation: state.generations.join(', '),
      eligible_study_program: state.studyPrograms.join(', '),
      date: formatDateToString(state.eventDate) || '',
      start_time: formatTimeToString(state.startTime) || '',
      end_time: formatTimeToString(state.endTime) || '',
      location: state.location,
      description: state.description || '',
      requirements: state.requirements,
      claiming_procedure: state.claimRequirements
        ? state.claimRequirements.split('\n').map((s) => s.trim()).filter(Boolean)
        : [],
      contact_person: state.contacts,
      registration_link: state.registrationLink || '',
      registration_deadline_date: formatDateToString(state.registrationDeadlineDate) || '',
      registration_deadline_time: formatTimeToString(state.registrationDeadlineTime) || '',
    };

    if (state.mode === "edit") {
      console.log("UPDATING ACTIVITY:", state.editingId);
      const token = getToken();

      try {
        // Update activity data via PUT
        const updateResponse = await fetch(`${API_URL}/activities/${state.editingId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
          body: JSON.stringify(activityData),
        });

        if (!updateResponse.ok) {
          throw new Error(`Failed to update activity: ${updateResponse.status}`);
        }

        const updateResult = await updateResponse.json();
        console.log("Activity updated:", state.editingId);

        // Second: Upload image if it's new (has uri property indicating it was selected)
        if (state.image?.uri && state.image.uri.startsWith('file://')) {
          try {
            console.log('Uploading image for activity:', state.editingId);

            const fileName = state.image.fileName || state.image.uri.split('/').pop() || `activity_${Date.now()}.jpg`;
            const mimeType = state.image.mimeType || 'image/jpeg';

            const formData = new FormData();
            
            if (Platform.OS === 'web' && state.image instanceof File) {
              formData.append('event_poster', state.image);
              console.log('Using web File object');
            } else {
              const fileObject = {
                uri: state.image.uri,
                name: fileName,
                type: mimeType,
              };
              console.log('Using React Native file object:', fileObject);
              formData.append('event_poster', fileObject as any);
            }

            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 30000);

            const imageResponse = await fetch(`${API_URL}/activities/${state.editingId}/upload-image`, {
              method: 'POST',
              headers: {
                Accept: 'application/json',
                ...(token ? { Authorization: `Bearer ${token}` } : {}),
              },
              body: formData,
              signal: controller.signal,
            });

            clearTimeout(timeoutId);
            console.log('Image upload response status:', imageResponse.status);
            
            if (imageResponse.ok) {
              const imageData = await imageResponse.json();
              console.log('Image uploaded successfully:', imageData);
            } else {
              const errorText = await imageResponse.text();
              console.warn('Image upload failed:', imageResponse.status, errorText);
            }
          } catch (imageError) {
            console.error('Image upload error (activity still updated):', {
              message: imageError instanceof Error ? imageError.message : String(imageError),
            });
          }
        }

        return updateResult;
      } catch (error) {
        console.error("ERROR UPDATING ACTIVITY:", error);
        throw error;
      }
    }

    const token = getToken();
    console.log('Creating activity...');

    try {
      // Create activity first
      const response = await fetch(`${API_URL}/activities`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(activityData),
      });

      if (!response.ok) {
        throw new Error(`Failed to create activity: ${response.status}`);
      }

      const result = await response.json();
      const activityId = result.id;
      console.log("Activity created:", activityId);

      // Second: Upload image if provided (multipart/form-data)
      if (state.image?.uri) {
        try {
          console.log('Uploading image for activity:', activityId);

          const fileName = state.image.fileName || state.image.uri.split('/').pop() || `activity_${Date.now()}.jpg`;
          const mimeType = state.image.mimeType || 'image/jpeg';

          console.log('Image picker asset:', {
            uri: state.image.uri,
            fileName: state.image.fileName,
            type: state.image.type,
            width: state.image.width,
            height: state.image.height,
            mimeType: state.image.mimeType,
          });

          const formData = new FormData();
          
          if (Platform.OS === 'web' && state.image instanceof File) {
            // Web: Append File object directly
            formData.append('event_poster', state.image);
            console.log('Using web File object');
          } else {
            // Mobile: React Native FormData accepts { uri, name, type } for file fields
            const fileObject = {
              uri: state.image.uri,
              name: fileName,
              type: mimeType,
            };
            console.log('Using React Native file object:', fileObject);
            formData.append('event_poster', fileObject as any);
          }

          console.log('Image upload details:', {
            url: `${API_URL}/activities/${activityId}/upload-image`,
            token: token ? 'present' : 'missing',
            platform: Platform.OS,
          });

          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), 30000); // 30s timeout

          const imageResponse = await fetch(`${API_URL}/activities/${activityId}/upload-image`, {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              ...(token ? { Authorization: `Bearer ${token}` } : {}),
            },
            body: formData,
            signal: controller.signal,
          });

          clearTimeout(timeoutId);
          console.log('Image upload response status:', imageResponse.status);
          
          if (imageResponse.ok) {
            const imageData = await imageResponse.json();
            console.log('Image uploaded successfully:', imageData);
          } else {
            const errorText = await imageResponse.text();
            console.warn('Image upload failed:', imageResponse.status, errorText);
          }
        } catch (imageError) {
          console.error('Image upload error (activity still created):', {
            message: imageError instanceof Error ? imageError.message : String(imageError),
            code: imageError instanceof Error && 'code' in imageError ? (imageError as any).code : undefined,
            stack: imageError instanceof Error ? imageError.stack : undefined,
          });
        }
      }

      return result;
    } catch (error) {
      console.error("ERROR CREATING ACTIVITY:", error);
      throw error;
    }
  },

  reset: () => {
    set({
      ...initialState,
    });
  },
}));