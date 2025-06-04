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
import { UE } from "./UEManagement";
interface DialogModifyUEProps {
  ue: UE;
}

export default function DialogModifyUE({ ue }: DialogModifyUEProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const handleEditUE = () => {};

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" onClick={handleEditUE}>
          <Edit className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{"Modifier l'UE"}</DialogTitle>
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
              defaultValue={ue.name || ""}
              className="col-span-3"
              placeholder="ex: Programmation Orientée Objet"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="code" className="text-right">
              Code
            </Label>
            <Input
              id="code"
              defaultValue={ue.code || ""}
              className="col-span-3"
              placeholder="ex: INFO301"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="credits" className="text-right">
              Crédits
            </Label>
            <Input
              id="credits"
              type="number"
              defaultValue={ue.credits || ""}
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
              defaultValue={ue.hours || ""}
              className="col-span-3"
              placeholder="ex: 48"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="semester" className="text-right">
              Semestre
            </Label>
            <Input
              id="semester"
              defaultValue={ue.semester || ""}
              className="col-span-3"
              placeholder="ex: S3"
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
