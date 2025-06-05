export class Course {
  constructor(public courseId: number, public name: string) {}

  getCourseId(): number {
    return this.courseId;
  }

  setCourseId(courseId: number): void {
    this.courseId = courseId;
  }
}
