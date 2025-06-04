"use client";

import DialogAddRoom from "./DialogAddRoom";
import RoomList from "./RoomList";
import StatRoom from "./StatRoom";

export interface Room {
  id: string;
  name: string;
  capacity: number;
  type: string;
  equipment: string[];
  status: "available" | "occupied" | "maintenance";
}

export function RoomManagement() {
  const rooms: Room[] = [
    {
      id: "1",
      name: "Salle A101",
      capacity: 30,
      type: "Cours magistral",
      equipment: ["Projecteur", "Tableau"],
      status: "available",
    },
    {
      id: "2",
      name: "Salle B205",
      capacity: 20,
      type: "TP Informatique",
      equipment: ["Ordinateurs", "Projecteur"],
      status: "occupied",
    },
    {
      id: "3",
      name: "Amphithéâtre C",
      capacity: 150,
      type: "Amphithéâtre",
      equipment: ["Micro", "Projecteur", "Écran géant"],
      status: "available",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">
            Gestion des salles
          </h2>
          <p className="text-muted-foreground">
            Gérez les salles de cours et leurs équipements
          </p>
        </div>
        <DialogAddRoom />
      </div>
      <StatRoom rooms={rooms} />
      <RoomList rooms={rooms} />
    </div>
  );
}
