import { ReactNode } from "react";
import { AdminSidebar } from "./AdminSidebar";

export function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-muted/30">
      <AdminSidebar />
      <main className="flex-1 p-8 overflow-x-hidden">
        {children}
      </main>
    </div>
  );
}
