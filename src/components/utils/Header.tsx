"use client";

import { Role } from "@/src/components/Auth/schema/signupSchema";
import { Avatar, AvatarFallback } from "@/src/components/ui/avatar";
import { Badge } from "@/src/components/ui/badge";
import { Button } from "@/src/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";
import { useToast } from "@/src/hooks/use-toast";
import { authClient } from "@/src/lib/auth-client";
import { LogOut, Menu, Settings, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface HeaderProps {
  Role: Role;
  toggleSidebar: () => void;
}

export function Header({ Role, toggleSidebar }: HeaderProps) {
  const [isSigningOut, setIsSigningOut] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleSignOut = async () => {
    setIsSigningOut(true);
    try {
      await authClient.signOut();
      toast({
        title: "Signed out successfully",
        description: "You have been signed out successfully.",
      });
      router.push("/login");
    } catch {
      toast({
        variant: "destructive",
        title: "error signing out",
        description: `there is a problem signing out`,
      });
    } finally {
      setIsSigningOut(false);
    }
  };

  const getRoleLabel = (role: Role) => {
    switch (role) {
      case "ADMIN":
        return "ADMIN";
      case "PROFESSOR":
        return "PROFESSOR";
      case "STUDENT":
        return "Étudiant";
    }
  };

  const getRoleColor = (role: Role) => {
    switch (role) {
      case "ADMIN":
        return "bg-red-100 text-red-800";
      case "PROFESSOR":
        return "bg-blue-100 text-blue-800";
      case "STUDENT":
        return "bg-green-100 text-green-800";
    }
  };

  return (
    <header className="h-16 border-b border-border bg-card px-6 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleSidebar}
          className="lg:hidden"
        >
          <Menu className="h-4 w-4" />
        </Button>
        <div className="flex items-center gap-3">
          <h1 className="text-xl font-semibold text-foreground">
            Gestion d&apos;Emploi du Temps
          </h1>
          <Badge className={getRoleColor(Role)}>{getRoleLabel(Role)}</Badge>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="relative h-8 w-8 rounded-full"
            >
              <Avatar className="h-8 w-8">
                <AvatarFallback>
                  <User className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              Paramètres
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleSignOut} disabled={isSigningOut}>
              {isSigningOut ? (
                <>Signing out...</>
              ) : (
                <>
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </>
              )}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
