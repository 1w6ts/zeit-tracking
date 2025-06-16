"use client";

import * as React from "react";
import { LogOut, Settings, User, ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { authClient } from "@/lib/auth-client";

interface SidebarUserButtonProps {
  className?: string;
}

export function SidebarUserButton({ className }: SidebarUserButtonProps) {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const user = session?.user;

  const initials = React.useMemo(() => {
    if (!user?.name) return "U";
    return user.name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  }, [user?.name]);

  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/signin");
        },
      },
    });
  };

  // Don't render if session is loading or user is not authenticated
  if (isPending || !user) {
    return (
      <div className={cn("flex items-center space-x-3 p-2", className)}>
        <div className="h-8 w-8 rounded-full bg-muted animate-pulse" />
        <div className="flex-1 space-y-1">
          <div className="h-3 bg-muted rounded animate-pulse" />
          <div className="h-2 bg-muted rounded w-2/3 animate-pulse" />
        </div>
      </div>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className={cn(
            "w-full justify-start space-x-3 p-2 h-auto",
            "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
            className
          )}
        >
          <div className="relative">
            <Avatar className="h-8 w-8">
              <AvatarImage src={user?.image || ""} alt={user?.name || "User"} />
              <AvatarFallback className="text-xs">{initials}</AvatarFallback>
            </Avatar>
            {/* Online status indicator */}
            <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-sidebar bg-green-500" />
          </div>
          <div className="flex-1 text-left min-w-0">
            <div className="text-sm font-medium truncate">
              {user?.name || "User"}
            </div>
            <div className="text-xs text-muted-foreground truncate">
              {user?.email || "user@example.com"}
            </div>
          </div>
          <ChevronDown className="h-4 w-4 text-muted-foreground shrink-0" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-56">
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {user?.name || "User"}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {user?.email || "user@example.com"}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <User className="mr-2 h-4 w-4" />
          <span>Profile</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Settings className="mr-2 h-4 w-4" />
          <span>Settings</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleSignOut}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
