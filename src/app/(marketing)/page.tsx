import { CTA } from "@/components/marketing/cta";
import { Features } from "@/components/marketing/features";
import HeroSection from "@/components/marketing/hero";

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <Features />
      <CTA />
    </div>
  );
}
