import { Ecue } from "./Ecue";

export class UE {
  constructor(public idUE: number, public name: string, public ecues: Ecue[]) {}

  getIdUE(): number {
    return this.idUE;
  }

  setIdUE(idUE: number): void {
    this.idUE = idUE;
  }

  save(): boolean {
    return true;
  }

  getName(): string {
    return this.name;
  }

  setName(name: string): void {
    this.name = name;
  }
}
