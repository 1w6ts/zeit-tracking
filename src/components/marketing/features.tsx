import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  Clock,
  BarChart3,
  LucideIcon,
  Shield,
  Users,
  Zap,
  FileCheck,
} from "lucide-react";
import { ReactNode } from "react";

interface FeatureCardProps {
  children: ReactNode;
  className?: string;
}

interface FeatureItem {
  icon: LucideIcon;
  title: string;
  description: string;
  preview: ReactNode;
  hasContentWrapper?: boolean;
}

interface ComplianceItem {
  label: string;
  icon: "shield" | "users" | "zap" | "file";
  status: "compliant" | "active" | "connected" | "enabled";
  className?: string;
}

const FeatureCard = ({ children, className }: FeatureCardProps) => (
  <div
    className={cn(
      "border-border/50 bg-card/20 group relative border backdrop-blur-sm",
      className
    )}
  >
    <CardDecorator />
    {children}
  </div>
);

const CardDecorator = () => (
  <>
    <span className="border-primary/30 absolute -left-px -top-px block size-2 border-l-2 border-t-2"></span>
    <span className="border-primary/30 absolute -right-px -top-px block size-2 border-r-2 border-t-2"></span>
    <span className="border-primary/30 absolute -bottom-px -left-px block size-2 border-b-2 border-l-2"></span>
    <span className="border-primary/30 absolute -bottom-px -right-px block size-2 border-b-2 border-r-2"></span>
  </>
);

const FeatureHeading = ({
  icon: Icon,
  title,
  description,
}: Omit<FeatureItem, "preview" | "hasContentWrapper">) => (
  <div className="p-6">
    <span className="text-muted-foreground flex items-center gap-2 text-sm font-medium">
      <Icon className="size-4" />
      {title}
    </span>
    <p className="mt-4 text-xl font-semibold leading-tight">{description}</p>
  </div>
);

const MainFeatureCard = ({ feature }: { feature: FeatureItem }) => (
  <FeatureCard>
    <CardHeader className="pb-3">
      <FeatureHeading {...feature} />
    </CardHeader>

    {feature.hasContentWrapper ? (
      <CardContent>
        <div className="relative mb-6 sm:mb-0">
          <div className="absolute -inset-6 [background:radial-gradient(50%_50%_at_75%_50%,transparent,hsl(var(--background))_100%)]"></div>
          <div className="flex aspect-[76/59] items-center justify-center p-4">
            {feature.preview}
          </div>
        </div>
      </CardContent>
    ) : (
      <div className="relative mb-6 border-t border-dashed sm:mb-0">
        <div className="absolute inset-0 [background:radial-gradient(125%_125%_at_50%_0%,transparent_40%,hsl(var(--muted))_80%,hsl(var(--background))_125%)]"></div>
        <div className="flex aspect-[76/59] items-center justify-center p-6">
          {feature.preview}
        </div>
      </div>
    )}
  </FeatureCard>
);

const TimeTrackingPreview = () => (
  <div className="bg-background/80 w-full max-w-sm space-y-3 rounded-lg border p-4 backdrop-blur-sm">
    <div className="flex items-center justify-between">
      <span className="text-sm font-medium">Current Task</span>
      <div className="flex items-center space-x-2">
        <div className="size-2 animate-pulse rounded-full bg-green-500"></div>
        <span className="font-mono text-lg">2:34:12</span>
      </div>
    </div>
    <div className="space-y-2">
      {TIME_ENTRIES.map((entry, index) => (
        <div key={index} className="flex items-center space-x-2">
          <div className={`size-2 ${entry.color} rounded-full`}></div>
          <span className="text-sm">{entry.project}</span>
          <span className="text-muted-foreground ml-auto text-xs">
            {entry.time}
          </span>
        </div>
      ))}
    </div>
  </div>
);

const AnalyticsPreview = () => (
  <div className="bg-background/80 w-full max-w-sm space-y-4 rounded-lg border p-4 backdrop-blur-sm">
    <div className="grid grid-cols-2 gap-4">
      {ANALYTICS_METRICS.map((metric, index) => (
        <div key={index} className="text-center">
          <div className="text-2xl font-bold">{metric.value}</div>
          <div className="text-muted-foreground text-xs">{metric.label}</div>
        </div>
      ))}
    </div>
    <div className="space-y-2">
      {PROGRESS_ITEMS.map((item, index) => (
        <div key={index}>
          <div className="flex items-center justify-between">
            <span className="text-xs">{item.category}</span>
            <span className="font-mono text-xs">{item.percentage}%</span>
          </div>
          <div className="bg-muted h-1.5 w-full rounded-full">
            <div
              className={`${item.color} h-1.5 rounded-full`}
              style={{ width: `${item.percentage}%` }}
            ></div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const ComplianceFeature = ({
  label,
  icon,
  status,
  className,
}: ComplianceItem) => {
  const IconComponent = COMPLIANCE_ICONS[icon];
  const statusColor = STATUS_COLORS[status];

  return (
    <div className={cn("flex flex-col items-center", className)}>
      <div className="from-border/50 rounded-2xl bg-gradient-to-b to-transparent p-px">
        <div className="from-background to-muted/25 relative flex aspect-square w-16 items-center justify-center rounded-[15px] bg-gradient-to-b p-4">
          <div className="relative">
            <IconComponent className="text-muted-foreground size-6" />
            <div
              className={cn(
                "border-background absolute -right-1 -top-1 size-3 rounded-full border-2",
                statusColor
              )}
            ></div>
          </div>
        </div>
      </div>
      <span className="text-muted-foreground mt-2 text-center text-xs font-medium">
        {label}
      </span>
    </div>
  );
};

const TIME_ENTRIES = [
  { project: "ZEIT Dashboard", color: "bg-blue-500", time: "45m" },
  { project: "Client Meeting", color: "bg-purple-500", time: "1h 30m" },
  { project: "Documentation", color: "bg-orange-500", time: "19m" },
];

const ANALYTICS_METRICS = [
  { value: "8.2h", label: "Daily Avg" },
  { value: "94%", label: "Efficiency" },
];

const PROGRESS_ITEMS = [
  { category: "Development", percentage: 65, color: "bg-blue-500" },
  { category: "Meetings", percentage: 25, color: "bg-green-500" },
  { category: "Admin", percentage: 10, color: "bg-orange-500" },
];

const COMPLIANCE_ICONS = {
  shield: Shield,
  users: Users,
  zap: Zap,
  file: FileCheck,
};

const STATUS_COLORS = {
  compliant: "bg-green-500",
  active: "bg-blue-500",
  connected: "bg-purple-500",
  enabled: "bg-orange-500",
};

const MAIN_FEATURES: FeatureItem[] = [
  {
    icon: Clock,
    title: "Smart Time Tracking",
    description:
      "Effortless time logging with automatic detection and intelligent project suggestions.",
    preview: <TimeTrackingPreview />,
    hasContentWrapper: false,
  },
  {
    icon: BarChart3,
    title: "Analytics & Insights",
    description:
      "Detailed reports and productivity insights to optimize your team's performance.",
    preview: <AnalyticsPreview />,
    hasContentWrapper: true,
  },
];

const COMPLIANCE_FEATURES: ComplianceItem[] = [
  { label: "GDPR Ready", icon: "shield", status: "compliant" },
  { label: "Team Management", icon: "users", status: "active" },
  { label: "API Integrations", icon: "zap", status: "connected" },
  {
    label: "Audit Trail",
    icon: "file",
    status: "enabled",
    className: "hidden sm:block",
  },
];

const SECTION_CONFIG = {
  title: "Everything you need for time tracking",
  subtitle:
    "Built for modern teams who need accurate time tracking without the complexity",
  complianceTitle:
    "Enterprise-grade compliance with automated reporting for legal requirements.",
};

export function Features() {
  return (
    <section className="bg-muted/30 py-16 md:py-24">
      <div className="mx-auto max-w-2xl px-6 lg:max-w-5xl">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-semibold tracking-tight md:text-4xl">
            {SECTION_CONFIG.title}
          </h2>
          <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
            {SECTION_CONFIG.subtitle}
          </p>
        </div>

        <div className="mx-auto grid gap-6 lg:grid-cols-2">
          {MAIN_FEATURES.map((feature, index) => (
            <MainFeatureCard key={index} feature={feature} />
          ))}

          <FeatureCard className="p-6 lg:col-span-2">
            <p className="mx-auto my-6 max-w-md text-balance text-center text-2xl font-semibold">
              {SECTION_CONFIG.complianceTitle}
            </p>

            <div className="flex justify-center gap-6 overflow-hidden">
              {COMPLIANCE_FEATURES.map((feature, index) => (
                <ComplianceFeature key={index} {...feature} />
              ))}
            </div>
          </FeatureCard>
        </div>
      </div>
    </section>
  );
}
