"use server";
import { Role } from "@/src/components/Auth/schema/signupSchema";
import { LayoutClient } from "@/src/components/utils/layoutClient";
import { getRequiredUser } from "@/src/lib/auth-session";

interface MentionLayoutProps {
  children: React.ReactNode;
  params: Promise<{ mentionId: string }>;
}

export default async function MentionLayout({
  children,
  params,
}: MentionLayoutProps) {
  const { mentionId } = await params;
  const user = await getRequiredUser();

  const userRole = user.role as Role;

  return (
    <LayoutClient userRole={userRole} mentionId={mentionId}>
      {children}
    </LayoutClient>
  );
}
