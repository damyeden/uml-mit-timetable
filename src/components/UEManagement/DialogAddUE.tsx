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
import { Plus } from "lucide-react";
import { useState } from "react";

interface DialogAddUEProps {
  className?: string;
}

export default function DialogAddUE({ className }: DialogAddUEProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const handleAddUE = () => {};

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button
          onClick={handleAddUE}
          className={cn(`${className}`)}
          variant="outline"
        >
          <Plus className="mr-2 h-4 w-4" />
          Ajouter une UE
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{"Ajouter une nouvelle UE"}</DialogTitle>
          <DialogDescription>
            Remplissez les informations de l&apos;Unité d&apos;Enseignement.
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
              placeholder="ex: Programmation Orientée Objet"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="code" className="text-right">
              Code
            </Label>
            <Input id="code" className="col-span-3" placeholder="ex: INFO301" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="credits" className="text-right">
              Crédits
            </Label>
            <Input
              id="credits"
              type="number"
              className="col-span-3"
              placeholder="ex: 6"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="hours" className="text-right">
              Heures
            </Label>
            <Input
              id="hours"
              type="number"
              className="col-span-3"
              placeholder="ex: 48"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="semester" className="text-right">
              Semestre
            </Label>
            <Input id="semester" className="col-span-3" placeholder="ex: S3" />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">{"Ajouter"}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
