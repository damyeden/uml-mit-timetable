// LayoutClient.tsx (Client)
"use client";
import { Role } from "@/src/components/Auth/schema/signupSchema";
import { Header } from "@/src/components/utils/Header";
import { Sidebar } from "@/src/components/utils/Sidebar";
import { useState } from "react";

interface LayoutClientProps {
  children: React.ReactNode;
  userRole: Role;
  mentionId: string;
}

export function LayoutClient({ 
  children, 
  userRole, 
  mentionId 
}: LayoutClientProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen bg-background">
      <Sidebar
        userRole={userRole}
        mentionId={mentionId}
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header
          Role={userRole}
          toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        />
        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}