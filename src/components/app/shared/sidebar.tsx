import { Calendar, Home, StickyNote, Users, Settings } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { Badge } from "@/components/ui/badge";
import Logo from "@/components/brand/logo";

// Main navigation items
const mainNavItems = [
  {
    title: "Home",
    url: "/dashboard",
    icon: Home,
    isActive: true,
  },
  {
    title: "Approvals",
    url: "/dashboard/approvals",
    icon: StickyNote,
    badge: 3,
  },
  {
    title: "Projects",
    url: "/dashboard/projects",
    icon: Calendar,
    badge: 12,
  },
];

// Team & collaboration items
const teamNavItems = [
  {
    title: "Team",
    url: "/dashboard/team",
    icon: Users,
    badge: 8,
  },
];

// System items
const systemNavItems = [
  {
    title: "Settings",
    url: "/dashboard/settings",
    icon: Settings,
  },
];

export function AppSidebar() {
  return (
    <Sidebar className="border-r overflow-hidden">
      <SidebarHeader className="border-b border-sidebar-border/50">
        <div className="flex items-center space-x-3 px-4 py-3 min-w-0">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 shrink-0">
            <Logo className="h-6 w-6 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-semibold text-sidebar-foreground truncate">
              ZEIT
            </div>
            <div className="text-xs text-muted-foreground truncate">
              Time Tracking
            </div>
          </div>
          <Badge
            variant="secondary"
            className="text-[10px] px-2 py-0.5 shrink-0"
          >
            Beta
          </Badge>
        </div>
      </SidebarHeader>

      <SidebarContent className="gap-0 overflow-hidden">
        {/* Main Navigation */}
        <SidebarGroup className="px-3 py-4">
          <SidebarGroupLabel className="px-2 text-xs font-medium text-muted-foreground/80 mb-2 truncate">
            Dashboard
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {mainNavItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={item.isActive}
                    className="px-3 py-2.5 rounded-lg transition-all duration-200 w-full"
                  >
                    <a
                      href={item.url}
                      className="flex items-center justify-between w-full min-w-0"
                    >
                      <div className="flex items-center gap-3 min-w-0 flex-1">
                        <item.icon className="h-4 w-4 shrink-0" />
                        <span className="font-medium truncate">
                          {item.title}
                        </span>
                      </div>
                      {item.badge && (
                        <Badge
                          variant="secondary"
                          className="h-5 min-w-5 text-[10px] px-1.5 shrink-0 ml-2"
                        >
                          {item.badge}
                        </Badge>
                      )}
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator className="mx-3" />

        {/* Team Navigation */}
        <SidebarGroup className="px-3 py-4">
          <SidebarGroupLabel className="px-2 text-xs font-medium text-muted-foreground/80 mb-2 truncate">
            Collaboration
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {teamNavItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className="px-3 py-2.5 rounded-lg transition-all duration-200 w-full"
                  >
                    <a
                      href={item.url}
                      className="flex items-center justify-between w-full min-w-0"
                    >
                      <div className="flex items-center gap-3 min-w-0 flex-1">
                        <item.icon className="h-4 w-4 shrink-0" />
                        <span className="font-medium truncate">
                          {item.title}
                        </span>
                      </div>
                      {item.badge && (
                        <Badge
                          variant="secondary"
                          className="h-5 min-w-5 text-[10px] px-1.5 shrink-0 ml-2"
                        >
                          {item.badge}
                        </Badge>
                      )}
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <div className="flex-1" />

        <SidebarSeparator className="mx-3" />

        {/* System Navigation */}
        <SidebarGroup className="px-3 py-4">
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {systemNavItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className="px-3 py-2.5 rounded-lg transition-all duration-200 w-full"
                  >
                    <a
                      href={item.url}
                      className="flex items-center gap-3 w-full min-w-0"
                    >
                      <item.icon className="h-4 w-4 shrink-0" />
                      <span className="font-medium truncate">{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border/50 p-3">
        <h1>User button later.</h1>
      </SidebarFooter>
    </Sidebar>
  );
}
