export class DayOfWeek {
  constructor(public idDay: number, public name: string) {}

  getIdDay(): number {
    return this.idDay;
  }

  setIdDay(idDay: number): void {
    this.idDay = idDay;
  }
}
