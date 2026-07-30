import { Link, useLocation } from "wouter";
import { useState, useEffect } from "react";
import { Menu, X, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { name: "Início", path: "/" },
  { name: "A Fraternidade", path: "/a-fraternidade" },
  { name: "Apometria", path: "/apometria" },
  { name: "Cursos", path: "/cursos" },
  { name: "Blog", path: "/blog" },
  { name: "Biblioteca", path: "/biblioteca" },
  { name: "Galeria", path: "/galeria" },
  { name: "FAQ", path: "/faq" },
  { name: "Contato", path: "/contato" },
];

export function Navbar() {
  const [location] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileMenuOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-white shadow-md py-2" : "bg-white/97 backdrop-blur-sm py-3"
        }`}
      >
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center gap-4">

            {/* Logo — left */}
            <Link href="/" className="flex items-center gap-2 shrink-0">
              <div className="w-9 h-9 bg-primary rounded-full flex items-center justify-center text-white font-serif font-bold text-lg">
                F
              </div>
              <div className="flex flex-col">
                <span className="font-serif font-bold text-primary leading-none text-base sm:text-lg">Cruzeiro do Sul</span>
                <span className="text-[9px] text-muted-foreground uppercase tracking-widest hidden sm:block">Fraternidade</span>
              </div>
            </Link>

            {/* Desktop Nav — centered */}
            <nav className="hidden lg:flex flex-1 items-center justify-center">
              <ul className="flex items-center gap-1 xl:gap-1.5 text-[13px] font-medium">
                {navLinks.map((link) => (
                  <li key={link.path}>
                    <Link
                      href={link.path}
                      className={`px-2.5 py-1.5 rounded-lg transition-colors hover:text-primary hover:bg-primary/5 ${
                        location === link.path
                          ? "text-primary font-bold bg-primary/8"
                          : "text-foreground/75"
                      }`}
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* CTA — right */}
            <div className="hidden lg:flex items-center shrink-0 ml-auto">
              <Button asChild size="sm" className="bg-secondary hover:bg-secondary/90 text-white rounded-full px-5 text-[13px]">
                <Link href="/atendimento">Solicitar Atendimento</Link>
              </Button>
            </div>

            {/* Mobile Toggle */}
            <button
              className="lg:hidden ml-auto p-2 -mr-2 text-foreground rounded-lg hover:bg-muted transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Fechar menu" : "Abrir menu"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-300 ${
          mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setMobileMenuOpen(false)}
        aria-hidden="true"
      >
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
      </div>

      <aside
        className={`fixed top-0 right-0 h-full w-[min(320px,85vw)] z-50 lg:hidden bg-white shadow-2xl flex flex-col transition-transform duration-300 ease-in-out ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
        aria-label="Menu de navegação"
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-serif font-bold text-sm">F</div>
            <span className="font-serif font-bold text-primary text-base">Cruzeiro do Sul</span>
          </div>
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            aria-label="Fechar menu"
          >
            <X size={20} />
          </button>
        </div>

        {/* Nav links */}
        <nav className="flex-1 overflow-y-auto py-3">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              className={`flex items-center justify-between px-5 py-3.5 text-sm font-medium transition-colors ${
                location === link.path
                  ? "text-primary bg-primary/5 font-bold"
                  : "text-foreground hover:text-primary hover:bg-muted/60"
              }`}
            >
              {link.name}
              <ChevronRight size={15} className={location === link.path ? "text-primary" : "text-muted-foreground/50"} />
            </Link>
          ))}
        </nav>

        {/* CTA */}
        <div className="p-5 border-t border-border">
          <Button asChild className="w-full bg-secondary hover:bg-secondary/90 text-white rounded-full h-12 text-sm font-bold">
            <Link href="/atendimento">Solicitar Atendimento</Link>
          </Button>
        </div>
      </aside>
    </>
  );
}
