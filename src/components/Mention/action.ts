"use server";
import { Mention } from "@/src/lib/models/Mention";
import { revalidatePath } from "next/cache";

export async function deleteMention(mentionId: number) {
  try {
    await Mention.deleteMention(mentionId);
    revalidatePath("/");
  } catch (error) {
    console.error("Erreur lors de la suppression:", error);
    throw new Error("Impossible de supprimer la mention");
  }
}

export async function addMention(formData: {
  logo: File | null;
  nom: string;
  responsable: string;
}) {
  try {
    await Mention.save(formData);
    revalidatePath("/");
  } catch (error) {
    console.error("Erreur lors de la suppression:", error);
    throw new Error("Impossible de supprimer la mention");
  }
}

export async function modifyMention(
  mentionId: number,
  formData: {
    logo: File | null;
    nom: string;
    responsable: string;
  }
) {
  try {
    await Mention.updateMention(mentionId, formData);
    //revalidatePath("");
  } catch (error) {
    console.error("Erreur lors de la suppression:", error);
    throw new Error("Impossible de supprimer la mention");
  }
}
