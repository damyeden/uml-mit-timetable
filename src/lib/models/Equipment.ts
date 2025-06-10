export class Equipment {
  private equipmentId: number;

  public getEquipmentId(): number {
    return this.equipmentId;
  }

  public setEquipmentId(id: number): void {
    this.equipmentId = id;
  }

  public equipmentType: string;
  public salleId: number;
  public createdAt: Date | null;
  public updateAt: Date | null;

  constructor(
    equipmentId: number,
    equipmentType: string,
    salleId: number,
    createdAt: Date | null,
    updateAt: Date | null
  ) {
    this.equipmentId = equipmentId;
    this.equipmentType = equipmentType;
    this.salleId = salleId;
    this.createdAt = createdAt;
    this.updateAt = updateAt;
  }
}
