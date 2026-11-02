import { Link, useLocation } from "wouter";
import { useState, useEffect } from "react";
import { Menu, X, ChevronRight, Lock } from "lucide-react";

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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
      <header className="sticky top-0 z-50 shadow-sm bg-white">
        {/* Top Announcement Bar */}
        <div className="relative bg-primary py-2.5 px-6 sm:px-12 text-center flex items-center justify-center">
          <p className="text-xs md:text-sm font-bold text-primary-foreground uppercase tracking-widest italic pr-12 md:pr-0">
            Não oferecemos pronto-atendimento. É necessário agendamento prévio.
          </p>
          <Link
            href="/admin/login"
            aria-label="Área Administrativa"
            title="Área Administrativa"
            className="absolute right-3 md:right-6 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-primary-foreground/80 hover:text-white transition-opacity"
          >
            <Lock size={13} />
            <span className="hidden md:inline">Admin</span>
          </Link>
        </div>

        {/* Main Navbar */}
        <div className="bg-background border-b border-border">
          <div className="mx-auto flex max-w-[1400px] items-center justify-between px-4 py-4 md:px-8">
            
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-3 font-serif text-xs sm:text-sm font-bold tracking-[0.12em] uppercase leading-tight text-foreground hover:opacity-90 transition-opacity shrink-0"
            >
              <img
                src="/logo.png"
                alt="Logo Fraternidade Cruzeiro do Sul"
                className="h-14 sm:h-16 w-auto object-contain"
                onError={(e) => {
                  (e.currentTarget as HTMLElement).style.display = 'none';
                }}
              />
              <span className="flex flex-col text-[#07145C]">
                <span className="tracking-widest">Fraternidade</span>
                <span className="text-[11px] sm:text-xs text-muted-foreground font-sans uppercase font-medium">Cruzeiro do Sul de</span>
                <span className="text-xs sm:text-sm">Apometria de Guarulhos</span>
              </span>
            </Link>

            {/* Desktop Nav Links */}
            <nav className="hidden xl:flex items-center h-full">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  className={`eyebrow flex items-center h-8 border-l border-border px-3.5 2xl:px-4 text-[11px] transition-colors hover:text-primary ${
                    location === link.path
                      ? "text-primary font-bold bg-primary/5"
                      : "text-foreground/80"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center gap-3 shrink-0">
              <Link
                href="/atendimento"
                className="inline-flex items-center justify-center bg-primary hover:bg-primary/90 text-primary-foreground px-5 py-2.5 text-xs font-bold uppercase tracking-widest transition-all shadow-sm rounded-none"
              >
                Agendar Atendimento
              </Link>
            </div>

            {/* Mobile Toggle Button */}
            <button
              className="xl:hidden p-2 text-foreground rounded-lg hover:bg-muted transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Fechar menu" : "Abrir menu"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 xl:hidden transition-all duration-300 ${
          mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setMobileMenuOpen(false)}
        aria-hidden="true"
      >
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      </div>

      {/* Mobile Drawer */}
      <aside
        className={`fixed top-0 right-0 h-full w-[min(340px,88vw)] z-50 xl:hidden bg-white shadow-2xl flex flex-col transition-transform duration-300 ease-in-out ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
        aria-label="Menu de navegação"
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-border bg-muted/40">
          <div className="flex items-center gap-2">
            <img src="/logo.png" alt="Logo" className="h-10 w-auto" />
            <span className="font-serif font-bold text-primary text-sm leading-tight">
              Cruzeiro do Sul
            </span>
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
        <nav className="flex-1 overflow-y-auto py-3 divide-y divide-border/60">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              className={`flex items-center justify-between px-5 py-3.5 text-xs uppercase tracking-wider font-semibold transition-colors ${
                location === link.path
                  ? "text-primary bg-primary/10 font-bold"
                  : "text-foreground/80 hover:text-primary hover:bg-muted/50"
              }`}
            >
              {link.name}
              <ChevronRight size={15} className={location === link.path ? "text-primary" : "text-muted-foreground/40"} />
            </Link>
          ))}
        </nav>

        {/* CTA */}
        <div className="p-5 border-t border-border space-y-3 bg-muted/20">
          <Link
            href="/atendimento"
            className="w-full inline-flex items-center justify-center bg-primary hover:bg-primary/90 text-primary-foreground py-3.5 text-xs font-bold uppercase tracking-widest shadow transition-all"
          >
            Agendar Atendimento
          </Link>
          <Link
            href="/admin/login"
            className="w-full inline-flex items-center justify-center gap-1.5 text-xs text-muted-foreground hover:text-primary py-2 uppercase tracking-wider font-semibold"
          >
            <Lock size={13} /> Área Administrativa
          </Link>
        </div>
      </aside>
    </>
  );
}
