export class CreneauLibre {
  private creneauLibreId: number;
  public professorId: string;
  public creneauId: number;
  public auId: number;

  constructor(creneauLibreId: number, professorId: string, creneauId: number, auId: number) {
    this.creneauLibreId = creneauLibreId;
    this.creneauId = creneauId;
    this.professorId = professorId;
    this.auId = auId;
  }

  getCreneauLibreId(): number {
    return this.creneauLibreId;
  }

  setCreneauLibreId(id: number) {
    this.creneauLibreId = id;
  }
}
