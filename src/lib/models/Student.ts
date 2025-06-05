import { Level } from "./Level"
import { Person } from "./Person";

export class Student extends Person {
  constructor(public studentId: string, public level: Level) {
    super(studentId, "", ""); // Inherited from Person
  }

  getAll(): any {
    return null;
  }

  getStudentId(): string {
    return this.studentId;
  }

  setStudentId(studentId: string): void {
    this.studentId = studentId;
  }
}
