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
}

export function TimeTable({ userRole }: ScheduleViewerProps) {
  const events: ScheduleEvent[] = [
    {
      id: "1",
      title: "Programmation Orientée Objet",
      professor: "Dr. Marie Dubois",
      room: "Salle A101",
      startTime: "08:00",
      endTime: "10:00",
      day: 1,
      type: "cours",
      ue: "INFO301",
      date: "3 Mars 2025",
    },
    {
      id: "2",
      title: "TP Base de Données",
      professor: "Dr. Marie Dubois",
      room: "Salle B205",
      startTime: "10:15",
      endTime: "12:15",
      day: 1,
      type: "tp",
      ue: "INFO302",
      date: "3 Mars 2025",
    },
    {
      id: "3",
      title: "Analyse Mathématique",
      professor: "Prof. Jean Martin",
      room: "Amphithéâtre C",
      startTime: "14:00",
      endTime: "16:00",
      day: 2,
      type: "cours",
      ue: "MATH201",
      date: "4 Mars 2025",
    },
    {
      id: "4",
      title: "TD Mécanique",
      professor: "Dr. Sophie Laurent",
      room: "Salle A102",
      startTime: "08:00",
      endTime: "10:00",
      day: 3,
      type: "td",
      ue: "PHYS401",
      date: "5 Mars 2025",
    },
    {
      id: "5",
      title: "Programmation Web",
      professor: "Dr. Marie Dubois",
      room: "Salle B205",
      startTime: "14:00",
      endTime: "17:00",
      day: 4,
      type: "tp",
      ue: "INFO303",
      date: "6 Mars 2025",
    },
    {
      id: "6",
      title: "Algorithmique Avancée",
      professor: "Dr. Pierre Dupont",
      room: "Salle C103",
      startTime: "10:00",
      endTime: "12:00",
      day: 5,
      type: "cours",
      ue: "INFO304",
      date: "7 Mars 2025",
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

      {/* Legend */}
      <Legend />

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                {"Semaine du 3-9 Mars 2025"}
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
    </div>
  );
}
