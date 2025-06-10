"use server";
import { MentionService } from "@/src/lib/models/Mention/MentionService";
import DialogAddMention from "../Mention/DialogAddMention";
import MentionCard from "../Mention/MentionCard";

export default async function Faculty() {
  const mentions = await MentionService.getAllMentions();

  if (mentions.length === 0) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">
            Listes des mentions
          </h2>
          <p className="text-muted-foreground">
            Vue d&apos;ensemble des mentions
          </p>
        </div>
        <div className="w-full flex flex-col items-center justify-center space-y-3">
          <div className="text-center text-xl">no mentions</div>
          <DialogAddMention />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">
            Gestion de la faculté
          </h2>
          <p className="text-muted-foreground">
            Vue d&apos;ensemble des mentions et de leurs responsables
          </p>
        </div>
        <DialogAddMention />
      </div>
      {
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {mentions.map((mention, index) => {
            return <MentionCard mention={mention} key={index} />;
          })}
        </div>
      }
    </div>
  );
}
