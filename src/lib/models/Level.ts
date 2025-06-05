import { Course } from "./Course";
import { HalfYear } from "./HalfYear";

export class Level {
  constructor(
    public levelId: number,
    public name: string,
    public courses: Course[],
    public halfYear: HalfYear
  ) {}

  getLevelId(): number {
    return this.levelId;
  }

  setLevelId(levelId: number): void {
    this.levelId = levelId;
  }

  getCourses(): Course[] {
    return this.courses;
  }

  setCourses(courses: Course[]): void {
    this.courses = courses;
  }
}
