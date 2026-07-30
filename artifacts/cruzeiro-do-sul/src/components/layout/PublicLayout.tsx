import { ReactNode } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { FloatingWhatsApp } from "./FloatingWhatsApp";
import { BackToTop } from "./BackToTop";

export function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-[100dvh] flex flex-col bg-background selection:bg-primary/20">
      <Navbar />
      {/* navbar height: ~60px mobile / ~68px desktop */}
      <main className="flex-1 pt-[60px] sm:pt-[64px] lg:pt-[68px]">{children}</main>
      <Footer />
      <FloatingWhatsApp />
      <BackToTop />
    </div>
  );
}
