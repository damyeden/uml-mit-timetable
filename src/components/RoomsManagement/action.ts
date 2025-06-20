"use server";
import { Equipment } from "@/src/lib/models/Equipment";
import { Salle } from "@/src/lib/models/Salle";

export async function addSalle(
  formData: {
    nom: string;
    capacite: number;
    photo: File | null;
    equipments?: number[] | null;
  },
  mentionId: number
) {
  try {
    await Salle.save(formData, mentionId);
    //revalidatePath("");
  } catch (error) {
    console.error("Erreur lors de la suppression:", error);
    throw new Error("Impossible d'ajouter la salle");
  }
}



export async function deleteSalle(salleId:number) { 
  try {
    await Salle.deleteSalle(salleId);
    //revalidatePath("");
  } catch (error) {
    console.error("Erreur lors de la suppression:", error);
    throw new Error("Impossible de supprimer la salle");
  }
}

export async function addEquipment(equipmentType: string) {
  try {
    const equipment = await Equipment.save(equipmentType);
    return {
      equipmentId: equipment.getEquipmentId(),
      equipmentType: equipment.equipmentType,
    };
    //revalidatePath("");
  } catch (error) {
    console.error("Erreur lors de la suppression:", error);
    throw new Error("Impossible de supprimer la mention");
  }
}

