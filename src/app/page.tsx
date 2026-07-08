import { Hero }      from "@/components/sections/hero";
import { About }     from "@/components/sections/about";
import { Expertise } from "@/components/sections/expertise";
import { Projects }  from "@/components/sections/projects";

/**
 * Home page — Phase 5.
 * Hero → About → Expertise → Projects
 * Later phases append Experience, Contact below.
 */
export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Expertise />
      <Projects />
    </main>
  );
}
