import { create } from "zustand";
import { getToken } from '../../../auth/services/session';
import { API_URL } from '../../../../constants/apiConfig';
import * as FileSystem from 'expo-file-system';

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
        generations: ["All Gen"],
      });

      return;
    }

    let updated = current.filter((item) => item !== "All Gen");

    if (updated.includes(value)) {
      updated = updated.filter((item) => item !== value);
    } else {
      updated = [...updated, value];
    }

    set({
      generations: updated,
    });
  },

  toggleStudyProgram: (value) => {
    const current = get().studyPrograms;

    if (value === "All Study Program") {
      set({
        studyPrograms: ["All Study Program"],
      });

      return;
    }

    let updated = current.filter(
      (item) => item !== "All Study Program"
    );

    if (updated.includes(value)) {
      updated = updated.filter((item) => item !== value);
    } else {
      updated = [...updated, value];
    }

    set({
      studyPrograms: updated,
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
      requirements: state.requirements.length > 0 ? state.requirements.join('\n') : '',
      claiming_procedure: state.claimRequirements || '',
      contact_person: state.contacts.length > 0 ? state.contacts.join('\n') : '',
      registration_link: state.registrationLink || '',
      registration_deadline_date: formatDateToString(state.registrationDeadlineDate) || '',
      registration_deadline_time: formatTimeToString(state.registrationDeadlineTime) || '',
    };

    if (state.mode === "edit") {
      console.log("UPDATE ACTIVITY:", state.editingId);
      await new Promise((resolve) => setTimeout(resolve, 1200));
      return;
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

      // Second: Upload image if provided
      if (state.image?.uri) {
        try {
          console.log('Uploading image for activity:', activityId);
          
          // Read image as base64
          const base64Data = await FileSystem.readAsStringAsync(state.image.uri, {
            encoding: FileSystem.EncodingType.Base64,
          });
          
          const fileName = state.image.fileName || state.image.uri.split('/').pop() || `activity_${Date.now()}.jpg`;
          const mimeType = state.image.type || 'image/jpeg';
          
          // Send as base64 in JSON
          const imageResponse = await fetch(`${API_URL}/activities/${activityId}/upload-image`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              ...(token ? { Authorization: `Bearer ${token}` } : {}),
            },
            body: JSON.stringify({
              image_data: base64Data,
              mime_type: mimeType,
              file_name: fileName,
            }),
          });

          if (imageResponse.ok) {
            console.log('Image uploaded successfully');
          } else {
            console.warn('Image upload failed, but activity was created');
          }
        } catch (imageError) {
          console.warn('Image upload error (activity still created):', imageError);
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