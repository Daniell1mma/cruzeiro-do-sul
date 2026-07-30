import { Redirect } from "wouter";
import { useAuth } from "@/contexts/AuthContext";
import { ComponentType } from "react";

interface ProtectedRouteProps {
  component: ComponentType;
}

export function ProtectedRoute({ component: Component }: ProtectedRouteProps) {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/30">
        <div className="w-8 h-8 rounded-full border-4 border-primary border-t-transparent animate-spin" />
      </div>
    );
  }

  if (!user) {
    return <Redirect to="/admin/login" />;
  }

  return <Component />;
}
