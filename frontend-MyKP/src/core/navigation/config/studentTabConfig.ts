export const STUDENT_TAB_CONFIG = {
  dashboard: {
    label: "Dashboard",
    active: "home",
    inactive: "home-outline",
  },
  activities: {
    label: "Activities",
    active: "list",
    inactive: "list-outline",
  },
  saved: {
    label: "Saved",
    active: "bookmark",
    inactive: "bookmark-outline",
  },
  profile: {
    label: "Profile",
    active: "person",
    inactive: "person-outline",
  },
} as const;

export type StudentTabKey = keyof typeof STUDENT_TAB_CONFIG;