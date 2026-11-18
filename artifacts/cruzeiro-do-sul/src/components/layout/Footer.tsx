import { Link } from "wouter";
import { Lock } from "lucide-react";
import { useListSettings } from "@workspace/api-client-react";

export function Footer() {
  const { data: settings } = useListSettings();
  const getSetting = (key: string) =>
    (Array.isArray(settings) ? settings.find((s) => s.key === key)?.value : "") || "";

  const address = getSetting("address") || "Rua Barbacena, 101 B (antigo 75)\nJd. Bom Clima — Guarulhos, SP";
  const phone = getSetting("phone") || "(11) 94944-6881";
  const email = getSetting("email") || "fraternidadecruzeirodosulguaru@gmail.com";
  const facebook = getSetting("facebook") || "https://facebook.com/ApometriaGuarulhos";

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="mx-auto max-w-[1400px] px-5 py-16 md:py-20 md:px-10">
        
        {/* Large Signature Headline */}
        <h2 className="font-serif font-semibold text-3xl sm:text-4xl md:text-6xl leading-[1.08] text-white">
          Servir é o caminho.<br />
          Curar é merecimento.
        </h2>

        {/* 4-Column Grid */}
        <div className="mt-12 md:mt-16 grid gap-10 border-t border-primary-foreground/20 pt-10 sm:grid-cols-2 md:grid-cols-4">
          
          {/* Sede */}
          <div className="min-w-0">
            <p className="eyebrow opacity-60">Sede</p>
            <p className="mt-3 text-sm opacity-90 leading-relaxed whitespace-pre-line">
              {address}
            </p>
          </div>

          {/* Contato */}
          <div className="min-w-0">
            <p className="eyebrow opacity-60">Contato</p>
            <p className="mt-3 text-sm opacity-90 font-medium">
              <a href={`tel:${phone.replace(/\D/g, "")}`} className="hover:underline">
                {phone}
              </a>
            </p>
            <p className="mt-1 text-xs opacity-75">
              Atendimentos às segundas-feiras, às 19h
            </p>
          </div>

          {/* Navegação */}
          <div>
            <p className="eyebrow opacity-60">Navegação</p>
            <div className="mt-3 flex flex-col gap-1 text-sm opacity-90">
              <Link href="/" className="py-1 hover:underline hover:text-white transition-colors">Início</Link>
              <Link href="/a-fraternidade" className="py-1 hover:underline hover:text-white transition-colors">A Fraternidade</Link>
              <Link href="/apometria" className="py-1 hover:underline hover:text-white transition-colors">Apometria</Link>
              <Link href="/atendimento" className="py-1 hover:underline hover:text-white transition-colors font-semibold">Atendimento</Link>
              <Link href="/cursos" className="py-1 hover:underline hover:text-white transition-colors">Cursos</Link>
              <Link href="/depoimentos" className="py-1 hover:underline hover:text-white transition-colors">Depoimentos</Link>
              <Link href="/blog" className="py-1 hover:underline hover:text-white transition-colors">Blog</Link>
              <Link href="/biblioteca" className="py-1 hover:underline hover:text-white transition-colors">Biblioteca</Link>
              <Link href="/galeria" className="py-1 hover:underline hover:text-white transition-colors">Galeria</Link>
              <Link href="/faq" className="py-1 hover:underline hover:text-white transition-colors">FAQ</Link>
              <Link href="/contato" className="py-1 hover:underline hover:text-white transition-colors">Contato</Link>
              <Link href="/admin/login" className="mt-2 py-1 text-[11px] uppercase tracking-widest opacity-60 hover:opacity-100 hover:underline transition-opacity">
                Área Administrativa
              </Link>
            </div>
          </div>

          {/* Comunidade */}
          <div>
            <p className="eyebrow opacity-60">Comunidade</p>
            <p className="mt-3 text-sm opacity-90 break-words">
              <a href={facebook.startsWith("http") ? facebook : `https://${facebook}`} target="_blank" rel="noopener noreferrer" className="hover:underline">
                facebook.com/ApometriaGuarulhos
              </a>
            </p>
            <p className="mt-2 text-sm opacity-90 break-all">
              <a href={`mailto:${email}`} className="hover:underline">
                {email}
              </a>
            </p>
          </div>

        </div>

        {/* Email Divider Banner */}
        <div className="mt-12 w-full">
          <div className="h-[1px] w-full bg-primary-foreground/20"></div>
          <div className="py-6 text-center">
            <p className="text-xs sm:text-sm font-medium tracking-wide opacity-90">
              {email}
            </p>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Admin Lock */}
        <div className="mt-8 pt-6 border-t border-primary-foreground/15 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-sans">
          <p className="eyebrow opacity-60 text-[10px] leading-relaxed text-center sm:text-left">
            &copy; {new Date().getFullYear()} <strong>FRATERNIDADE CRUZEIRO DO SUL DE APOMETRIA DE GUARULHOS</strong> — trabalho voluntário e gratuito
          </p>
          <Link
            href="/admin/login"
            className="inline-flex items-center gap-1.5 opacity-60 hover:opacity-100 text-white transition-opacity py-1.5 px-3 rounded-xs bg-white/5 hover:bg-white/10 text-[11px] font-semibold uppercase tracking-wider shrink-0"
            title="Acesso Administrativo"
          >
            <Lock size={13} />
            <span>Área Administrativa</span>
          </Link>
        </div>

      </div>
    </footer>
  );
}
