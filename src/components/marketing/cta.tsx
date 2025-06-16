import { Button } from "@/components/ui/button";
import { Lock, Eye, Users, ArrowRight, LucideIcon } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface CTACardProps {
  children: ReactNode;
  className?: string;
}

interface BenefitItem {
  icon: LucideIcon | typeof FaGithub;
  title: string;
  description: string;
  color: {
    bg: string;
    icon: string;
  };
}

const CTACard = ({ children, className }: CTACardProps) => (
  <div
    className={cn(
      "group relative border-border/50 bg-card/20 backdrop-blur-sm border",
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

const BenefitCard = ({ benefit }: { benefit: BenefitItem }) => {
  const IconComponent = benefit.icon;

  return (
    <CTACard>
      <div className="p-6 text-center">
        <div
          className={cn(
            "w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4",
            benefit.color.bg
          )}
        >
          <IconComponent className={cn("w-6 h-6", benefit.color.icon)} />
        </div>
        <h3 className="font-semibold mb-2">{benefit.title}</h3>
        <p className="text-sm text-muted-foreground">{benefit.description}</p>
      </div>
    </CTACard>
  );
};

const CTASection = () => (
  <CTACard className="p-8 lg:col-span-3">
    <div className="text-center max-w-md mx-auto space-y-6">
      <div>
        <h3 className="text-xl font-semibold mb-2">
          Ready to explore the code?
        </h3>
        <p className="text-muted-foreground">
          Join our community, contribute to the project, or simply browse the
          source code.
        </p>
      </div>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Button asChild className="font-medium">
          <Link
            href="https://github.com/zeitgg/zeit"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub className="w-4 h-4 mr-2" />
            View on GitHub
            <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </Button>
      </div>
    </div>
  </CTACard>
);

const BENEFITS: BenefitItem[] = [
  {
    icon: Eye,
    title: "Build Trust",
    description:
      "No lock-in, fully inspectable code. See exactly how your data is handled and processed.",
    color: {
      bg: "bg-green-100 dark:bg-green-900/20",
      icon: "text-green-600",
    },
  },
  {
    icon: Users,
    title: "Community Driven",
    description:
      "Benefit from community contributions, feedback, and continuous improvements from developers worldwide.",
    color: {
      bg: "bg-blue-100 dark:bg-blue-900/20",
      icon: "text-blue-600",
    },
  },
  {
    icon: FaGithub,
    title: "Always Accessible",
    description:
      "Fork, modify, or contribute. The source code is always available on GitHub for maximum flexibility.",
    color: {
      bg: "bg-purple-100 dark:bg-purple-900/20",
      icon: "text-purple-600",
    },
  },
];

const SECTION_CONFIG = {
  title: "Why Open Source?",
  subtitle:
    "Transparency, trust, and community-driven development at the core of ZEIT",
};

export function CTA() {
  return (
    <section className="bg-muted/30 py-16 md:py-24">
      <div className="mx-auto max-w-2xl px-6 lg:max-w-5xl">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-primary/10">
              <Lock className="w-5 h-5 text-primary transform rotate-12" />
            </div>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
              {SECTION_CONFIG.title}
            </h2>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {SECTION_CONFIG.subtitle}
          </p>
        </div>

        <div className="mx-auto grid gap-6 lg:grid-cols-3 mb-12">
          {BENEFITS.map((benefit, index) => (
            <BenefitCard key={index} benefit={benefit} />
          ))}
        </div>

        <CTASection />
      </div>
    </section>
  );
}
