"use client";

import type { Role } from "@/src/components/Auth/schema/signupSchema";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import { useEffect, useState } from "react";

interface TimeTableFilterProps {
  userRole: Role;
}

const levels: string[] = ["L1", "L2", "L3", "M1", "M2"];

// Définition des parcours disponibles par niveau
const parcoursOptions: Record<string, string[]> = {
  L1: ["IT"],
  L2: ["IT"],
  L3: ["MISA"],
  M1: ["INT", "MISA"],
  M2: ["INT", "MISA"],
};

// Définition des spécialités disponibles par niveau
const specialiteOptions: Record<string, string[]> = {
  L3: ["Base de données", "Réseaux et système", "Développement logiciel"],
};

export default function TimeTableFilter({ userRole }: TimeTableFilterProps) {
  const [selectedLevel, setSelectedLevel] = useState("L1");
  const [selectedProfessor, setSelectedProfessor] = useState("all");
  const [selectedParcours, setSelectedParcours] = useState<string>(
    parcoursOptions[selectedLevel][0]
  );
  const [selectedSpecialite, setSelectedSpecialite] = useState<string>("");

  // Réinitialiser le parcours et la spécialité sélectionnés quand le niveau change
  useEffect(() => {
    setSelectedParcours(parcoursOptions[selectedLevel][0]);
    if (specialiteOptions[selectedLevel]) {
      setSelectedSpecialite(specialiteOptions[selectedLevel][0]);
    } else {
      setSelectedSpecialite("");
    }
  }, [selectedLevel]);

  // Déterminer si nous avons besoin d'afficher le sélecteur de parcours
  const availableParcours = parcoursOptions[selectedLevel];
  const showParcoursSelect = availableParcours.length > 1;

  const availableSpecialites = specialiteOptions[selectedLevel] || [];
  const showSpecialiteSelect = availableSpecialites.length > 0;

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

      <Select value={selectedLevel} onValueChange={setSelectedLevel}>
        <SelectTrigger className="w-32">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {levels.map((level, id) => (
            <SelectItem key={id} value={level}>
              {level.toUpperCase()}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Afficher le parcours comme un select si plusieurs options, sinon comme texte statique */}
      {showParcoursSelect ? (
        <Select value={selectedParcours} onValueChange={setSelectedParcours}>
          <SelectTrigger className="w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {availableParcours.map((parcours, id) => (
              <SelectItem key={id} value={parcours}>
                {parcours}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      ) : (
        <div className="flex items-center px-3 py-2 border rounded-md h-10">
          <span className="text-sm">Parcours: {selectedParcours}</span>
        </div>
      )}

      {/* Afficher le sélecteur de spécialité pour L3 */}
      {showSpecialiteSelect && (
        <Select
          value={selectedSpecialite}
          onValueChange={setSelectedSpecialite}
        >
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Sélectionner une spécialité" />
          </SelectTrigger>
          <SelectContent>
            {availableSpecialites.map((specialite, id) => (
              <SelectItem key={id} value={specialite}>
                {specialite}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
    </div>
  );
}
