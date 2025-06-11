import { writeFile } from "fs/promises";
import { join } from "path";
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

  public photo?: string | null;

  constructor(
    salleId: number,
    nom: string,
    capacite: number,
    latitude?: number,
    longitude?: number,
    createdAt?: Date,
    updatedAt?: Date,
    equipments?: Equipment[],
    photo?: string | null
  ) {
    this.salleId = salleId;
    this.nom = nom;
    this.capacite = capacite;
    this.latitude = latitude;
    this.longitude = longitude;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.equipments = equipments;
    this.photo = photo;
  }

  public static async getAllSalles(mentionId: number): Promise<Salle[]> {
    const salles = await prisma.mentionSalle.findMany({
      where: {
        mentionId,
      },
      include: {
        salle: {
          include: {
            equipments: true,
          },
        },
      },
    });

    return salles.map((mentionSalle: any) => {
      const s = mentionSalle.salle;

      return new Salle(
        s.salleId,
        s.nom,
        s.capacite,
        s.latitude ?? undefined,
        s.longitude ?? undefined,
        s.createdAt ?? undefined,
        s.updatedAt ?? undefined,
        s.equipments
          ? s.equipments.map(
              (e: {
                equipmentId: number;
                equipmentType: string;
                createdAt: Date | null;
                updatedAt: Date | null;
              }) =>
                new Equipment(
                  e.equipmentId,
                  e.equipmentType,
                  e.createdAt ?? null,
                  e.updatedAt ?? null
                )
            )
          : undefined,
        s.photo ?? undefined
      );
    });
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

  public static async save(
    formData: {
      nom: string;
      capacite: number;
      photo: File | null;
      latitude?: number;
      longitude?: number;
    },
    mentionId: number
  ) {
    mentionId = Number(mentionId);
    const { nom, capacite, photo } = formData;
    try {
      if (!photo) {
        const newSalle = await prisma.salle.create({
          data: {
            nom,
            capacite,
          },
        });
        await prisma.mentionSalle.create({
          data: {
            mentionId,
            salleId: newSalle.salleId,
          },
        });

        return {
          success: true,
        };
      }

      // Convert File to buffer
      const bytes = await photo.arrayBuffer();
      const buffer = Buffer.from(bytes);

      // Create filename
      const timestamp = Date.now();
      const fileExtension = photo.name.split(".").pop();
      const filename = `${nom}-${timestamp}.${fileExtension}`;

      // Save to public/uploads
      const uploadDir = join(process.cwd(), "public", "uploads");
      const filepath = join(uploadDir, filename);

      // Ensure directory exists
      const fs = require("fs");
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      await writeFile(filepath, buffer);

      const newSalle = await prisma.salle.create({
        data: {
          nom,
          capacite,
          photo: `/uploads/${filename}`,
        },
      });

      await prisma.mentionSalle.create({
        data: {
          mentionId,
          salleId: newSalle.salleId,
        },
      });

      return {
        success: true,
        filename,
        path: `/uploads/${filename}`,
      };
    } catch (error) {
      console.error("Error saving mention:", error);
      return {
        success: false,
        error:
          error instanceof Error ? error.message : "Failed to save mention",
      };
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
