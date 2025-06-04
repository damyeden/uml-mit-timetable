"use client";
import { Role } from "@/src/components/Auth/schema/signupSchema";
import { Dashboard } from "@/src/components/Dashboard/Dashboard";
import { ProfessorManagement } from "@/src/components/ProfessorManagement/ProfessorManagement";
import { RoomManagement } from "@/src/components/RoomsManagement/RoomManagement";
import { TimeTable } from "@/src/components/Timetable/Timetable";
import { UEManagement } from "@/src/components/UEManagement/UEManagement";
import { Header } from "@/src/components/utils/Header";
import { Sidebar } from "@/src/components/utils/Sidebar";
import { authClient } from "@/src/lib/auth-client";
import { useState } from "react";

export default function Home() {
  const [activeView, setActiveView] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const {
    data: session,
    isPending, //loading state
    error, //error object
  } = authClient.useSession();

  if (isPending) return <div>Loading....</div>;

  if (error) return <div>error</div>;

  const userRole = session?.user.role as Role;

  const renderContent = () => {
    switch (activeView) {
      case "dashboard":
        return <Dashboard userRole={userRole} />;
      case "rooms":
        return <RoomManagement />;
      case "professors":
        return <ProfessorManagement />;
      case "ue":
        return <UEManagement />;
      case "schedule":
        return <TimeTable userRole={userRole} />;
      case "availability":
        return <div>availability</div>;
      case "generator":
        return <div>generateur</div>;
      default:
        return <Dashboard userRole={userRole} />;
    }
  };

  return (
    <div className="flex h-screen bg-background">
      <Sidebar
        activeView={activeView}
        setActiveView={setActiveView}
        userRole={userRole}
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
      />
      {
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header
            Role={userRole}
            toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          />
          <main className="flex-1 overflow-auto p-6">{renderContent()}</main>
        </div>
      }
    </div>
  );
}
