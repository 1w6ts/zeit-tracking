"use client";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Clock, Twitter, Linkedin } from "lucide-react";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { ReactNode } from "react";
import Logo from "../brand/logo";

interface FooterSection {
  title: string;
  links: FooterLink[];
}

interface FooterLink {
  label: string;
  href: string;
}

interface SocialLink {
  icon: ReactNode;
  label: string;
  href: string;
}

const LogoSection = () => (
  <div className="relative">
    <div className="flex items-center space-x-2 mb-4">
      <Logo className="h-8 w-8" />
      <span className="text-2xl font-bold tracking-tight">ZEIT</span>
    </div>
    <p className="text-muted-foreground max-w-sm">
      Open source time tracking for modern teams. Track time, analyze
      productivity, and stay compliant.
    </p>
  </div>
);

const FooterNavSection = ({ section }: { section: FooterSection }) => (
  <div>
    <h3 className="mb-4 text-lg font-semibold">{section.title}</h3>
    <nav className="space-y-2 text-sm">
      {section.links.map((link, index) => (
        <a
          key={index}
          href={link.href}
          className="block transition-colors hover:text-primary"
        >
          {link.label}
        </a>
      ))}
    </nav>
  </div>
);

const SocialSection = () => (
  <div className="relative">
    <h3 className="mb-4 text-lg font-semibold">Connect</h3>
    <div className="mb-6 flex space-x-4">
      {SOCIAL_LINKS.map((social, index) => (
        <TooltipProvider key={index}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="rounded-none shadow-none"
                asChild
              >
                <a href={social.href} target="_blank" rel="noopener noreferrer">
                  {social.icon}
                  <span className="sr-only">{social.label}</span>
                </a>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{social.label}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ))}
    </div>
    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
      <Clock className="h-4 w-4" />
      <span>Open Source Time Tracking</span>
    </div>
  </div>
);

const FOOTER_SECTIONS: FooterSection[] = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "#features" },
      { label: "Analytics", href: "#analytics" },
      { label: "API", href: "#api" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "#about" },
      { label: "Contact", href: "#contact" },
      { label: "Support", href: "#support" },
    ],
  },
];

const SOCIAL_LINKS: SocialLink[] = [
  {
    icon: <FaGithub className="h-4 w-4" />,
    label: "View on GitHub",
    href: "https://github.com/zeitgg/zeit",
  },
  {
    icon: <FaTwitter className="h-4 w-4" />,
    label: "Follow on Twitter",
    href: "https://x.com/zeitdotgg",
  },
  {
    icon: <FaLinkedin className="h-4 w-4" />,
    label: "Connect on LinkedIn",
    href: "https://linkedin.com/company/zeitgg",
  },
];

const LEGAL_LINKS = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
];

const COMPANY_INFO = {
  name: "ZEIT",
  tagline: "Open Source Time Tracking",
  description: "Professional time tracking for modern teams",
};

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t bg-background text-foreground transition-colors duration-300">
      <div className="container mx-auto px-4 py-12 md:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <LogoSection />

          {FOOTER_SECTIONS.map((section, index) => (
            <FooterNavSection key={index} section={section} />
          ))}

          <SocialSection />
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t pt-8 text-center md:flex-row">
          <p className="text-sm text-muted-foreground">
            © {currentYear} {COMPANY_INFO.name}. All rights reserved.
          </p>
          <nav className="flex gap-4 text-sm">
            {LEGAL_LINKS.map((link, index) => (
              <a
                key={index}
                href={link.href}
                className="transition-colors hover:text-primary"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
