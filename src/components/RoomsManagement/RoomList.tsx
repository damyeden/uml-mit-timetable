"use state";
import { Salle } from "@/src/lib/models/Salle";
import RoomCard from "./RoomCard";

interface RoomListProps {
  salles: Salle[];
}

export default function RoomList({ salles }: RoomListProps) {
  return (
    <div className="space-y-6 p-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Liste des salles</h2>
        <p className="text-muted-foreground">
          Gérez toutes vos salles de cours depuis cette interface
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {salles.map((salle, key) => (
          <RoomCard salle={salle} key={key} />
        ))}
      </div>
    </div>
  );
}
