import { Person } from "./Person";

export class Professor extends Person {
  private professorId: string;

  public getProfessorId(): string {
    return this.professorId;
  }

  public setAdminId(professorId: string) {
    this.professorId = professorId;
  }

  constructor(
    professorId: string,
    personId: string,
    lastname: string,
    userId: string,
    firstname?: string
  ) {
    super(personId, lastname, userId, firstname);
    this.professorId = professorId;
  }
}
