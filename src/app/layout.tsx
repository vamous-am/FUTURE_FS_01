import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import { ThemeProvider } from "@/context/ThemeProvider";
import { Sidebar } from "@/components/layout/sidebar";
import { BottomBar } from "@/components/layout/bottom-bar";
import "./globals.css";

/*
 * next/font loads both typefaces at build time — zero layout shift, no external
 * network request in the browser. The CSS variable names must match the
 * --font-inter / --font-space-grotesk references in globals.css @theme block.
 */
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

/*
 * Base metadata — a placeholder for now.
 * Phase 8 (SEO pass) will expand this with Open Graph, Twitter card,
 * canonical URL, and a generated OG image. Keep it minimal here.
 */
export const metadata: Metadata = {
  title: {
    default: "Amanuel's portifolio — Full-Stack Developer | ECE Student",
    template: "%s | Amanuel Musa",
  },
  description:
    "Personal portfolio of Amanuel Musa, an Electrical & Computer Engineering student at AAiT and full-stack web developer.",
  // metadataBase is required for absolute OG URLs — set the real domain in Phase 8
  metadataBase: new URL("https://future-fs-01.vercel.app"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    /*
     * Both font CSS variables are added to <html> so they cascade to every
     * element. `antialiased` is a Tailwind utility (font-smoothing).
     * `h-full` on html + body ensures the layout can go full-viewport-height
     * without extra wrapper divs in each section.
     */
    <html
      lang="en"
      suppressHydrationWarning /* next-themes needs this to avoid hydration mismatch */
      className={`${inter.variable} ${spaceGrotesk.variable} h-full`}
    >
      <body className="h-full antialiased">
        {/*
         * ThemeProvider must wrap all content here in the Server Component tree.
         * It is a Client Component (marked "use client") so it can read/write
         * the theme cookie and toggle the `dark` class on <html>.
         */}
        <ThemeProvider>
          {/*
           * Global layout frame:
           *   - Sidebar is fixed on the left at lg:, contributes no flow width.
           *   - lg:pl-64 offsets the main content area by the sidebar width so
           *     content never slides under the sidebar.
           *   - BottomBar is fixed at the bottom on mobile; pb-16 keeps the
           *     last section clear of the bar.
           */}
          <Sidebar />
          <div className="lg:pl-64 pb-16 lg:pb-0">
            {children}
          </div>
          <BottomBar />
        </ThemeProvider>
      </body>
    </html>
  );
}
