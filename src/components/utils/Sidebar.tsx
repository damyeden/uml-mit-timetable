"use client";

import { Role } from "@/src/components/Auth/schema/signupSchema";
import { Button } from "@/src/components/ui/button";
import { ScrollArea } from "@/src/components/ui/scroll-area";
import { cn } from "@/src/lib/utils";
import {
  BookOpen,
  Building2,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Clock,
  Home,
  Users,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarProps {
  userRole: Role;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export function Sidebar({ userRole, isOpen, setIsOpen }: SidebarProps) {
  const pathname = usePathname();
  const activeView = pathname.split("/")[1] || "dashboard";

  const menuItems = [
    {
      id: "dashboard",
      label: "Tableau de bord",
      icon: Home,
      roles: ["ADMIN", "PROFESSOR", "STUDENT"],
    },
    {
      id: "faculty",
      label: "Faculty",
      icon: Home,
      roles: ["ADMIN"],
    },
    {
      id: "rooms",
      label: "Gestion des salles",
      icon: Building2,
      roles: ["ADMIN"],
    },
    {
      id: "professors",
      label: "Gestion des PROFESSORs",
      icon: Users,
      roles: ["ADMIN"],
    },
    {
      id: "ue",
      label: "Gestion des UE",
      icon: BookOpen,
      roles: ["ADMIN"],
    },
    {
      id: "schedule",
      label: "Emploi du temps",
      icon: Calendar,
      roles: ["ADMIN", "PROFESSOR", "STUDENT"],
    },
    {
      id: "availability",
      label: "Disponibilités",
      icon: Clock,
      roles: ["ADMIN", "PROFESSOR"],
    },
    { id: "generator", label: "Générateur", icon: Zap, roles: ["ADMIN"] },
  ];

  const filteredItems = menuItems.filter((item) =>
    item.roles.includes(userRole)
  );

  return (
    <div
      className={cn(
        "bg-card border-r border-border transition-all duration-300 ease-in-out",
        isOpen ? "w-64" : "w-16"
      )}
    >
      <div className="flex h-full flex-col">
        <div className="flex h-16 items-center justify-between px-4 border-b border-border">
          {isOpen && (
            <h2 className="text-lg font-semibold text-foreground">
              Emploi du Temps
            </h2>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsOpen(!isOpen)}
            className="ml-auto"
          >
            {isOpen ? (
              <ChevronLeft className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </Button>
        </div>

        <ScrollArea className="flex-1 px-3 py-4">
          <div className="space-y-2">
            {filteredItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link href={`/${item.id}`} key={item.id}>
                  <Button
                    variant={activeView === item.id ? "secondary" : "ghost"}
                    className={cn("w-full justify-start", !isOpen && "px-2")}
                  >
                    <Icon className="h-4 w-4" />
                    {isOpen && <span className="ml-3">{item.label}</span>}
                  </Button>
                </Link>
              );
            })}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
