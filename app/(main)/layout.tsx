"use client";
import { Role } from "@/src/components/Auth/schema/signupSchema";
import { Header } from "@/src/components/utils/Header";
import { Sidebar } from "@/src/components/utils/Sidebar";
import { authClient } from "@/src/lib/auth-client";
import { useState } from "react";

export default function Home({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const {
    data: session,
    isPending, //loading state
    error, //error object
  } = authClient.useSession();

  if (isPending) return <div>Loading....</div>;

  if (error) return <div>error</div>;

  const userRole = session?.user.role as Role;  
  
  return (
    <div className="flex h-screen bg-background">
      <Sidebar
        userRole={userRole}
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header
          Role={userRole}
          toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        />
        <main className="flex-1 overflow-auto p-6">{children}</main>
      </div>
    </div>
  );
}
