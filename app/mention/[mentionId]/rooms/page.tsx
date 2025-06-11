import { RoomManagement } from "@/src/components/RoomsManagement/RoomManagement";
import { Mention } from "@/src/lib/models/Mention";
import { notFound } from "next/navigation";

// Définition de l'interface pour les salles
interface Salle {
  id: number;
  nom: string;
  capacite: number;
  latitude?: number;
  longitude?: number;
}

interface PageProps {
  params: Promise<{ mentionId: number }>;
}

export default async function Page(props: PageProps) {
  const { mentionId } = await props.params;
  const mention = await Mention.getMentionById(Number(mentionId));

  if (!mention) {
    return (
      <div className="container mx-auto p-6 text-center">{notFound()}</div>
    );
  }

  return <RoomManagement mentionId={mentionId} />;
}
