import { Link, useLocation } from "wouter";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { name: "Início", path: "/" },
  { name: "Quem Somos", path: "/quem-somos" },
  { name: "Nossa História", path: "/nossa-historia" },
  { name: "Apometria", path: "/apometria" },
  { name: "Cursos", path: "/cursos" },
  { name: "Biblioteca", path: "/biblioteca" },
  { name: "Blog", path: "/blog" },
  { name: "Galeria", path: "/galeria" },
  { name: "FAQ", path: "/faq" },
  { name: "Contato", path: "/contato" },
];

export function Navbar() {
  const [location] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on path change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-sm py-3" : "bg-white/95 backdrop-blur-sm py-4"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            {/* Logo placeholder */}
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-serif font-bold text-xl">
              F
            </div>
            <div className="flex flex-col">
              <span className="font-serif font-bold text-primary leading-none text-lg">Cruzeiro do Sul</span>
              <span className="text-[10px] text-muted-foreground uppercase tracking-widest">Fraternidade</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-6">
            <ul className="flex items-center gap-5 text-sm font-medium text-foreground">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    href={link.path}
                    className={`transition-colors hover:text-primary ${
                      location === link.path ? "text-primary font-bold" : "text-foreground/80"
                    }`}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
            <Button asChild className="bg-secondary hover:bg-secondary/90 text-white rounded-full px-6">
              <Link href="/atendimento">Solicitar Atendimento</Link>
            </Button>
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden p-2 text-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-white border-t border-border shadow-lg animate-in slide-in-from-top-2">
          <nav className="flex flex-col p-4 max-h-[80vh] overflow-y-auto">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={`py-3 px-4 border-b border-border/50 text-sm font-medium ${
                  location === link.path ? "text-primary bg-primary/5" : "text-foreground"
                }`}
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-4 pb-2 px-4">
              <Button asChild className="w-full bg-secondary hover:bg-secondary/90 text-white rounded-full">
                <Link href="/atendimento">Solicitar Atendimento</Link>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
