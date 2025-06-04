import { Role } from "@/src/components/Auth/schema/signupSchema";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import { useState } from "react";

interface TimeTableFilterProps {
  userRole: Role;
}

export default function TimeTableFilter({ userRole }: TimeTableFilterProps) {
  const [selectedView, setSelectedView] = useState("week");
  const [selectedProfessor, setSelectedProfessor] = useState("all");

  return (
    <div className="flex items-center gap-4 flex-wrap">
      {userRole === "ADMIN" && (
        <Select value={selectedProfessor} onValueChange={setSelectedProfessor}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Sélectionner un PROFESSOR" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous les PROFESSORs</SelectItem>
            <SelectItem value="marie">Dr. Marie Dubois</SelectItem>
            <SelectItem value="jean">Prof. Jean Martin</SelectItem>
            <SelectItem value="sophie">Dr. Sophie Laurent</SelectItem>
          </SelectContent>
        </Select>
      )}
      {
        <Select value={selectedView} onValueChange={setSelectedView}>
          <SelectTrigger className="w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="week">Semaine</SelectItem>
            <SelectItem value="month">Mois</SelectItem>
          </SelectContent>
        </Select>
      }
    </div>
  );
}
