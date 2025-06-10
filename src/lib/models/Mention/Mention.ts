// Remove prisma import from here since this will be used client-side
import { Salle } from "../Salle/Salle";

export class Mention {
  private mentionId: number;

  public getMentionId(): number {
    return this.mentionId;
  }

  public setMentionId(mentionId: number): void {
    this.mentionId = mentionId;
  }

  public nom: string;
  public annee_fondation?: number;
  public responsable?: string;
  public logo?: string;

  public salles?: Salle[];

  constructor(
    mentionId: number,
    nom: string,
    annee_fondation?: number,
    responsable?: string,
    logo?: string
  ) {
    this.mentionId = mentionId;
    this.nom = nom;
    this.annee_fondation = annee_fondation;
    this.responsable = responsable;
    this.logo = logo;
  }

  // This method will now only be used server-side
  // Move database operations to API routes or server actions
  public static async save(formData: {
    logo: File | null;
    nom: string;
    responsable: string;
  }) {
    try {
      // Create FormData for multipart upload
      const uploadFormData = new FormData();
      uploadFormData.append("nom", formData.nom);
      uploadFormData.append("responsable", formData.responsable);

      if (formData.logo) {
        uploadFormData.append("logo", formData.logo);
      }
      
      const response = await fetch("/api/createMention", {
        method: "POST",
        body: uploadFormData, // Use FormData instead of JSON
      });

      const result = await response.json();

      if (result.success) {
        return {
          success: true,
          message: "Mention saved successfully",
          data: result.data,
        };
      }

      return {
        success: false,
        error: result.error || "Failed to save mention",
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
}
