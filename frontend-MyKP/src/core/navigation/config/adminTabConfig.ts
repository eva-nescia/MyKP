export const ADMIN_TAB_CONFIG = {
  activities: {
    label: "Activities",
    active: "list",
    inactive: "list-outline",
  },

  profile: {
    label: "Profile",
    active: "person",
    inactive: "person-outline",
  },
} as const;

export type AdminTabKey =
  keyof typeof ADMIN_TAB_CONFIG;