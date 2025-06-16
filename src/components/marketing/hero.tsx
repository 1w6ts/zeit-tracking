import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="container mx-auto px-4 pt-20 pb-16">
      <div className="max-w-4xl mx-auto">
        <div className="text-center space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tighter leading-none">
              Time tracking that
              <br />
              <span className="bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
                actually works
              </span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto font-light leading-relaxed">
              Simple, compliant, and powerful time tracking for modern teams.
              Focus on what matters while we handle the rest.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button size="default" className="font-medium px-6 py-3" asChild>
              <Link href="/signup">
                Start free trial
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              size="default"
              variant="ghost"
              className="font-medium px-6 py-3"
              asChild
            >
              <Link href="#demo">See how it works</Link>
            </Button>
          </div>
          <div className="pt-10">
            <p className="text-xs text-muted-foreground font-light mb-4">
              Trusted by teams worldwide
            </p>
            <div className="flex flex-wrap justify-center items-center gap-8 opacity-30">
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
