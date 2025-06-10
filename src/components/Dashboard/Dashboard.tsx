"use client";
import { Button } from "@/src/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import {
  AlertCircle,
  BookOpen,
  Building2,
  Calendar,
  CheckCircle,
  Clock,
  Users,
} from "lucide-react";

import { Role } from "@/src/components/Auth/schema/signupSchema";
import { authClient } from "@/src/lib/auth-client";
import DialogAddProfessor from "../ProfessorManagement/DialogAddProfessor";
import DialogAddRoom from "../RoomsManagement/DialogAddRoom";

export function Dashboard() {
  const {
    data: session,
    isPending, //loading state
    error, //error object
  } = authClient.useSession();

  if (isPending) return <div>Loading....</div>;

  if (error) return <div>error</div>;

  const userRole = session?.user.role as Role;

  const stats = [
    {
      title: "Salles disponibles",
      value: "12",
      icon: Building2,
      color: "text-blue-600",
    },
    {
      title: "Professeurs actifs",
      value: "45",
      icon: Users,
      color: "text-green-600",
    },
    {
      title: "Unités d'enseignement",
      value: "28",
      icon: BookOpen,
      color: "text-purple-600",
    },
    {
      title: "Cours cette semaine",
      value: "156",
      icon: Calendar,
      color: "text-orange-600",
    },
  ];

  const recentActivities = [
    { action: "Nouveau cours ajouté", time: "Il y a 2h", status: "success" },
    { action: "Salle B101 réservée", time: "Il y a 3h", status: "info" },
    {
      action: "Conflit d'horaire détecté",
      time: "Il y a 5h",
      status: "warning",
    },
    { action: "Planning généré", time: "Il y a 1j", status: "success" },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "warning":
        return <AlertCircle className="h-4 w-4 text-yellow-600" />;
      default:
        return <Clock className="h-4 w-4 text-blue-600" />;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Tableau de bord</h2>
        <p className="text-muted-foreground">
          Vue d&apos;ensemble de votre système de gestion d&apos;emploi du temps
        </p>
      </div>

      {userRole === "ADMIN" && (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {stat.title}
                  </CardTitle>
                  <Icon className={`h-4 w-4 ${stat.color}`} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Activités récentes</CardTitle>
            <CardDescription>
              Les dernières actions effectuées dans le système
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-center space-x-3">
                  {getStatusIcon(activity.status)}
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium">{activity.action}</p>
                    <p className="text-xs text-muted-foreground">
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Actions rapides</CardTitle>
            <CardDescription>
              Accès rapide aux fonctionnalités principales
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {userRole === "ADMIN" && (
              <>
                <DialogAddRoom className="w-full justify-start" />
                <DialogAddProfessor className="w-full justify-start" />
                <Button className="w-full justify-start" variant="outline">
                  <Calendar className="mr-2 h-4 w-4" />
                  Générer l&apos;emploi du temps
                </Button>
              </>
            )}
            {userRole === "PROFESSOR" && (
              <>
                <Button className="w-full justify-start" variant="outline">
                  <Clock className="mr-2 h-4 w-4" />
                  Définir mes disponibilités
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Calendar className="mr-2 h-4 w-4" />
                  Voir mon emploi du temps
                </Button>
              </>
            )}
            {userRole === "STUDENT" && (
              <Button className="w-full justify-start" variant="outline">
                <Calendar className="mr-2 h-4 w-4" />
                Voir mon emploi du temps
              </Button>
            )}
          </CardContent>
        </Card>
      </div>

      {(userRole === "PROFESSOR" || userRole === "STUDENT") && (
        <Card>
          <CardHeader>
            <CardTitle>Mon emploi du temps de la semaine</CardTitle>
            <CardDescription>
              Aperçu de vos cours pour cette semaine
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8 text-muted-foreground">
              <Calendar className="mx-auto h-12 w-12 mb-4" />
              <p>Votre emploi du temps s&apos;affichera ici</p>
              <Button className="mt-4" variant="outline">
                Voir l&apos;emploi du temps complet
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
