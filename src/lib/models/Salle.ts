import prisma from "../prisma";
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
    updatedAt?: Date,
    equipments?: Equipment[]
  ) {
    this.salleId = salleId;
    this.nom = nom;
    this.capacite = capacite;
    this.latitude = latitude;
    this.longitude = longitude;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.equipments = equipments;
  }

  public static async getAllSalles(): Promise<Salle[]> {
    const salles = await prisma.salle.findMany();

    return salles.map(
      (salle) => new Salle(salle.salleId, salle.nom, salle.capacite)
    );
  }

  public static async getSalleById(id: number): Promise<Salle | null> {
    const salle = await prisma.salle.findUnique({
      where: { salleId: id },
    });

    if (!salle) return null;

    return new Salle(
      salle.salleId,
      salle.nom,
      salle.capacite,
      salle.latitude ?? undefined,
      salle.longitude ?? undefined,
      salle.createdAt ?? undefined,
      salle.updatedAt ?? undefined
    );
  }

  public static async save(data: {
    nom: string;
    capacite: number;
    latitude?: number;
    longitude?: number;
  }): Promise<boolean> {
    try {
      await prisma.salle.create({
        data,
      });
      return true;
    } catch {
      return false;
    }
  }

  public static async updateSalle(
    id: number,
    data: Partial<{
      nom: string;
      capacite: number;
      latitude?: number;
      longitude?: number;
    }>
  ): Promise<boolean> {
    try {
      await prisma.salle.update({
        where: { salleId: id },
        data,
      });
      return true;
    } catch {
      return false;
    }
  }

  public static async deleteSalle(id: number): Promise<boolean> {
    try {
      await prisma.salle.delete({
        where: { salleId: id },
      });
      return true;
    } catch {
      return false;
    }
  }
}
