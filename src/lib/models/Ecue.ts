export class Ecue {
  constructor(
    public idEcue: number,
    public nom: string,
    public credits: string
  ) {}

  getIdEcue(): number {
    return this.idEcue;
  }

  setIdEcue(idEcue: number): void {
    this.idEcue = idEcue;
  }
}
