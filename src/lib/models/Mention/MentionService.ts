// src/lib/services/mentionService.ts
import prisma from "../../prisma";
import { Mention } from "./Mention";

export class MentionService {
  public static async getAllMentions(): Promise<Mention[]> {
    const mentions = await prisma.mention.findMany({
      include: { salles: true },
    });

    return mentions.map(
      (mention) =>
        new Mention(
          mention.mentionId,
          mention.nom,
          mention.annee_fondation ?? undefined,
          mention.responsable ?? undefined,
          mention.logo ?? undefined
        )
    );
  }

  public static async getMentionById(id: number): Promise<Mention | null> {
    const mention = await prisma.mention.findUnique({
      where: { mentionId: id },
    });

    if (!mention) return null;

    return new Mention(
      mention.mentionId,
      mention.nom,
      mention.annee_fondation ?? undefined,
      mention.responsable ?? undefined,
      mention.logo ?? undefined
    );
  }

  public static async createMention(data: {
    nom: string;
    responsable: string;
    logo?: string;
    annee_fondation?: number;
  }): Promise<Mention> {
    const mention = await prisma.mention.create({
      data,
    });

    return new Mention(
      mention.mentionId,
      mention.nom,
      mention.annee_fondation ?? undefined,
      mention.responsable ?? undefined,
      mention.logo ?? undefined
    );
  }

  public static async updateMention(
    id: number,
    data: Partial<{
      nom: string;
      responsable: string;
      logo: string;
      annee_fondation: number;
    }>
  ): Promise<Mention | null> {
    try {
      const mention = await prisma.mention.update({
        where: { mentionId: id },
        data,
      });

      return new Mention(
        mention.mentionId,
        mention.nom,
        mention.annee_fondation ?? undefined,
        mention.responsable ?? undefined,
        mention.logo ?? undefined
      );
    } catch (error) {
      return null;
    }
  }

  public static async deleteMention(id: number): Promise<boolean> {
    try {
      await prisma.mention.delete({
        where: { mentionId: id },
      });
      return true;
    } catch (error) {
      return false;
    }
  }
}
