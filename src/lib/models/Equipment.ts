export class Equipment {
  private equipmentId: number;

  public getEquipmentId(): number {
    return this.equipmentId;
  }

  public setEquipmentId(id: number): void {
    this.equipmentId = id;
  }
  public equipmentType: string;
  constructor(equipmentId: number, equipmentType: string) {
    this.equipmentId = equipmentId;
    this.equipmentType = equipmentType;
  }
}
