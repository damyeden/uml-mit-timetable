// In your page.tsx file or create a wrapper component
import ResetPassword from "@/src/components/Auth/ResetPassword";
import { Suspense } from "react";

// Loading component for the suspense fallback
const ResetPasswordLoading = () => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-background/80 p-4">
    <div className="w-full max-w-md">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
        <p className="mt-4 text-muted-foreground">Loading...</p>
      </div>
    </div>
  </div>
);

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<ResetPasswordLoading />}>
      <ResetPassword />
    </Suspense>
  );
}
