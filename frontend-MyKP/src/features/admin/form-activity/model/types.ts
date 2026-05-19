export interface AddActivityForm {
  name: string;
  category: string;
  kp: string;

  generations: string[];
  studyPrograms: string[];

  description: string;

  eventDate: Date | null;
  startTime: Date | null;
  endTime: Date | null;

  registrationDeadlineDate: Date | null;
  registrationDeadlineTime: Date | null;

  location: string;
  registrationLink: string;

  requirements: string;
  contacts: string;
  claimRequirements: string;
}