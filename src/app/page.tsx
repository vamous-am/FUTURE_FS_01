import { Hero }              from "@/components/sections/hero";
import { About }             from "@/components/sections/about";
import { Projects }          from "@/components/sections/projects";
import { Expertise }         from "@/components/sections/expertise";
import { ExperienceSection } from "@/components/sections/experience-section";
import { Contact }           from "@/components/sections/contact";

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Projects />
      <Expertise />
      <ExperienceSection />
      <Contact />
    </main>
  );
}
