export class HalfYear {
  constructor(public idSemestre: number, public nom: string) {}

  getIdSemestre(): number {
    return this.idSemestre;
  }

  setIdSemestre(idSemestre: number): void {
    this.idSemestre = idSemestre;
  }

  getAllSemestre(): any {
    return null;
  }
}
