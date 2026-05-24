export interface Activity {
  id: string;
  title: string;
  image: any; // local require OR uri
  type: string; // category (KP type)
  points: number;
  date: string;
}