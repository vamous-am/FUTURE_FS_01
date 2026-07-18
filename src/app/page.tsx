import { Hero }              from "@/components/sections/hero";
import { Projects }          from "@/components/sections/projects";
import { About }             from "@/components/sections/about";
import { Expertise }         from "@/components/sections/expertise";
import { ExperienceSection } from "@/components/sections/experience-section";
import { Contact }           from "@/components/sections/contact";
import { Footer }            from "@/components/layout/footer";

export default function Home() {
  return (
    <main>
      <Hero />
      <Projects />
      <About />
      <Expertise />
      <ExperienceSection />
      <Contact />
      <Footer />
    </main>
  );
}
