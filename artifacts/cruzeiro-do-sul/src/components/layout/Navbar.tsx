import { Link, useLocation } from "wouter";
import { useState, useEffect } from "react";
import { Menu, X, ChevronRight, Lock } from "lucide-react";

const navLinks = [
  { name: "Início", path: "/" },
  { name: "A Fraternidade", path: "/a-fraternidade" },
  { name: "Apometria", path: "/apometria" },
  { name: "Cursos", path: "/cursos" },
  { name: "Depoimentos", path: "/depoimentos" },
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
        <div className="relative bg-primary py-2 sm:py-2.5 px-3 sm:px-12 text-center flex items-center justify-center">
          <p className="w-full text-center text-[10px] sm:text-xs md:text-sm font-bold text-primary-foreground uppercase tracking-wider sm:tracking-widest italic px-7 sm:px-10 md:px-14 leading-tight">
            Atendimento 100% gratuito • Mediante agendamento prévio
          </p>
          <Link
            href="/admin/login"
            aria-label="Área Administrativa"
            title="Área Administrativa"
            className="absolute right-2 sm:right-4 md:right-6 inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-bold uppercase tracking-wider text-primary-foreground/80 hover:text-white transition-opacity p-1.5 min-w-[36px] min-h-[36px] justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded-xs"
          >
            <Lock size={13} />
            <span className="hidden md:inline">Admin</span>
          </Link>
        </div>

        {/* Main Navbar */}
        <div className="bg-background border-b border-border">
          <div className="mx-auto flex max-w-[1400px] items-center justify-between px-3 sm:px-4 py-3 sm:py-4 md:px-8">
            
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-2 sm:gap-3 font-serif text-xs sm:text-sm font-bold tracking-[0.1em] sm:tracking-[0.12em] uppercase leading-tight text-foreground hover:opacity-90 transition-opacity shrink-0"
            >
              <img
                src="/logo.webp"
                alt="Logo Fraternidade Cruzeiro do Sul"
                className="h-11 sm:h-14 md:h-16 w-auto object-contain"
                onError={(e) => {
                  const target = e.currentTarget as HTMLImageElement;
                  if (target.src.endsWith(".webp")) {
                    target.src = "/logo.png";
                  } else {
                    target.style.display = 'none';
                  }
                }}
              />
              <span className="flex flex-col text-[#07145C]">
                <span className="tracking-widest text-[11px] sm:text-xs md:text-sm font-bold">Fraternidade</span>
                <span className="text-[9px] sm:text-[11px] md:text-xs text-muted-foreground font-sans uppercase font-medium">Cruzeiro do Sul de</span>
                <span className="text-[10px] sm:text-xs md:text-sm font-bold">Apometria de Guarulhos</span>
              </span>
            </Link>

            {/* Desktop Nav Links */}
            <nav className="hidden xl:flex items-center h-full">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  className={`eyebrow flex items-center h-8 border-l border-border px-3 2xl:px-4 text-xs transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset ${
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
            <div className="hidden xl:flex items-center gap-3 shrink-0">
              <Link
                href="/atendimento"
                className="inline-flex items-center justify-center bg-primary hover:bg-primary/90 text-primary-foreground px-5 py-2.5 text-xs font-bold uppercase tracking-widest transition-all shadow-sm rounded-none active:scale-[0.98]"
              >
                Agendar Atendimento
              </Link>
            </div>

            {/* Mobile Toggle Button */}
            <button
              className="xl:hidden p-2.5 text-foreground rounded-lg hover:bg-muted active:scale-95 transition-all min-w-[44px] min-h-[44px] flex items-center justify-center"
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
          <div className="flex items-center gap-2.5">
            <img src="/logo.webp" alt="Logo" className="h-10 w-auto" onError={(e) => { (e.currentTarget as HTMLImageElement).src = "/logo.png"; }} />
            <div className="flex flex-col">
              <span className="font-serif font-bold text-primary text-sm leading-tight">
                Cruzeiro do Sul
              </span>
              <span className="text-[10px] text-muted-foreground uppercase font-sans">
                Apometria Guarulhos
              </span>
            </div>
          </div>
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors min-w-[40px] min-h-[40px] flex items-center justify-center"
            aria-label="Fechar menu"
          >
            <X size={20} />
          </button>
        </div>

        {/* Nav links */}
        <nav className="flex-1 overflow-y-auto py-2 divide-y divide-border/60">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              className={`flex items-center justify-between px-5 py-3.5 text-xs uppercase tracking-wider font-semibold transition-colors min-h-[46px] ${
                location === link.path
                  ? "text-primary bg-primary/10 font-bold"
                  : "text-foreground/80 hover:text-primary hover:bg-muted/50 active:bg-muted"
              }`}
            >
              {link.name}
              <ChevronRight size={15} className={location === link.path ? "text-primary" : "text-muted-foreground/40"} />
            </Link>
          ))}
        </nav>

        {/* Drawer Footer & Quick Info */}
        <div className="p-4 border-t border-border space-y-3 bg-muted/20">
          <Link
            href="/atendimento"
            className="w-full inline-flex items-center justify-center bg-primary hover:bg-primary/90 text-primary-foreground py-3.5 text-xs font-bold uppercase tracking-widest shadow transition-all active:scale-[0.98] min-h-[44px]"
          >
            Agendar Atendimento
          </Link>
          
          <div className="text-[11px] text-muted-foreground space-y-1 pt-1 px-1">
            <p className="font-medium text-foreground">Sede Luz e Expansão da Consciência</p>
            <p>Rua Barbacena, 101 B - Jd. Bom Clima, Guarulhos</p>
            <p>Segundas-feiras às 19h (com agendamento)</p>
          </div>

          <Link
            href="/admin/login"
            className="w-full inline-flex items-center justify-center gap-1.5 text-xs text-muted-foreground hover:text-primary py-2 uppercase tracking-wider font-semibold min-h-[36px]"
          >
            <Lock size={13} /> Área Administrativa
          </Link>
        </div>
      </aside>
    </>
  );
}
