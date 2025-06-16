"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";

interface DashboardShellProps {
  children: React.ReactNode;
  className?: string;
  header?: React.ReactNode;
  title?: string;
  description?: string;
  actions?: React.ReactNode;
}

export function DashboardShell({
  children,
  className,
  header,
  title,
  description,
  actions,
}: DashboardShellProps) {
  return (
    <>
      {/* Header Area */}
      {(header || title || description || actions) && (
        <header className="flex h-16 shrink-0 items-center gap-2 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="flex items-center gap-2 px-4">
            <Separator orientation="vertical" className="mr-2 h-4" />
            {title && (
              <div className="flex flex-col">
                <h1 className="text-lg font-semibold">{title}</h1>
                {description && (
                  <p className="text-sm text-muted-foreground">{description}</p>
                )}
              </div>
            )}
            {header}
          </div>
          {actions && <div className="ml-auto px-4">{actions}</div>}
        </header>
      )}

      {/* Main Content Area */}
      <main
        className={cn(
          "flex-1 overflow-auto",
          "p-4 md:p-6 lg:p-8",
          "space-y-4 md:space-y-6",
          className
        )}
      >
        {children}
      </main>
    </>
  );
}

// Additional layout components for common patterns
interface DashboardPageProps {
  title: string;
  description?: string;
  actions?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export function DashboardPage({
  title,
  description,
  actions,
  children,
  className,
}: DashboardPageProps) {
  return (
    <DashboardShell
      title={title}
      description={description}
      actions={actions}
      className={className}
    >
      {children}
    </DashboardShell>
  );
}

// Container for dashboard content with consistent spacing
interface DashboardContainerProps {
  children: React.ReactNode;
  className?: string;
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "full";
}

export function DashboardContainer({
  children,
  className,
  maxWidth = "full",
}: DashboardContainerProps) {
  const maxWidthClasses = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
    "2xl": "max-w-2xl",
    full: "max-w-none",
  };

  return (
    <div className={cn("mx-auto w-full", maxWidthClasses[maxWidth], className)}>
      {children}
    </div>
  );
}

// Grid layout for dashboard cards/widgets
interface DashboardGridProps {
  children: React.ReactNode;
  className?: string;
  cols?: 1 | 2 | 3 | 4;
}

export function DashboardGrid({
  children,
  className,
  cols = 3,
}: DashboardGridProps) {
  const gridClasses = {
    1: "grid-cols-1",
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
  };

  return (
    <div className={cn("grid gap-4 md:gap-6", gridClasses[cols], className)}>
      {children}
    </div>
  );
}
