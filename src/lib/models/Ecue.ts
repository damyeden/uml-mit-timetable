export class Ecue {
  private ecueId: number;
  public name: string;
  public credits: number;

  constructor(ecueId: number, name: string, credits: number) {
    this.ecueId = ecueId;
    this.name = name;
    this.credits = credits;
  }

  public getEcueId(): number {
    return this.ecueId;
  }
  public setEcueId(ecueId: number) {
    this.ecueId = ecueId;
  }
}
