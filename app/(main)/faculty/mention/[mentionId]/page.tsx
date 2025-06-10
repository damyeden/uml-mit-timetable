import { RoomManagement } from "@/src/components/RoomsManagement/RoomManagement";
import { Badge } from "@/src/components/ui/badge";
import { Button } from "@/src/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { MentionService } from "@/src/lib/models/Mention/MentionService";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

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

// Fonction fictive pour récupérer les salles d'une mention
// Remplacez ceci par votre véritable fonction de service
async function getSallesByMentionId(mentionId: number): Promise<Salle[]> {
  // Données fictives basées sur l'ID de la mention
  const sallesData: Record<number, Salle[]> = {
    1: [
      // Informatique
      {
        id: 1,
        nom: "Salle Informatique A101",
        capacite: 30,
        latitude: 48.8566,
        longitude: 2.3522,
      },
      {
        id: 2,
        nom: "Laboratoire Réseaux B205",
        capacite: 25,
        latitude: 48.8576,
        longitude: 2.3532,
      },
      {
        id: 3,
        nom: "Amphithéâtre Turing",
        capacite: 150,
        latitude: 48.8556,
        longitude: 2.3512,
      },
      {
        id: 4,
        nom: "Salle Projet C301",
        capacite: 20,
        latitude: 48.8586,
        longitude: 2.3542,
      },
      {
        id: 5,
        nom: "Lab Intelligence Artificielle",
        capacite: 15,
        latitude: 48.8546,
        longitude: 2.3502,
      },
      {
        id: 6,
        nom: "Salle Serveurs D101",
        capacite: 8,
        latitude: 48.8596,
        longitude: 2.3552,
      },
      {
        id: 7,
        nom: "Amphithéâtre Jobs",
        capacite: 200,
        latitude: 48.8536,
        longitude: 2.3492,
      },
      {
        id: 8,
        nom: "Salle Développement E205",
        capacite: 35,
        latitude: 48.8606,
        longitude: 2.3562,
      },
    ],
    2: [
      // Mathématiques
      {
        id: 9,
        nom: "Amphithéâtre Euler",
        capacite: 180,
        latitude: 48.8566,
        longitude: 2.3522,
      },
      {
        id: 10,
        nom: "Salle Calcul A205",
        capacite: 40,
        latitude: 48.8576,
        longitude: 2.3532,
      },
      {
        id: 11,
        nom: "Laboratoire Statistiques",
        capacite: 25,
        latitude: 48.8556,
        longitude: 2.3512,
      },
      {
        id: 12,
        nom: "Salle Géométrie B301",
        capacite: 30,
        latitude: 48.8586,
        longitude: 2.3542,
      },
      {
        id: 13,
        nom: "Salle Algèbre C102",
        capacite: 35,
        latitude: 48.8546,
        longitude: 2.3502,
      },
      {
        id: 14,
        nom: "Amphithéâtre Gauss",
        capacite: 120,
        latitude: 48.8596,
        longitude: 2.3552,
      },
    ],
    3: [
      // Génie Civil
      {
        id: 15,
        nom: "Atelier Construction A",
        capacite: 45,
        latitude: 48.8566,
        longitude: 2.3522,
      },
      {
        id: 16,
        nom: "Laboratoire Matériaux",
        capacite: 20,
        latitude: 48.8576,
        longitude: 2.3532,
      },
      {
        id: 17,
        nom: "Salle Dessin Technique B205",
        capacite: 30,
        latitude: 48.8556,
        longitude: 2.3512,
      },
      {
        id: 18,
        nom: "Amphithéâtre Architecture",
        capacite: 100,
        latitude: 48.8586,
        longitude: 2.3542,
      },
      {
        id: 19,
        nom: "Atelier Maquettes C301",
        capacite: 25,
        latitude: 48.8546,
        longitude: 2.3502,
      },
      {
        id: 20,
        nom: "Salle CAO/DAO D102",
        capacite: 35,
        latitude: 48.8596,
        longitude: 2.3552,
      },
      {
        id: 21,
        nom: "Laboratoire Béton",
        capacite: 15,
        latitude: 48.8536,
        longitude: 2.3492,
      },
    ],
    4: [
      // Sciences Économiques
      {
        id: 22,
        nom: "Amphithéâtre Smith",
        capacite: 160,
        latitude: 48.8566,
        longitude: 2.3522,
      },
      {
        id: 23,
        nom: "Salle Économétrie A301",
        capacite: 40,
        latitude: 48.8576,
        longitude: 2.3532,
      },
      {
        id: 24,
        nom: "Salle Gestion B205",
        capacite: 35,
        latitude: 48.8556,
        longitude: 2.3512,
      },
      {
        id: 25,
        nom: "Laboratoire Finance",
        capacite: 25,
        latitude: 48.8586,
        longitude: 2.3542,
      },
      {
        id: 26,
        nom: "Salle Marketing C102",
        capacite: 30,
        latitude: 48.8546,
        longitude: 2.3502,
      },
      {
        id: 27,
        nom: "Salle Comptabilité D301",
        capacite: 28,
        latitude: 48.8596,
        longitude: 2.3552,
      },
    ],
    5: [
      // Lettres et Sciences Humaines
      {
        id: 28,
        nom: "Amphithéâtre Molière",
        capacite: 140,
        latitude: 48.8566,
        longitude: 2.3522,
      },
      {
        id: 29,
        nom: "Salle Littérature A205",
        capacite: 35,
        latitude: 48.8576,
        longitude: 2.3532,
      },
      {
        id: 30,
        nom: "Salle Histoire B301",
        capacite: 40,
        latitude: 48.8556,
        longitude: 2.3512,
      },
      {
        id: 31,
        nom: "Laboratoire Langues C102",
        capacite: 20,
        latitude: 48.8586,
        longitude: 2.3542,
      },
      {
        id: 32,
        nom: "Salle Philosophie D205",
        capacite: 30,
        latitude: 48.8546,
        longitude: 2.3502,
      },
      {
        id: 33,
        nom: "Salle Sociologie E301",
        capacite: 25,
        latitude: 48.8596,
        longitude: 2.3552,
      },
      {
        id: 34,
        nom: "Amphithéâtre Hugo",
        capacite: 180,
        latitude: 48.8536,
        longitude: 2.3492,
      },
    ],
  };

  return sallesData[mentionId] || [];
}

export default async function Page(props: PageProps) {
  const { mentionId } = await props.params;
  const mention = await MentionService.getMentionById(Number(mentionId));
  const salles = await getSallesByMentionId(Number(mentionId));

  if (!mention) {
    return (
      <div className="container mx-auto p-6 text-center">
        <h1 className="text-2xl font-bold mb-4">Mention non trouvée</h1>
        <Link href="/mentions">
          <Button variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour à la liste
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 md:p-6">
      <div className="mb-6">
        <Link href="/faculty">
          <Button variant="outline" className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour à la liste de mentions
          </Button>
        </Link>
      </div>

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
