import { DashboardShell } from "@/components/app/shared/dashboard-shell";
import { AppSidebar } from "@/components/app/shared/sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main>
        <SidebarTrigger />
        <DashboardShell>{children}</DashboardShell>
      </main>
    </SidebarProvider>
  );
}
