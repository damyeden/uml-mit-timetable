import { Equipment } from "./Equipment";

export class Salle {
  private salleId: number;
  public getSalleId(): number {
    return this.salleId;
  }
  public setSalleId(salleId: number): void {
    this.salleId = salleId;
  }
  public nom: string;
  public capacite: number;
  public latitude?: number;
  public longitude?: number;

  public createdAt?: Date;
  public updatedAt?: Date;
  // Changed salleId type from string to number
  public equipments?: Equipment[];

  constructor(
    salleId: number,
    nom: string,
    capacite: number,
    latitude?: number,
    longitude?: number,
    createdAt?: Date,
    updatedAt?: Date
  ) {
    this.salleId = salleId;
    this.nom = nom;
    this.capacite = capacite;
    this.latitude = latitude;
    this.longitude = longitude;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
