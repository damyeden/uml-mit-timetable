import { Professor } from "./Professor";
import { Ecue } from "./Ecue";
import { Slot } from "./Slot";
import { Course } from "./Course";
import { Level } from "./Level";
import { UE } from "./UE";

export class Admin {
  constructor(public idAdmin: string) {}

  getIdAdmin(): string {
    return this.idAdmin;
  }

  setIdAdmin(idAdmin: string): void {
    this.idAdmin = idAdmin;
  }

  getAll(): any {
    return null;
  }

  addProfessor(professor: Professor): boolean {
    return true;
  }

  modifyProfessor(professor: Professor): boolean {
    return true;
  }

  deleteProfessor(professor: Professor): boolean {
    return true;
  }

  getProfessor(): Professor {
    return new Professor("", [], []);
  }

  addEcue(ecue: Ecue): boolean {
    return true;
  }

  deleteEcue(ecue: Ecue): boolean {
    return true;
  }

  modifyEcue(ecue: Ecue): boolean {
    return true;
  }

  modifierCreneauProf(professor: Professor, slot: Slot): boolean {
    return true;
  }

  getProfessorById(idProfessor: string): Professor {
    return new Professor("", [], []);
  }

  addNewCourse(course: Course): boolean {
    return true;
  }

  deleteCourse(course: Course): boolean {
    return true;
  }

  associateCourseWithLevel(level: Level, course: Course): boolean {
    return true;
  }

  addNewUE(ue: UE): boolean {
    return true;
  }

  deleteUE(ue: UE): boolean {
    return true;
  }

  modifyUE(idUE: number, newUE: UE): boolean {
    return true;
  }
}
