import { PublicLayout } from "@/components/layout/PublicLayout";
import { Link } from "wouter";
import { ArrowRight, Star, HelpCircle } from "lucide-react";
import { useSeo } from "@/hooks/useSeo";
import { 
  useGetFeaturedCourses, 
  useListTestimonials,
  useListFaqItems,
} from "@workspace/api-client-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const pillars = [
  {
    n: "01",
    title: "Estudo",
    desc: "Apometria não é uma religião, porém necessita de muito estudo e atualizações, principalmente por trabalhar sob princípios da mecânica e física quântica."
  },
  {
    n: "02",
    title: "Desdobramento",
    desc: "No atendimento da apometria não se toca no corpo físico e sim todo processo é realizado nos corpos sutis (corpos energéticos) como parte do desdobramento."
  },
  {
    n: "03",
    title: "Caridade",
    desc: "Todo atendimento é gratuito. Nada se cobra, nada se vende."
  }
];

const coordinators = [
  { name: "Rubens", role: "Coordenação Geral", image: "/assets-reference/rubens.webp" },
  { name: "Marcilene", role: "Coordenação Financeira", image: "/assets-reference/marcilene.webp" },
  { name: "Elton", role: "Coordenação", image: "/assets-reference/elton.webp" },
  { name: "Denise", role: "Coordenação", image: "/assets-reference/denise.webp" },
  { name: "Cristiane", role: "Coordenação", image: "/assets-reference/cristiane.webp" },
  { name: "Walquiria", role: "Coordenação", image: "/assets-reference/walquiria.webp" },
  { name: "Sergio", role: "Coordenação", image: "/assets-reference/sergio.webp" },
];

const DEFAULT_TESTIMONIALS = [
  {
    id: 1,
    name: "Mariana S.",
    city: "Guarulhos / SP",
    text: "Cheguei à Fraternidade com muita angústia e dores inexplicáveis. O acolhimento fraterno e a sessão de apometria trouxeram uma paz de espírito que eu não sentia há anos."
  },
  {
    id: 2,
    name: "Carlos Eduardo M.",
    city: "São Paulo / SP",
    text: "Ambiente de imenso respeito, disciplina e amor. A seriedade dos operadores e o respeito à ética do Evangelho me impressionaram profundamente. Gratidão infinita."
  },
  {
    id: 3,
    name: "Aparecida R.",
    city: "Guarulhos / SP",
    text: "Fui atendida presencialmente e a transformação na minha vida e na harmonia da minha família foi imediata. É um verdadeiro pronto-socorro da alma."
  }
];

const DEFAULT_HOME_FAQS = [
  {
    id: 1,
    question: "Qualquer pessoa pode ser atendida na Fraternidade?",
    answer: "Sim. Nossos atendimentos são abertos a todos que buscam equilíbrio físico, emocional e espiritual, mediante agendamento prévio. Não há distinção de crença, credo ou condição social."
  },
  {
    id: 2,
    question: "Existe algum custo ou taxa para o atendimento de Apometria?",
    answer: "Não. Todos os atendimentos são 100% gratuitos. A Fraternidade é uma instituição beneficente guiada pela caridade e pelo lema crístico 'Dai de graça o que de graça recebestes'."
  },
  {
    id: 3,
    question: "A Apometria substitui o tratamento médico tradicional?",
    answer: "Não. A Apometria é uma terapia bioenergética complementar que atua nos corpos sutis. O assistido deve manter integralmente seus tratamentos médicos e prescrições clínicas."
  },
  {
    id: 4,
    question: "Como funciona o agendamento?",
    answer: "Os agendamentos são disponibilizados semanalmente através do nosso formulário online às segundas-feiras às 12h ou pelo WhatsApp oficial (11) 94944-6881. Não há pronto-atendimento sem agendamento."
  },
  {
    id: 5,
    question: "Onde ocorrem as sessões presenciais?",
    answer: "Na sede do espaço Luz e Expansão da Consciência, localizada na Rua Barbacena, 101 B (antigo 75), Jd. Bom Clima, em Guarulhos/SP, às segundas-feiras às 19h."
  }
];

export function Home() {
  useSeo({
    title: "Fraternidade Cruzeiro do Sul de Apometria — Cura espiritual e desdobramento",
    description: "Cura espiritual, desdobramento dos corpos sutis e caridade. Trabalho voluntário e gratuito em Guarulhos/SP.",
    canonicalPath: "/",
  });

  const { data: courses } = useGetFeaturedCourses();
  const { data: rawTestimonials } = useListTestimonials({ approved: true });
  const { data: rawFaqItems } = useListFaqItems();

  const testimonials = (Array.isArray(rawTestimonials) && rawTestimonials.length > 0) ? rawTestimonials : DEFAULT_TESTIMONIALS;
  const faqItems = (Array.isArray(rawFaqItems) && rawFaqItems.length > 0) ? rawFaqItems : DEFAULT_HOME_FAQS;

  return (
    <PublicLayout>
      {/* Hero Visual Section */}
      <section className="relative">
        <img
          src="/assets-reference/hero.webp"
          alt="Sessão de cura espiritual com imposição de mãos e alinhamento de chakras"
          className="h-[60vh] md:h-[70vh] w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex items-end">
          <div className="mx-auto max-w-[1400px] w-full px-5 py-8 md:py-12 md:px-10 text-white">
            <h1 className="eyebrow bg-primary/90 text-white backdrop-blur-xs px-3 py-1.5 inline-block text-[11px] tracking-[0.2em] uppercase font-bold">
              Fraternidade Cruzeiro do Sul de Apometria
            </h1>
          </div>
        </div>
      </section>

      {/* Quem Somos Section */}
      <section className="mx-auto max-w-[1400px] px-5 py-16 md:py-24 md:px-10">
        <div className="grid gap-10 md:grid-cols-12 items-start">
          <div className="md:col-span-5 space-y-4">
            <p className="eyebrow text-muted-foreground">Quem somos</p>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl leading-[1.08] text-foreground font-semibold">
              Uma fraternidade de trabalhadores a serviço do bem, da cura e do amor
            </h2>
          </div>
          <div className="md:col-span-6 md:col-start-7 space-y-6">
            <p className="text-base sm:text-lg leading-relaxed text-muted-foreground">
              A apometria, técnica desenvolvida pelo Dr. José Lacerda de Azevedo, nos permite trabalhar com o desdobramento do corpo espiritual para tratar obsessões, memórias de outras vidas e feridas que o corpo físico apenas reflete.
            </p>
            <p className="text-base sm:text-lg leading-relaxed text-muted-foreground">
              Não somos religião. Somos uma casa de estudo, oração e serviço, aberta a qualquer pessoa, de qualquer credo a serviço do nosso Mestre JESUS.
            </p>
            <div className="pt-4 flex flex-wrap gap-4 items-center">
              <Link href="/apometria" className="eyebrow rule-link text-primary font-semibold">
                Entenda a apometria &rarr;
              </Link>
              <Link href="/a-fraternidade" className="eyebrow rule-link text-muted-foreground font-medium hover:text-primary">
                Nossa história
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Pillars Section (Navy Blue 3-Column Band) */}
      <section className="border-y border-border bg-secondary text-secondary-foreground" aria-labelledby="pillars-heading">
        <h2 id="pillars-heading" className="sr-only">Pilares da Fraternidade</h2>
        <div className="mx-auto grid max-w-[1400px] gap-0 px-5 md:grid-cols-3 md:px-10">
          {pillars.map((item) => (
            <article
              key={item.n}
              className="border-border/20 py-12 md:py-16 border-b md:border-b-0 md:border-l md:px-10 md:first:border-l-0 md:first:pl-0"
            >
              <p className="eyebrow text-accent-foreground/70 font-semibold">{item.n}</p>
              <h3 className="mt-4 font-serif text-2xl sm:text-3xl text-white font-medium">{item.title}</h3>
              <p className="mt-4 text-secondary-foreground/80 leading-relaxed text-sm sm:text-base">
                {item.desc}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* Como se Preparar / Dentro da Sala Section */}
      <section className="mx-auto max-w-[1400px] px-5 py-16 md:py-24 md:px-10">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div className="max-w-md mx-auto md:mx-0 w-full">
            <img
              src="/assets-reference/session-inside.webp"
              alt="Mãos aplicando passe energético"
              className="w-full object-cover rounded-sm shadow-md border border-border"
              loading="lazy"
            />
          </div>
          <div className="space-y-6">
            <p className="eyebrow text-muted-foreground">Como se preparar para os atendimentos</p>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl leading-[1.08] text-foreground font-semibold">
              Dentro da sala
            </h2>
            <p className="text-base sm:text-lg leading-relaxed text-muted-foreground">
              A sessão dura cerca de quinze minutos. O atendido permanece deitado e consciente, enquanto a equipe realiza o desdobramento, o diálogo com espíritos envolvidos e a aplicação de energias reparadoras. Ao final, há um breve acolhimento e orientação.
            </p>
            <div className="pt-4 flex flex-wrap gap-4 items-center">
              <Link href="/atendimento" className="eyebrow rule-link text-primary font-semibold">
                Como funciona &rarr;
              </Link>
              <Link
                href="/atendimento"
                className="inline-flex items-center gap-2 bg-primary px-6 py-3 font-sans text-xs font-semibold uppercase tracking-wider text-primary-foreground hover:bg-primary/90 transition-all rounded-sm min-h-[44px] active:scale-[0.98] shadow-sm"
              >
                Agendar Atendimento
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* As Portas Estão Abertas (Full-Width Call to Action Banner) */}
      <section className="relative">
        <img
          src="/assets-reference/portas-abertas.webp"
          alt="Trabalhadores em oração e sintonia na fraternidade"
          className="h-[55vh] md:h-[65vh] w-full object-cover object-center"
          loading="lazy"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-primary/40 px-6 text-center text-primary-foreground backdrop-blur-[1px]">
          <h2 className="max-w-3xl font-serif text-3xl sm:text-4xl md:text-6xl font-semibold leading-[1.1] drop-shadow-md text-white">
            As portas estão abertas
          </h2>
          <p className="mt-4 max-w-xl text-base sm:text-lg text-white/90">
            Os atendimentos são gratuitos e realizados por uma equipe voluntária dedicada ao amor e à caridade.
          </p>
          <a
            href="https://forms.gle/cPm5uMeJW74AvjNo8"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-primary px-8 py-4 font-sans text-xs sm:text-sm font-semibold uppercase tracking-wider text-primary-foreground hover:bg-primary/90 transition-all mt-8 border border-white/20 shadow-lg rounded-sm min-h-[48px] active:scale-[0.98]"
          >
            Agendar Atendimento
          </a>
        </div>
      </section>

      {/* Quadro de Coordenadores Section */}
      <section className="mx-auto max-w-[1400px] px-5 py-16 md:py-24 md:px-10 border-t border-border">
        <div className="mb-12 md:mb-16">
          <p className="eyebrow text-muted-foreground">Equipe</p>
          <h2 className="mt-4 font-serif text-3xl sm:text-4xl md:text-5xl leading-[1.08] text-foreground font-semibold">
            Quadro de Coordenadores
          </h2>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
          {coordinators.map((c) => (
            <div key={c.name} className="group flex flex-col overflow-hidden bg-card rounded-sm shadow-sm border border-border/60 hover:shadow-md transition-shadow">
              <div className="relative aspect-[3/4] overflow-hidden bg-secondary">
                <img
                  src={c.image}
                  alt={`${c.name} - ${c.role}`}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                  onError={(e) => {
                    (e.currentTarget as HTMLElement).style.display = 'none';
                  }}
                />
              </div>
              <div className="bg-[#07145C] p-2.5 sm:p-3 text-white text-center flex-1 flex flex-col justify-center border-t border-white/10">
                <p className="font-serif text-sm sm:text-base font-semibold leading-tight text-white">{c.name}</p>
                <p className="text-[10px] eyebrow mt-1 opacity-90 uppercase tracking-wider text-accent-foreground leading-tight">
                  {c.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Courses (if any exist) */}
      {Array.isArray(courses) && courses.length > 0 && (
        <section className="py-20 bg-muted/40 border-t border-border">
          <div className="container px-4 md:px-6 mx-auto max-w-[1400px]">
            <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
              <div className="max-w-xl space-y-3">
                <p className="eyebrow text-muted-foreground">Formação e Conhecimento</p>
                <h2 className="text-3xl md:text-4xl font-serif font-semibold text-foreground">Cursos em Destaque</h2>
              </div>
              <Link href="/cursos" className="eyebrow rule-link text-primary font-semibold">
                Ver todos os cursos &rarr;
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {courses.slice(0, 3).map((course) => (
                <Link key={course.id} href="/cursos" className="group flex flex-col bg-white border border-border overflow-hidden shadow-sm hover:shadow-md transition-all">
                  <div className="aspect-[16/9] bg-muted relative overflow-hidden">
                    <img 
                      src={course.imageUrl || "/course1.jpg"} 
                      alt={course.name} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="font-serif font-medium text-xl mb-2 group-hover:text-primary transition-colors">{course.name}</h3>
                    <p className="text-sm text-foreground/70 line-clamp-2 mb-4 flex-1">{course.description}</p>
                    <span className="eyebrow text-xs text-primary font-semibold mt-auto">Saiba mais &rarr;</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Testimonials (Relatos de Paz) */}
      {Array.isArray(testimonials) && testimonials.length > 0 && (
        <section className="py-20 bg-[#07145C] text-primary-foreground relative overflow-hidden">
          <div className="container relative z-10 px-4 md:px-6 mx-auto max-w-[1400px]">
            <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-14 gap-6">
              <div className="text-center md:text-left max-w-2xl space-y-3">
                <p className="eyebrow text-accent-foreground/80">Relatos e Vivências</p>
                <h2 className="text-3xl md:text-4xl font-serif font-semibold text-white">Depoimentos e Relatos</h2>
              </div>
              <Link href="/depoimentos" className="eyebrow text-white hover:text-white/80 transition-opacity border-b border-white/40 pb-1 text-xs">
                Ver todos os relatos &rarr;
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.slice(0, 3).map((testimonial) => (
                <div key={testimonial.id} className="bg-white/10 backdrop-blur-md border border-white/10 p-8 flex flex-col justify-between rounded-sm">
                  <div>
                    <div className="flex text-amber-300 mb-4">
                      {[1,2,3,4,5].map((i) => <Star key={i} size={15} fill="currentColor" />)}
                    </div>
                    <p className="font-serif italic font-medium text-white/95 mb-6 leading-relaxed text-base sm:text-lg">
                      &quot;{testimonial.text}&quot;
                    </p>
                  </div>
                  <div className="border-t border-white/10 pt-4">
                    <div className="font-sans font-semibold text-sm text-white">{testimonial.name}</div>
                    {testimonial.city && <div className="font-sans font-normal text-xs text-white/70">{testimonial.city}</div>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ Section */}
      {Array.isArray(faqItems) && faqItems.length > 0 && (
        <section className="py-20 bg-white border-t border-border">
          <div className="container px-4 md:px-6 mx-auto max-w-3xl">
            <div className="text-center mb-12 space-y-3">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto text-primary">
                <HelpCircle size={24} />
              </div>
              <h2 className="text-3xl md:text-4xl font-serif font-semibold text-foreground">Dúvidas Frequentes</h2>
              <p className="text-foreground/70 text-base">
                Respostas para as perguntas mais comuns sobre a Fraternidade e a Apometria.
              </p>
            </div>
            <Accordion type="multiple" className="w-full border-t border-border">
              {faqItems.slice(0, 6).map((item) => (
                <AccordionItem key={item.id} value={`faq-${item.id}`}>
                  <AccordionTrigger className="text-left font-sans font-semibold text-base py-4">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-foreground/75 leading-relaxed text-sm sm:text-base pb-4 font-sans font-normal">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
            {faqItems.length > 6 && (
              <div className="text-center mt-8">
                <Link href="/faq" className="eyebrow rule-link text-primary font-semibold">
                  Ver todas as perguntas &rarr;
                </Link>
              </div>
            )}
          </div>
        </section>
      )}
    </PublicLayout>
  );
}
