import { Link } from "wouter";
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
        <h2 className="font-serif text-3xl sm:text-4xl md:text-6xl leading-[1.08] text-white">
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
            <div className="mt-3 flex flex-col gap-2 text-sm opacity-90">
              <Link href="/" className="hover:underline">Início</Link>
              <Link href="/a-fraternidade" className="hover:underline">A Fraternidade</Link>
              <Link href="/apometria" className="hover:underline">Apometria</Link>
              <Link href="/atendimento" className="hover:underline font-semibold">Atendimento</Link>
              <Link href="/cursos" className="hover:underline">Cursos</Link>
              <Link href="/blog" className="hover:underline">Blog</Link>
              <Link href="/biblioteca" className="hover:underline">Biblioteca</Link>
              <Link href="/galeria" className="hover:underline">Galeria</Link>
              <Link href="/faq" className="hover:underline">FAQ</Link>
              <Link href="/contato" className="hover:underline">Contato</Link>
              <Link href="/admin/login" className="mt-2 text-[10px] uppercase tracking-widest opacity-40 hover:opacity-100 transition-opacity">
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

        {/* Copyright */}
        <p className="eyebrow mt-6 opacity-60 text-[10px] leading-relaxed">
          &copy; {new Date().getFullYear()} <strong>FRATERNIDADE CRUZEIRO DO SUL DE APOMETRIA DE GUARULHOS</strong> — trabalho voluntário e gratuito
        </p>

      </div>
    </footer>
  );
}
