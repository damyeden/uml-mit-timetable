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
import { cn } from "@/src/lib/utils";
import { Building2 } from "lucide-react";
import { useState } from "react";

interface DialogAddRoomProps {
  className?: string;
}

export default function DialogAddRoom({ className }: DialogAddRoomProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const handleAddRoom = () => {};

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button
          onClick={handleAddRoom}
          className={cn(`${className}`)}
          variant="outline"
        >
          <Building2 className="mr-2 h-4 w-4" />
          Ajouter une salle
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{"Ajouter une nouvelle salle"}</DialogTitle>
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
              className="col-span-3"
              placeholder="ex: Cours magistral"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">{"Ajouter"}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
