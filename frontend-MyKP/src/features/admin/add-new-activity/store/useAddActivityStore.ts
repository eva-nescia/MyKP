import { create } from "zustand";

export interface AddActivityState {
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

  submit: () => void;
  reset: () => void;
}

/*
  ONLY DATA FIELDS
  (exclude actions)
*/
type AddActivityFields = Omit<
  AddActivityState,
  | "nextStep"
  | "prevStep"
  | "setField"
  | "toggleGeneration"
  | "toggleStudyProgram"
  | "openPicker"
  | "closePicker"
  | "submit"
  | "reset"
>;

export const useAddActivityStore =
  create<AddActivityState>((set, get) => ({
    // stepper
    step: 0,

    // basic info
    image: null,
    name: "",
    category: "",
    kp: "",

    generations: [],
    studyPrograms: [],

    description: "",

    // schedule
    eventDate: null,
    eventTime: null,

    registrationDeadlineDate: null,
    registrationDeadlineTime: null,

    location: "",
    registrationLink: "",

    // publish
    requirements: [],
    contacts: [],
    claimRequirements: "",

    // picker
    pickerVisible: false,
    pickerMode: "date",
    pickerField: null,

    // actions
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

      if (current.includes(value)) {
        set({
          generations: current.filter(
            (item) => item !== value
          ),
        });
      } else {
        set({
          generations: [...current, value],
        });
      }
    },

    toggleStudyProgram: (value) => {
      const current = get().studyPrograms;

      if (current.includes(value)) {
        set({
          studyPrograms: current.filter(
            (item) => item !== value
          ),
        });
      } else {
        set({
          studyPrograms: [...current, value],
        });
      }
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

    submit: async () => {
      console.log("SUBMIT DATA:", get());

      // simulate API delay (REMOVE when real API exists)
      await new Promise((resolve) => setTimeout(resolve, 1200));

      // later replace with real API call:
      // await api.createActivity(get());
    },

    reset: () => {
      set({
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
      });
    },
  }));