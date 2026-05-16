export interface AddActivityForm {
  name: string;
  category: string;
  kp: string;

  generations: string[];
  studyPrograms: string[];

  description: string;

  eventDate: Date | null;
  eventTime: Date | null;

  registrationDeadlineDate: Date | null;
  registrationDeadlineTime: Date | null;

  location: string;
  meetingLink: string;

  requirements: string;
  contacts: string;
  claimRequirements: string;
}