import { PublicLayout } from "@/components/layout/PublicLayout";
import { Link } from "wouter";
import { Star, Quote, HeartHandshake, ShieldCheck, MessageCircle, Sparkles, ArrowRight, Calendar } from "lucide-react";
import { useSeo } from "@/hooks/useSeo";
import { useListTestimonials } from "@workspace/api-client-react";

interface TestimonialItem {
  id: number | string;
  name: string;
  city?: string | null;
  text: string;
  date?: string;
  verified?: boolean;
}

const HISTORICAL_TESTIMONIALS: TestimonialItem[] = [
  {
    id: 1,
    name: "Mariana S.",
    city: "Guarulhos / SP",
    text: "Cheguei à Fraternidade com muita angústia e dores inexplicáveis. O acolhimento fraterno e a sessão de apometria trouxeram uma paz de espírito que eu não sentia há anos.",
    date: "Assistida presencial",
    verified: true,
  },
  {
    id: 2,
    name: "Carlos Eduardo M.",
    city: "São Paulo / SP",
    text: "Ambiente de imenso respeito, disciplina e amor. A seriedade dos operadores e o respeito à ética do Evangelho me impressionaram profundamente. Gratidão infinita.",
    date: "Frequentador",
    verified: true,
  },
  {
    id: 3,
    name: "Aparecida R.",
    city: "Guarulhos / SP",
    text: "Fui atendida presencialmente e a transformação na minha vida e na harmonia da minha família foi imediata. É um verdadeiro pronto-socorro da alma.",
    date: "Assistida presencial",
    verified: true,
  },
];

export function Testimonials() {
  useSeo({
    title: "Depoimentos e Relatos de Assistidos — Fraternidade Cruzeiro do Sul",
    description: "Experiências reais de transformação, alívio e acolhimento vivenciadas na Fraternidade Cruzeiro do Sul de Apometria em Guarulhos/SP.",
    canonicalPath: "/depoimentos",
  });

  const { data: dbTestimonials, isLoading } = useListTestimonials({ approved: true });

  const testimonialsList: TestimonialItem[] =
    Array.isArray(dbTestimonials) && dbTestimonials.length > 0
      ? dbTestimonials.map((t) => ({
          id: t.id,
          name: t.name,
          city: t.city ?? undefined,
          text: t.text,
          date: t.createdAt
            ? new Date(t.createdAt).toLocaleDateString("pt-BR", { month: "short", year: "numeric" })
            : "Relato autorizado",
          verified: true,
        }))
      : HISTORICAL_TESTIMONIALS;

  const whatsappMessage = encodeURIComponent(
    "Olá! Gostaria de enviar meu relato de atendimento na Fraternidade Cruzeiro do Sul para ser compartilhado na página de Depoimentos."
  );
  const whatsappUrl = `https://wa.me/5511949446881?text=${whatsappMessage}`;

  return (
    <PublicLayout>
      {/* Header / Hero Section */}
      <section className="bg-primary text-primary-foreground py-16 sm:py-20 md:py-24 relative overflow-hidden">
        {/* Subtle decorative background glow */}
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-accent/10 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-white/5 blur-3xl pointer-events-none" />

        <div className="container mx-auto max-w-[1400px] px-4 sm:px-6 md:px-10 relative z-10">
          <div className="max-w-3xl">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-xs text-primary-foreground/70 uppercase tracking-widest mb-6">
              <Link href="/" className="hover:text-white transition-colors">Início</Link>
              <span>/</span>
              <span className="text-white font-medium">Depoimentos</span>
            </nav>

            <span className="eyebrow inline-block bg-white/10 text-white backdrop-blur-xs px-3.5 py-1.5 text-xs font-bold uppercase tracking-widest mb-4 border border-white/10">
              Vivências e Acolhimento
            </span>

            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.1] text-white">
              Depoimentos e Relatos Fraternos
            </h1>

            <p className="mt-5 text-base sm:text-lg text-primary-foreground/90 font-sans leading-relaxed max-w-2xl">
              Histórias e vivências de quem encontrou na Apometria, na dedicação voluntária e no Evangelho de Jesus o alívio para dores energéticas, equilíbrio e renovação espiritual.
            </p>

            {/* Quality and ethics pills */}
            <div className="mt-8 flex flex-wrap items-center gap-3 text-xs sm:text-sm text-primary-foreground/80 font-sans font-medium">
              <span className="inline-flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-full border border-white/10">
                <HeartHandshake size={15} className="text-accent-foreground" />
                Atendimento 100% Gratuito
              </span>
              <span className="inline-flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-full border border-white/10">
                <ShieldCheck size={15} className="text-emerald-300" />
                Preservação do Anonimato
              </span>
              <span className="inline-flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-full border border-white/10">
                <Sparkles size={15} className="text-amber-300" />
                Relatos Autênticos
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Grid of Testimonial Cards */}
      <section className="py-16 sm:py-20 bg-background">
        <div className="container mx-auto max-w-[1400px] px-4 sm:px-6 md:px-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4 border-b border-border pb-6">
            <div>
              <p className="eyebrow text-muted-foreground">Vozes da Caridade</p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-semibold tracking-tight text-foreground mt-1">
                Experiências Compartilhadas
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground font-sans max-w-md">
              Por respeito ético e espiritual, as identidades dos assistidos são mantidas com as iniciais autorizadas para resguardo de sua privacidade.
            </p>
          </div>

          {isLoading ? (
            <div className="py-20 flex flex-col items-center justify-center">
              <div className="w-8 h-8 rounded-full border-4 border-primary border-t-transparent animate-spin mb-4" />
              <p className="text-sm text-muted-foreground">Carregando relatos...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {testimonialsList.map((item) => (
                <article
                  key={item.id}
                  className="group relative bg-card border border-border/70 p-6 sm:p-8 flex flex-col justify-between shadow-xs hover:shadow-md hover:border-primary/40 transition-all duration-300"
                >
                  {/* Decorative Quote Mark */}
                  <div className="absolute top-6 right-6 text-primary/10 group-hover:text-primary/20 transition-colors pointer-events-none">
                    <Quote size={44} strokeWidth={1.5} />
                  </div>

                  <div>
                    {/* Rating stars */}
                    <div className="flex items-center gap-1 text-amber-500 mb-5" aria-label="Avaliação 5 de 5 estrelas">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <Star key={i} size={15} fill="currentColor" strokeWidth={0} />
                      ))}
                    </div>

                    {/* Testimonial body */}
                    <blockquote className="text-foreground/90 font-serif italic font-medium leading-relaxed text-base sm:text-lg mb-6">
                      &ldquo;{item.text}&rdquo;
                    </blockquote>
                  </div>

                  {/* Author / Metadata Footer */}
                  <div className="border-t border-border/60 pt-4 mt-auto flex items-center justify-between gap-3 font-sans">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 text-primary font-serif font-semibold text-base flex items-center justify-center shrink-0 border border-primary/20">
                        {item.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-sans font-semibold text-foreground text-sm sm:text-base leading-tight">
                          {item.name}
                        </div>
                        {item.city && (
                          <div className="text-xs text-muted-foreground mt-0.5 font-normal">
                            {item.city}
                          </div>
                        )}
                      </div>
                    </div>

                    {item.date && (
                      <span className="text-[11px] font-sans font-medium text-muted-foreground/80 bg-muted/60 px-2 py-1 rounded-xs shrink-0">
                        {item.date}
                      </span>
                    )}
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Share Your Experience / Invitation Box */}
      <section className="py-16 bg-muted/30 border-y border-border">
        <div className="container mx-auto max-w-[1400px] px-4 sm:px-6 md:px-10">
          <div className="max-w-4xl mx-auto bg-card border border-border p-8 sm:p-12 shadow-xs">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                <MessageCircle size={36} />
              </div>

              <div className="flex-1 text-center md:text-left">
                <p className="eyebrow text-primary">Sua Vivência Importa</p>
                <h3 className="font-serif text-2xl sm:text-3xl font-medium tracking-tight text-foreground mt-1">
                  Já participou dos atendimentos na Fraternidade?
                </h3>
                <p className="text-sm sm:text-base text-foreground/75 font-sans mt-3 leading-relaxed">
                  Se você recebeu o acolhimento espiritual da Fraternidade Cruzeiro do Sul e gostaria de deixar seu testemunho, sua mensagem pode confortar e orientar quem está passando por momentos difíceis. Resguardamos totalmente seu sigilo e publicamos somente com consentimento expresso.
                </p>

                <div className="mt-6 flex flex-wrap items-center justify-center md:justify-start gap-4">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1ebd5b] text-white px-5 py-3 text-xs sm:text-sm font-sans font-semibold uppercase tracking-wider transition-colors shadow-sm"
                  >
                    <MessageCircle size={17} />
                    Enviar Relato via WhatsApp
                  </a>

                  <Link
                    href="/contato"
                    className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground px-5 py-3 text-xs sm:text-sm font-sans font-semibold uppercase tracking-wider transition-colors"
                  >
                    Formulário de Contato
                    <ArrowRight size={15} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Spiritual & Ethical Notice */}
      <section className="py-12 bg-background">
        <div className="container mx-auto max-w-4xl px-4 sm:px-6 md:px-10 text-center">
          <div className="p-6 bg-muted/40 border border-border/80">
            <p className="eyebrow text-muted-foreground mb-2">Esclarecimento Institucional</p>
            <p className="text-xs sm:text-sm text-foreground/75 leading-relaxed font-sans">
              A Apometria é uma terapêutica complementar e bioenergética fundamentada na manipulação dos corpos sutis e na caridade cristã desinteressada. Em hipótese alguma substitui cuidados, tratamentos, medicações ou orientações médicas e psicológicas convencionais. Nosso trabalho é 100% voluntário e gratuito.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Agendamento */}
      <section className="py-16 bg-primary text-primary-foreground text-center">
        <div className="container mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-white mb-4">
            Necessita de Atendimento Espiritual?
          </h2>
          <p className="text-sm sm:text-base text-primary-foreground/80 leading-relaxed mb-8 font-sans">
            Os atendimentos acontecem às segundas-feiras às 19h no Jd. Bom Clima, Guarulhos/SP. É indispensável o agendamento prévio.
          </p>
          <Link
            href="/atendimento"
            className="inline-flex items-center justify-center bg-white text-primary hover:bg-white/90 px-8 py-3.5 text-xs sm:text-sm font-sans font-semibold uppercase tracking-wider shadow-md transition-all active:scale-[0.98]"
          >
            Agendar Atendimento Gratuito
          </Link>
        </div>
      </section>
    </PublicLayout>
  );
}

