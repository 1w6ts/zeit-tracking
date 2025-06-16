import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="container mx-auto px-4 pb-16 pt-20">
      <div className="mx-auto max-w-4xl">
        <div className="space-y-8 text-center">
          <div className="space-y-4">
            <h1 className="text-4xl font-medium leading-none tracking-tighter md:text-5xl lg:text-6xl">
              Time tracking that
              <br />
              <span className="from-primary via-primary/80 to-primary/60 bg-gradient-to-r bg-clip-text text-transparent">
                actually works
              </span>
            </h1>

            <p className="text-muted-foreground mx-auto max-w-2xl text-lg font-light leading-relaxed md:text-xl">
              Simple, compliant, and powerful time tracking for modern teams.
              Focus on what matters while we handle the rest.
            </p>
          </div>

          <div className="flex flex-col justify-center gap-3 sm:flex-row">
            <Button size="default" className="px-6 py-3 font-medium" asChild>
              <Link href="/signup">
                Start free trial
                <ArrowRight className="ml-2 size-4" />
              </Link>
            </Button>
            <Button
              size="default"
              variant="ghost"
              className="px-6 py-3 font-medium"
              asChild
            >
              <Link href="#demo">See how it works</Link>
            </Button>
          </div>
          <div className="pt-10">
            <p className="text-muted-foreground mb-4 text-xs font-light">
              Trusted by teams worldwide
            </p>
            <div className="flex flex-wrap items-center justify-center gap-8 opacity-30">
              {["Acme", "Buildco", "TechFlow", "DataCorp"].map((company) => (
                <div
                  key={company}
                  className="text-sm font-medium tracking-wider"
                >
                  {company}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
