export interface ICourses {
  courses: ICourse[];
}

export interface ICourse {
  id: string;
  title: string;
  description: string;
  previewImageLink: string;
  lessonsCount: number;
  lessons?: ILesson[];
  rating: number;
  meta: IMeta;
  duration: number;
  launchDate: string;
}

export interface ILesson {
  id: string;
  title: string;
  status: LessonStatus;
  link: string;
  duration: number;
}

interface IMeta {
  skills: string[];
  courseVideoPreview: { link: string };
}

export enum LessonStatus {
  Locked = 'locked',
  Unlocked = 'unlocked',
}
