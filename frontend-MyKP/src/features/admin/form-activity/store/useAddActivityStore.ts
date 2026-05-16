import { create } from "zustand";

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
  eventTime: Date | null;

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
  eventTime: null,

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
      eventTime: activity.eventTime ?? null,

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

    if (state.mode === "edit") {
      console.log("UPDATE ACTIVITY:", state.editingId, state);

      await new Promise((resolve) => setTimeout(resolve, 1200));

      return;
    }

    console.log("CREATE ACTIVITY:", state);

    await new Promise((resolve) => setTimeout(resolve, 1200));
  },

  reset: () => {
    set({
      ...initialState,
    });
  },
}));