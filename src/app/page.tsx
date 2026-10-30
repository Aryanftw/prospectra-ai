import { Hero } from "@/components/hero";
import { Workflow } from "@/components/workflow";
import { ProductPreview } from "@/components/product-preview";
import { EvidenceSection } from "@/components/evidence-section";
import { OutreachSection } from "@/components/outreach-section";
import { CtaSection } from "@/components/cta-section";

export default function Home() {
  return (
    <main>
      <Hero />
      <Workflow />
      <ProductPreview />
      <EvidenceSection />
      <OutreachSection />
      <CtaSection />
    </main>
  );
}
