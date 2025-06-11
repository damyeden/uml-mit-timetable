import { Equipment } from "@/src/lib/models/Equipment";
import { Salle } from "@/src/lib/models/Salle";
import DialogAddRoom from "./DialogAddRoom";
import RoomList from "./RoomList";

interface RoomManagementProps {
  mentionId: number;
}

export async function RoomManagement({ mentionId }: RoomManagementProps) {
  const salles = await Salle.getAllSalles(Number(mentionId));
  const equipementsServer = await Equipment.getAllEquipments();
  // Manually map to plain objects
  const equipements = equipementsServer.map((equipment) => ({
    equipmentId: equipment.getEquipmentId(),
    equipmentType: equipment.equipmentType,
    createdAt:
      equipment.createdAt instanceof Date
        ? equipment.createdAt.toISOString()
        : equipment.createdAt,
    updateAt:
      equipment.updateAt instanceof Date
        ? equipment.updateAt.toISOString()
        : equipment.updateAt,
    // Add any other properties you need
  }));

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
        <DialogAddRoom mentionId={mentionId} equipments={equipements} />
      </div>
      {/*
     <StatRoom />
     
     */}
      <RoomList salles={salles} />
    </div>
  );
}
