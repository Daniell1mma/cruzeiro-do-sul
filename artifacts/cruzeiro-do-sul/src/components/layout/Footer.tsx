import { Link } from "wouter";
import { Mail, MapPin, Phone, Instagram, Facebook } from "lucide-react";
import { useListSettings } from "@workspace/api-client-react";

export function Footer() {
  const { data: settings } = useListSettings();
  const getSetting = (key: string) => settings?.find(s => s.key === key)?.value || "";

  const address  = getSetting("address")   || "R. Barbacena, 75 - Jardim Bom Clima, Guarulhos/SP";
  const email    = getSetting("email")     || "contato@cruzeirodosul.org";
  const phone    = getSetting("phone")     || "(11) 99999-9999";
  const instagram = getSetting("instagram") || "#";
  const facebook  = getSetting("facebook")  || "#";

  return (
    <footer className="bg-primary text-primary-foreground pt-12 md:pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 mb-10 md:mb-12">

          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1 space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-9 h-9 bg-white rounded-full flex items-center justify-center text-primary font-serif font-bold text-lg">
                F
              </div>
              <div className="flex flex-col">
                <span className="font-serif font-bold text-white leading-none text-base">Cruzeiro do Sul</span>
                <span className="text-[10px] text-white/80 uppercase tracking-widest">Fraternidade</span>
              </div>
            </div>
            <p className="text-primary-foreground/80 text-sm leading-relaxed">
              Um espaço de paz, acolhimento e cura espiritual através da Apometria.
            </p>
            <div className="flex items-center gap-4 pt-1">
              <a href={instagram} target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
                aria-label="Instagram">
                <Instagram size={18} />
              </a>
              <a href={facebook} target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
                aria-label="Facebook">
                <Facebook size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-serif font-bold text-base mb-5 relative inline-block">
              Links Rápidos
              <span className="absolute -bottom-1.5 left-0 w-10 h-0.5 bg-secondary rounded-full"></span>
            </h3>
            <ul className="space-y-2.5 text-sm text-primary-foreground/80">
              <li><Link href="/"               className="hover:text-white transition-colors">Início</Link></li>
              <li><Link href="/a-fraternidade" className="hover:text-white transition-colors">A Fraternidade</Link></li>
              <li><Link href="/apometria"      className="hover:text-white transition-colors">A Apometria</Link></li>
              <li><Link href="/cursos"         className="hover:text-white transition-colors">Nossos Cursos</Link></li>
              <li><Link href="/atendimento"    className="hover:text-white transition-colors">Atendimento</Link></li>
            </ul>
          </div>

          {/* Content */}
          <div>
            <h3 className="font-serif font-bold text-base mb-5 relative inline-block">
              Conteúdo
              <span className="absolute -bottom-1.5 left-0 w-10 h-0.5 bg-secondary rounded-full"></span>
            </h3>
            <ul className="space-y-2.5 text-sm text-primary-foreground/80">
              <li><Link href="/blog"      className="hover:text-white transition-colors">Blog</Link></li>
              <li><Link href="/biblioteca" className="hover:text-white transition-colors">Biblioteca</Link></li>
              <li><Link href="/galeria"   className="hover:text-white transition-colors">Galeria de Fotos</Link></li>
              <li><Link href="/faq"       className="hover:text-white transition-colors">Dúvidas Frequentes</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-serif font-bold text-base mb-5 relative inline-block">
              Contato
              <span className="absolute -bottom-1.5 left-0 w-10 h-0.5 bg-secondary rounded-full"></span>
            </h3>
            <ul className="space-y-3.5 text-sm text-primary-foreground/80">
              <li className="flex items-start gap-2.5">
                <MapPin size={16} className="shrink-0 mt-0.5 text-secondary" />
                <span>{address}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone size={16} className="shrink-0 text-secondary" />
                <span>{phone}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail size={16} className="shrink-0 text-secondary" />
                <span className="break-all">{email}</span>
              </li>
            </ul>
          </div>

        </div>

        <div className="border-t border-white/10 pt-6 mt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-primary-foreground/60">
          <p className="text-center sm:text-left">&copy; {new Date().getFullYear()} Fraternidade Cruzeiro do Sul. Todos os direitos reservados.</p>
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
            <Link href="/privacidade" className="hover:text-white transition-colors">Privacidade</Link>
            <Link href="/termos"      className="hover:text-white transition-colors">Termos de Uso</Link>
            <Link href="/admin"       className="hover:text-white transition-colors">Acesso Restrito</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
