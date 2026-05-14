import { AdminProfile } from "../model/types";

export function getAdminProfile(): AdminProfile {
  return {
    organizationName:
      "Student Council",

    email:
      "studentcouncil@ciputra.ac.id",

    role:
      "Official Organization Account",

    logo: require("assets/images/profile-placeholder/student_council.png"),
  };
}