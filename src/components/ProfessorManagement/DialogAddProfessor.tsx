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
import { Users } from "lucide-react";
import { useState } from "react";

interface DialogAddProfessorProps {
  className?: string;
}

export default function DialogAddProfessor({
  className,
}: DialogAddProfessorProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleAddProfessor = () => {};

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button
          onClick={handleAddProfessor}
          className={cn(`${className}`)}
          variant="outline"
        >
          <Users className="mr-2 h-4 w-4" />
          Ajouter un professeur
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{"Ajouter un nouveau professeur"}</DialogTitle>
          <DialogDescription>
            Remplissez les informations du professeur.
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
              placeholder="ex: Dr. Marie Dubois"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              className="col-span-3"
              placeholder="ex: marie.dubois@university.fr"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="department" className="text-right">
              Département
            </Label>
            <Input
              id="department"
              className="col-span-3"
              placeholder="ex: Informatique"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="weeklyHours" className="text-right">
              Heures/semaine
            </Label>
            <Input
              id="weeklyHours"
              type="number"
              className="col-span-3"
              placeholder="ex: 18"
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
