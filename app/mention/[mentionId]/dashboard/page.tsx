import DialogDeleteMention from "@/src/components/Mention/DialogDeleteMention";
import DialogModifyMention from "@/src/components/Mention/DialogModifyMention";
import { RoomManagement } from "@/src/components/RoomsManagement/RoomManagement";
import { Badge } from "@/src/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { Mention } from "@/src/lib/models/Mention";
import Image from "next/image";
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
  params: Promise<{ mentionId: string }>;
}

export default async function Page(props: PageProps) {
  const { mentionId } = await props.params;
  const mention = await Mention.getMentionById(Number(mentionId));

  if (!mention) {
    return (
      <div className="container mx-auto p-6 text-center">{notFound()}</div>
    );
  }

  return (

    
    <div className="container mx-auto p-4 md:p-6">
      <Card className="mb-8">
        <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between pb-2">
          <div className="flex items-center gap-4">
            {mention.logo ? (
              <div className="relative h-16 w-16 rounded-full overflow-hidden border">
                <Image
                  src={mention.logo || "/placeholder.svg"}
                  alt={`Logo de ${mention.nom}`}
                  fill
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center">
                <span className="text-2xl font-bold">
                  {mention.nom.charAt(0)}
                </span>
              </div>
            )}
            <div>
              <CardTitle className="text-2xl md:text-3xl">
                {mention.nom}
              </CardTitle>
              {mention.annee_fondation && (
                <p className="text-muted-foreground">
                  Fondée en {mention.annee_fondation}
                </p>
              )}
            </div>
          </div>
          <div className="flex gap-2 mt-4 md:mt-0">
            <DialogModifyMention
              mentionId={Number(mentionId)}
              nom={mention.nom}
              responsable={mention.responsable}
              logo={mention.logo}
            />
            <DialogDeleteMention mentionId={mentionId} />
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-medium text-lg">Responsable</h3>
              <p>{mention.responsable || "Non spécifié"}</p>
            </div>
            <div>
              <h3 className="font-medium text-lg">Informations</h3>
              <div className="flex flex-wrap gap-2 mt-2">
                <Badge variant="outline">
                  {mention.salles
                    ? `${mention.salles.length} salles`
                    : "0 salle"}
                </Badge>
                <Badge variant="outline">
                  Capacité totale:{" "}
                  {mention.salles && mention.salles.length > 0
                    ? mention.salles.reduce(
                        (sum, salle) => sum + salle.capacite,
                        0
                      )
                    : 0}{" "}
                  personnes
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/*
      
      <div className="mb-4">
        <h2 className="text-2xl font-bold mb-2">Salles</h2>
        <Separator className="mb-6" />
        
        {(mention.salles?.length ?? 0) === 0 ? (
          <div className="text-muted-foreground text-center py-8">
            Aucune salle n'est disponible pour cette mention.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {(mention.salles ?? []).map((salle) => (
              <Card
                key={salle.getSalleId()}
                className="overflow-hidden hover:shadow-lg transition-shadow"
              >
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{salle.nom}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Capacité:</span>
                      <span className="font-medium">
                        {salle.capacite} personnes
                      </span>
                    </div>
                    {salle.latitude && salle.longitude && (
                      <div className="mt-2">
                        <Button variant="outline" size="sm" className="w-full">
                          Voir sur la carte
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
      
      
      
      
      
      */}

      <RoomManagement />
    </div>
  );
}
