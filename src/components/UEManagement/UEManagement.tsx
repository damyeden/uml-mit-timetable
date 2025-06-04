"use client";

import DialogAddUE from "./DialogAddUE";
import StatUE from "./StatUE";
import UEList from "./UEList";

export interface UE {
  id: string;
  name: string;
  code: string;
  credits: number;
  hours: number;
  semester: string;
  professor: string;
  students: number;
}

export function UEManagement() {
  const ues: UE[] = [
    {
      id: "1",
      name: "Programmation Orientée Objet",
      code: "INFO301",
      credits: 6,
      hours: 48,
      semester: "S3",
      professor: "Dr. Marie Dubois",
      students: 45,
    },
    {
      id: "2",
      name: "Analyse Mathématique",
      code: "MATH201",
      credits: 4,
      hours: 36,
      semester: "S2",
      professor: "Prof. Jean Martin",
      students: 60,
    },
    {
      id: "3",
      name: "Mécanique Quantique",
      code: "PHYS401",
      credits: 8,
      hours: 60,
      semester: "S4",
      professor: "Dr. Sophie Laurent",
      students: 25,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Gestion des UE</h2>
          <p className="text-muted-foreground">
            Gérez les Unités d&apos;Enseignement et leurs paramètres
          </p>
        </div>
        <DialogAddUE />
      </div>

      <StatUE ues={ues} />
      <UEList ues={ues} />
    </div>
  );
}
