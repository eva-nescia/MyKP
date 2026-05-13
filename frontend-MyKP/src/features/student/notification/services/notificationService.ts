export function getNotifications() {
  return {
    today: [
      {
        id: 1,
        type: "reminder",
        title: "Event in 3 days",
        description:
          "Seminar Bela Negara & Anti Narkoba",
        time: "1 hour ago",
      },

      {
        id: 2,
        type: "reminder",
        title:
          "Registration deadline is near",
        description: "Mantai CODE5 (WAJIB GEN 5)",
        time: "7 hours ago",
      },

      {
        id: 3,
        type: "success",
        title: "Successfully Registered",
        description:
          "Seminar Bela Negara & Anti Narkoba",
        time: "7 hours ago",
      },
    ],

    yesterday: [
      {
        id: 4,
        type: "notification",
        title: "New Event!",
        description:
          "Seminar Bela Negara & Anti Narkoba",
        time: "1 day ago",
      },
    ],
  };
}