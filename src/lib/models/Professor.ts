import { Ecue } from "./Ecue";
import { Person } from "./Person";
import { Slot } from "./Slot";

export class Professor extends Person {
  constructor(
    public idProfessor: string,
    public freeSlots: Slot[],
    public ecues: Ecue[]
  ) {
    super(idProfessor, "", ""); // Inherited from Person
  }

  getIdProfessor(): string {
    return this.idProfessor;
  }

  setIdProfessor(idProfessor: string): void {
    this.idProfessor = idProfessor;
  }

  saveInDB(): boolean {
    return true;
  }
}
