import { Hero }      from "@/components/sections/hero";
import { About }     from "@/components/sections/about";
import { Expertise } from "@/components/sections/expertise";

/**
 * Home page — Phase 4.
 * Hero (Phase 3) + About + Expertise (Phase 4) are mounted here.
 * Later phases append additional sections below in order.
 */
export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Expertise />
    </main>
  );
}
