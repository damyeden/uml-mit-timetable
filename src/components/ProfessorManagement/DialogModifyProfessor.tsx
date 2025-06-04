import { Button } from "@/src/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/src/components/ui/dialog";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { Edit } from "lucide-react";
import { useState } from "react";
import { Professor } from "./ProfessorManagement";

interface DialogModifyProfessorProps {
  professor: Professor;
}

export default function DialogModifyProfessor({
  professor,
}: DialogModifyProfessorProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const handleAddProfessor = () => {};
    
  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" onClick={handleAddProfessor}>
          <Edit className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{"Modifier le professeur"}</DialogTitle>
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
              defaultValue={professor.name || ""}
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
              defaultValue={professor.email || ""}
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
              defaultValue={professor.department || ""}
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
              defaultValue={professor.weeklyHours || ""}
              className="col-span-3"
              placeholder="ex: 18"
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
