"use client";

import { Role } from "@/src/components/Auth/schema/signupSchema";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { Calendar } from "lucide-react";
import Legend from "./Legend";

import TimeTableFilter from "./TimeTableFilter";
import TimeTableInterface from "./TimetableInterface/TimeTableInterface";

export interface ScheduleEvent {
  id: string;
  title: string;
  ecue: string;
  professor: string;
  room: string;
  startTime: string;
  endTime: string;
  day: number;
  type: "cours" | "td" | "tp";
  ue: string;
  date?: string;
}

interface ScheduleViewerProps {
  userRole: Role;
  mentionId: number;
}

export function TimeTable({ userRole, mentionId }: ScheduleViewerProps) {
  const events: ScheduleEvent[] = [
    {
      id: "1",
      title: "Prototypage numérique",
      ecue: "Conception et modelisation",
      professor: "Mr Tahiry",
      room: "Grande Salle MISA",
      startTime: "13:00",
      endTime: "16:00",
      day: 4,
      type: "cours",
      ue: "INFO301",
      date: "3 Mars 2025",
    },
    {
      id: "2",
      title: "Prototypage numérique",
      ecue: "Architectures",
      professor: "Mr Fenohery",
      room: "Grande Salle MISA",
      startTime: "13:00",
      endTime: "16:00",
      day: 3,
      type: "cours",
      ue: "INFO301",
      date: "3 Mars 2025",
    },
    {
      id: "3",
      title: "Mathématique du numérique",
      ecue: "Méthodes numériques",
      professor: "Mr Patrick",
      room: "R234",
      startTime: "09:00",
      endTime: "12:00",
      day: 3,
      type: "cours",
      ue: "INFO301",
      date: "3 Mars 2025",
    },
    {
      id: "4",
      title: "Mathématique du numérique",
      ecue: "Méthodes numériques",
      professor: "Mr Patrick",
      room: "R234",
      startTime: "09:00",
      endTime: "12:00",
      day: 3,
      type: "cours",
      ue: "INFO301",
      date: "3 Mars 2025",
    },
    {
      id: "5",
      title: "Mathématique du numérique",
      ecue: "Applications mathématiques",
      professor: "Mr Tahiry",
      room: "Grande Salle MISA",
      startTime: "08:00",
      endTime: "10:00",
      day: 1,
      type: "cours",
      ue: "INFO301",
      date: "3 Mars 2025",
    },
    {
      id: "6",
      title: "Conduite de projet informatique",
      ecue: "Applications mathématiques",
      professor: "Mme Ando",
      room: "Grande Salle MISA",
      startTime: "09:00",
      endTime: "11:00",
      day: 2,
      type: "cours",
      ue: "INFO301",
      date: "3 Mars 2025",
    },
    {
      id: "7",
      title: "Probabilités et Statistiques",
      ecue: "",
      professor: "Mr Hanjarivo",
      room: "Grande Salle MISA",
      startTime: "08:00",
      endTime: "12:00",
      day: 5,
      type: "cours",
      ue: "INFO301",
      date: "3 Mars 2025",
    },
    {
      id: "8",
      title: "Gestion d'entreprise",
      ecue: "Anglais",
      professor: "Mr Dodier",
      room: "Sous sol MISA",
      startTime: "08:00",
      endTime: "10:00",
      day: 4,
      type: "cours",
      ue: "INFO301",
      date: "3 Mars 2025",
    },
    {
      id: "9",
      title: "Gestion d'entreprise",
      ecue: "Administration numérique",
      professor: "Mme Ando",
      room: "Sous sol MISA",
      startTime: "10:00",
      endTime: "12:00",
      day: 4,
      type: "cours",
      ue: "INFO301",
      date: "3 Mars 2025",
    },
    {
      id: "10",
      title: "Gestion d'entreprise",
      ecue: "Communication",
      professor: "Mr Anselme",
      room: "Grande Salle MISA",
      startTime: "10:00",
      endTime: "12:00",
      day: 1,
      type: "cours",
      ue: "INFO301",
      date: "3 Mars 2025",
    },
    {
      id: "11",
      title: "Base de données",
      ecue: "",
      professor: "Mr Haga/Mr Hasinarivo",
      room: "Grande Salle MISA",
      startTime: "13:00",
      endTime: "18:00",
      day: 1,
      type: "cours",
      ue: "INFO301",
      date: "3 Mars 2025",
    },
  ];

  const weekDays = [
    "Lundi",
    "Mardi",
    "Mercredi",
    "Jeudi",
    "Vendredi",
    "Samedi",
    "Dimanche",
  ];
  const timeSlots = [
    "08:00",
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center flex-wrap gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Emploi du temps</h2>
          <p className="text-muted-foreground">
            {userRole === "ADMIN" && "Vue d'ensemble des emplois du temps"}
            {userRole === "PROFESSOR" && "Votre emploi du temps personnel"}
            {userRole === "STUDENT" && "Votre emploi du temps de cours"}
          </p>
        </div>
        <TimeTableFilter userRole={userRole} />
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                {"Semestre en cours (S5)"}
              </CardTitle>
            </div>
          </div>
          <CardDescription>Planning des cours de la semaine</CardDescription>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <TimeTableInterface
            weekDays={weekDays}
            events={events}
            timeSlots={timeSlots}
            userRole={userRole}
          />
        </CardContent>
      </Card>
      {/* Legend */}
      <Legend />
    </div>
  );
}
