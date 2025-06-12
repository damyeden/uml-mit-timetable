import { Badge } from "@/src/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { Salle } from "@/src/lib/models/Salle";
import { MapPin } from "lucide-react";
import Image from "next/image";
import DialogDeleteRoom from "./DialogDeleteRoom";
const getStatusLabel = (status: string) => {
  switch (status) {
    case "available":
      return "Disponible";
    case "occupied":
      return "Occupée";
    case "maintenance":
      return "Maintenance";
    default:
      return status;
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "available":
      return "bg-green-100 text-green-800";
    case "occupied":
      return "bg-red-100 text-red-800";
    case "maintenance":
      return "bg-yellow-100 text-yellow-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

interface RoomCardProps {
  salle: Salle;
}

export default function RoomCard({ salle }: RoomCardProps) {
  return (
    <Card key={salle.getSalleId()} className="overflow-hidden">
      {salle.photo && (
        <div className="aspect-video w-full overflow-hidden relative">
          <Image
            src={salle.photo || ""}
            alt={`Photo de ${salle.nom}`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      )}

      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl">{salle.nom}</CardTitle>
          {/*
            <Badge className={getStatusColor(room.status)}>
            {getStatusLabel(room.status)}
          </Badge>
          
          */}
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-2">
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              Capacité
            </p>
            <p>{salle.capacite} places</p>
          </div>
        </div>

        {salle.latitude && salle.longitude && (
          <div className="flex items-center text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 mr-1" />
            <span>
              {salle.latitude.toFixed(4)}, {salle.longitude.toFixed(4)}
            </span>
          </div>
        )}

        <div>
          <p className="text-sm font-medium text-muted-foreground mb-2">
            Équipements
          </p>
          <div className="flex flex-wrap gap-1">
            {salle.equipments?.map((eq, index) => (
              <Badge key={index} variant="secondary" className="text-xl">
                {eq.equipmentType}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex justify-start gap-2 pt-2">
        {/*  
              <DialogModifyRoom room={room} />
        */}
        <DialogDeleteRoom salleId={salle.getSalleId()} />
      </CardFooter>
    </Card>
  );
}
