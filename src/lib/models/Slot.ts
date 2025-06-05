export class Slot {
  constructor(
    public idSlot: number,
    public startTime: Date,
    public endTime: Date,
    public dayId: number
  ) {}

  getDayOfWeek(): string {
    // Dummy implementation
    return "Monday";
  }

  getIdSlot(): number {
    return this.idSlot;
  }

  setIdSlot(idSlot: number): void {
    this.idSlot = idSlot;
  }
}
