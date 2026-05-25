export const UC_LOCATIONS = [
  {
    floor: "General",
    items: ["TBA", "Online"],
  },
  {
    floor: "1st Floor",
    items: ["101", "102", "103", "104", "105", "106", "Simbus"],
  },
  {
    floor: "2nd Floor",
    items: [
      "201",
      "202",
      "203",
      "204",
      "205",
      "206",
      "207",
      "208",
      "209",
      "Library",
    ],
  },
  {
    floor: "3rd Floor",
    items: ["301", "302", "303", "304", "305", "306", "307", "308", "309"],
  },
  {
    floor: "4th Floor",
    items: ["401", "402", "403", "404", "405", "406", "407", "408", "409"],
  },
  {
    floor: "5th Floor",
    items: ["501", "502", "503", "504", "505", "506", "507", "508", "509"],
  },
  {
    floor: "6th Floor",
    items: ["601", "602", "603", "604", "605", "606", "607", "608", "609"],
  },
  {
    floor: "7th Floor",
    items: ["Prefunction", "Auditorium"],
  },
];

export const formatUcLocationWithFloor = (location?: string): string => {
  if (!location) return "TBA";

  const floor = UC_LOCATIONS.find(({ items }) =>
    items.includes(location)
  )?.floor;

  if (!floor || floor === "General") return location;

  return `${location}, ${floor}`;
};
