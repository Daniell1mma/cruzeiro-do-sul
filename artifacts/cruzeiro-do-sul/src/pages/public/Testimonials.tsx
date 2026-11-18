import { PublicLayout } from "@/components/layout/PublicLayout";
import { Link } from "wouter";
import { Star, Quote, HeartHandshake, ShieldCheck, MessageCircle, Sparkles, ArrowRight, CheckCircle, Send } from "lucide-react";
import { useSeo } from "@/hooks/useSeo";
import { useListTestimonials, useCreateTestimonial } from "@workspace/api-client-react";
import { useState } from "react";

interface TestimonialItem {
  id: number | string;
  name: string;
  city?: string | null;
  text: string;
  date?: string;
  verified?: boolean;
}

export function Testimonials() {
  useSeo({
    title: "Depoimentos e Relatos de Assistidos — Fraternidade Cruzeiro do Sul",
    description: "Experiências reais de transformação, alívio e acolhimento vivenciadas na Fraternidade Cruzeiro do Sul de Apometria em Guarulhos/SP.",
    canonicalPath: "/depoimentos",
  });

  const { data: dbTestimonials, isLoading } = useListTestimonials({ approved: true });
  const { mutateAsync: createTestimonial, isPending } = useCreateTestimonial();

  const [form, setForm] = useState({ name: "", email: "", city: "", text: "" });
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.text.trim()) {
      setErrorMsg("Por favor, preencha os campos obrigatórios (nome, e-mail e seu relato).");
      return;
    }
    try {
      const contactCity = form.city.trim() ? `${form.city.trim()} • ${form.email.trim()}` : form.email.trim();
      await createTestimonial({
        data: {
          name: form.name.trim(),
          city: contactCity,
          text: form.text.trim(),
        },
      });
      setSubmitted(true);
      setForm({ name: "", email: "", city: "", text: "" });
      setErrorMsg("");
    } catch {
      setErrorMsg("Ocorreu um erro ao enviar seu relato. Por favor, tente novamente.");
    }
  };

  const testimonialsList: TestimonialItem[] =
    Array.isArray(dbTestimonials)
      ? dbTestimonials.map((t) => {
          const cleanedCity = t.city?.split("•")[0].split("(")[0].trim();
          return {
            id: t.id,
            name: t.name,
            city: cleanedCity && !cleanedCity.includes("@") ? cleanedCity : undefined,
            text: t.text,
            date: t.createdAt
              ? new Date(t.createdAt).toLocaleDateString("pt-BR", { month: "short", year: "numeric" })
              : "Relato autorizado",
            verified: true,
          };
        })
      : [];

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
          ) : testimonialsList.length === 0 ? (
            <div className="py-16 px-6 text-center max-w-2xl mx-auto bg-card border border-border/70 rounded-sm space-y-3 font-sans">
              <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-2">
                <Sparkles size={24} />
              </div>
              <h3 className="font-serif text-xl sm:text-2xl font-semibold tracking-tight text-foreground">
                Espaço de Acolhimento e Gratidão
              </h3>
              <p className="text-sm text-foreground/75 leading-relaxed">
                Os relatos enviados passam por leitura e moderação da nossa coordenação antes de serem publicados. Seja o primeiro a compartilhar sua experiência no formulário abaixo!
              </p>
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

      {/* Share Your Experience / Submission Box */}
      <section className="py-16 bg-muted/30 border-y border-border">
        <div className="container mx-auto max-w-[1400px] px-4 sm:px-6 md:px-10">
          <div className="max-w-3xl mx-auto bg-card border border-border p-8 sm:p-12 shadow-sm rounded-sm">
            <div className="text-center mb-8">
              <div className="w-14 h-14 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4">
                <MessageCircle size={28} />
              </div>
              <p className="eyebrow text-primary">Sua Vivência Importa</p>
              <h2 className="font-serif text-2xl sm:text-3xl font-semibold tracking-tight text-foreground mt-1">
                Deixe seu Depoimento
              </h2>
              <p className="text-sm sm:text-base text-foreground/75 font-sans mt-2 max-w-xl mx-auto leading-relaxed">
                Se você recebeu o acolhimento espiritual da Fraternidade Cruzeiro do Sul, seu testemunho pode confortar e orientar quem busca alívio e renovação.
              </p>
            </div>

            {submitted ? (
              <div className="bg-primary/5 border border-primary/20 p-8 text-center rounded-sm space-y-4 font-sans">
                <CheckCircle className="w-12 h-12 text-primary mx-auto" />
                <h3 className="font-serif font-semibold text-xl text-foreground">
                  Depoimento enviado com sucesso!
                </h3>
                <p className="text-sm text-foreground/80 leading-relaxed max-w-lg mx-auto">
                  Agradecemos imensamente pelo seu relato e generosidade fraterna. Seu depoimento foi recebido com carinho e será avaliado pela coordenação para publicação.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="mt-4 text-xs font-semibold text-primary uppercase tracking-wider hover:underline"
                >
                  Enviar outro relato
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5 font-sans">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="name" className="block text-xs font-semibold uppercase tracking-wider text-foreground mb-1.5">
                      Nome ou Iniciais <span className="text-primary">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      required
                      value={form.name}
                      onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
                      placeholder="Ex: Mariana S."
                      className="w-full h-11 px-3.5 border border-border bg-background text-foreground text-sm focus:outline-none focus:border-primary rounded-none"
                    />
                    <p className="text-[11px] text-muted-foreground mt-1">
                      Para resguardar sua privacidade, você pode usar apenas suas iniciais.
                    </p>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-wider text-foreground mb-1.5">
                      Seu E-mail <span className="text-primary">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
                      placeholder="seu@email.com"
                      className="w-full h-11 px-3.5 border border-border bg-background text-foreground text-sm focus:outline-none focus:border-primary rounded-none"
                    />
                    <p className="text-[11px] text-muted-foreground mt-1">
                      Sigiloso. Usado apenas para moderação interna.
                    </p>
                  </div>
                </div>

                <div>
                  <label htmlFor="city" className="block text-xs font-semibold uppercase tracking-wider text-foreground mb-1.5">
                    Cidade / Estado <span className="text-muted-foreground font-normal lowercase">(opcional)</span>
                  </label>
                  <input
                    type="text"
                    id="city"
                    value={form.city}
                    onChange={(e) => setForm((prev) => ({ ...prev, city: e.target.value }))}
                    placeholder="Ex: Guarulhos / SP"
                    className="w-full h-11 px-3.5 border border-border bg-background text-foreground text-sm focus:outline-none focus:border-primary rounded-none"
                  />
                </div>

                <div>
                  <label htmlFor="text" className="block text-xs font-semibold uppercase tracking-wider text-foreground mb-1.5">
                    Seu Relato / Mensagem <span className="text-primary">*</span>
                  </label>
                  <textarea
                    id="text"
                    required
                    rows={5}
                    value={form.text}
                    onChange={(e) => setForm((prev) => ({ ...prev, text: e.target.value }))}
                    placeholder="Conte como foi sua experiência, o acolhimento recebido e as transformações vivenciadas..."
                    className="w-full p-3.5 border border-border bg-background text-foreground text-sm focus:outline-none focus:border-primary resize-none rounded-none"
                  ></textarea>
                </div>

                {errorMsg && (
                  <p className="text-xs text-red-500 font-medium">{errorMsg}</p>
                )}

                <p className="text-xs text-muted-foreground leading-relaxed">
                  * Todos os depoimentos são moderados pela equipe administrativa antes da aprovação e publicação pública.
                </p>

                <button
                  type="submit"
                  disabled={isPending}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-3.5 text-xs font-semibold uppercase tracking-wider transition-all flex items-center justify-center gap-2 min-h-[46px] active:scale-[0.98] shadow-sm disabled:opacity-60"
                >
                  <Send size={15} />
                  {isPending ? "Enviando relato..." : "Enviar Depoimento para Moderação"}
                </button>
              </form>
            )}
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

