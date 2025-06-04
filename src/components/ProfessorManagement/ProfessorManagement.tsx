"use client";

import DialogAddProfessor from "./DialogAddProfessor";
import ProfessorList from "./ProfessorList";
import StatProfessor from "./StatProfessor";

export interface Professor {
  id: string;
  name: string;
  email: string;
  department: string;
  subjects: string[];
  weeklyHours: number;
  status: "active" | "inactive";
}

export function ProfessorManagement() {
  const professors: Professor[] = [
    {
      id: "1",
      name: "Dr. Marie Dubois",
      email: "marie.dubois@university.fr",
      department: "Informatique",
      subjects: ["Programmation", "Base de données"],
      weeklyHours: 18,
      status: "active",
    },
    {
      id: "2",
      name: "Prof. Jean Martin",
      email: "jean.martin@university.fr",
      department: "Mathématiques",
      subjects: ["Algèbre", "Analyse"],
      weeklyHours: 20,
      status: "active",
    },
    {
      id: "3",
      name: "Dr. Sophie Laurent",
      email: "sophie.laurent@university.fr",
      department: "Physique",
      subjects: ["Mécanique", "Thermodynamique"],
      weeklyHours: 16,
      status: "inactive",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">
            Gestion des professeurs
          </h2>
          <p className="text-muted-foreground">
            Gérez les professeurs et leurs informations
          </p>
        </div>
        <DialogAddProfessor />
      </div>
      <StatProfessor professors={professors} />
      <ProfessorList professors={professors} />
    </div>
  );
}
