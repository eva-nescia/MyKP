export type NotificationType =
  | "reminder"
  | "success"
  | "notification";

export type NotificationItem = {
  id: number;
  type: NotificationType;
  title: string;
  description: string;
  time: string;
};

export type NotificationGroups = {
  today: NotificationItem[];
  yesterday: NotificationItem[];
  thisWeek: NotificationItem[];
  older: NotificationItem[];
};

export function getNotifications(): NotificationGroups {
  return {
    today: [
      {
        id: 1,
        type: "reminder",
        title: "Activity in 3 days",
        description:
          "Seminar Bela Negara & Anti Narkoba",
        time: "1 hour ago",
      },

      {
        id: 2,
        type: "reminder",
        title:
          "Registration deadline is near",
        description:
          "Mantai CODE5 (WAJIB GEN 5)",
        time: "7 hours ago",
      },
    ],

    yesterday: [
      {
        id: 3,
        type: "success",
        title:
          "Activity Saved Successfully",
        description:
          "Seminar Bela Negara & Anti Narkoba",
        time: "1 day ago",
      },
    ],

    thisWeek: [
      {
        id: 4,
        type: "notification",
        title: "New Activity Available",
        description:
          "Seminar Bela Negara & Anti Narkoba",
        time: "3 days ago",
      },
    ],

    older: [
      {
        id: 5,
        type: "notification",
        title: "New Activity Available",
        description:
          "Leadership Seminar 2026",
        time: "2 weeks ago",
      },
    ],
  };
}

// export function getNotifications(): NotificationGroups {
//   return {
//     today: [],
//     yesterday: [],
//     thisWeek: [],
// //     older: [],
// //   };
// }