import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/src/components/ui/dialog";

import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { Edit } from "lucide-react";
import { useState } from "react";
import { Room } from "./RoomManagement";

interface DialogModifyRoomProps {
  room: Room;
}

export default function DialogModifyRoom({ room }: DialogModifyRoomProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const handleEditRoom = () => {};

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" onClick={handleEditRoom}>
          <Edit className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{"Modifier la salle"}</DialogTitle>
          <DialogDescription>
            Remplissez les informations de la salle de cours.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Nom
            </Label>
            <Input
              id="name"
              defaultValue={room.name || ""}
              className="col-span-3"
              placeholder="ex: Salle A101"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="capacity" className="text-right">
              Capacité
            </Label>
            <Input
              id="capacity"
              type="number"
              defaultValue={room.capacity || ""}
              className="col-span-3"
              placeholder="ex: 30"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="type" className="text-right">
              Type
            </Label>
            <Input
              id="type"
              defaultValue={room.type || ""}
              className="col-span-3"
              placeholder="ex: Cours magistral"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">{"Modifier"}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
