import { PublicLayout } from "@/components/layout/PublicLayout";
import { Link } from "wouter";
import { ArrowRight, Star, HelpCircle } from "lucide-react";
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
  { name: "Rubens", role: "Coordenação Geral", image: "/assets-reference/rubens.png" },
  { name: "Marcilene", role: "Coordenação Financeira", image: "/assets-reference/marcilene.png" },
  { name: "Elton", role: "Coordenação", image: "/assets-reference/elton.png" },
  { name: "Denise", role: "Coordenação", image: "/assets-reference/denise.png" },
  { name: "Cristiane", role: "Coordenação", image: "/assets-reference/cristiane.png" },
  { name: "Walquiria", role: "Coordenação", image: "/assets-reference/walquiria.png" },
  { name: "Sergio", role: "Coordenação", image: "/assets-reference/sergio.png" },
];

export function Home() {
  const { data: courses } = useGetFeaturedCourses();
  const { data: testimonials } = useListTestimonials({ approved: true });
  const { data: faqItems } = useListFaqItems();

  return (
    <PublicLayout>
      {/* Hero Visual Section */}
      <section className="relative">
        <img
          src="/assets-reference/hero.png"
          alt="Sessão de cura espiritual com imposição de mãos e alinhamento de chakras"
          className="h-[60vh] md:h-[70vh] w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent flex items-end">
          <div className="mx-auto max-w-[1400px] w-full px-5 py-8 md:px-10 text-white">
            <span className="eyebrow bg-primary/80 backdrop-blur-sm px-3 py-1.5 inline-block text-[11px] tracking-[0.2em]">
              Fraternidade Cruzeiro do Sul de Apometria
            </span>
          </div>
        </div>
      </section>

      {/* Quem Somos Section */}
      <section className="mx-auto max-w-[1400px] px-5 py-16 md:py-24 md:px-10">
        <div className="grid gap-10 md:grid-cols-12 items-start">
          <div className="md:col-span-5 space-y-4">
            <p className="eyebrow text-muted-foreground">Quem somos</p>
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl leading-[1.08] text-foreground font-bold">
              Uma fraternidade de trabalhadores a serviço do bem, da cura e do amor
            </h1>
          </div>
          <div className="md:col-span-6 md:col-start-7 space-y-6">
            <p className="text-base sm:text-lg leading-relaxed text-muted-foreground">
              A apometria, técnica desenvolvida pelo Dr. José Lacerda de Azevedo, nos permite trabalhar com o desdobramento do corpo espiritual para tratar obsessões, memórias de outras vidas e feridas que o corpo físico apenas reflete.
            </p>
            <p className="text-base sm:text-lg leading-relaxed text-muted-foreground">
              Não somos religião. Somos uma casa de estudo, oração e serviço, aberta a qualquer pessoa, de qualquer credo a serviço do nosso Mestre JESUS.
            </p>
            <div className="pt-4 flex flex-wrap gap-4 items-center">
              <Link href="/apometria" className="eyebrow rule-link text-primary font-bold">
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
      <section className="border-y border-border bg-secondary text-secondary-foreground">
        <div className="mx-auto grid max-w-[1400px] gap-0 px-5 md:grid-cols-3 md:px-10">
          {pillars.map((item) => (
            <article
              key={item.n}
              className="border-border/20 py-12 md:py-16 border-b md:border-b-0 md:border-l md:px-10 md:first:border-l-0 md:first:pl-0"
            >
              <p className="eyebrow text-accent-foreground/70 font-semibold">{item.n}</p>
              <h3 className="mt-4 font-serif text-2xl sm:text-3xl text-white font-bold">{item.title}</h3>
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
              src="/assets-reference/session-inside.png"
              alt="Mãos aplicando passe energético"
              className="w-full object-cover rounded-sm shadow-md border border-border"
              loading="lazy"
            />
          </div>
          <div className="space-y-6">
            <p className="eyebrow text-muted-foreground">Como se preparar para os atendimentos</p>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl leading-[1.08] text-foreground font-bold">
              Dentro da sala
            </h2>
            <p className="text-base sm:text-lg leading-relaxed text-muted-foreground">
              A sessão dura cerca de quinze minutos. O atendido permanece deitado e consciente, enquanto a equipe realiza o desdobramento, o diálogo com espíritos envolvidos e a aplicação de energias reparadoras. Ao final, há um breve acolhimento e orientação.
            </p>
            <div className="pt-4 flex flex-wrap gap-4 items-center">
              <Link href="/atendimento" className="eyebrow rule-link text-primary font-bold">
                Como funciona &rarr;
              </Link>
              <Link
                href="/atendimento"
                className="inline-flex items-center gap-2 bg-primary px-6 py-3 text-xs font-bold uppercase tracking-widest text-primary-foreground hover:bg-primary/90 transition-all rounded-none"
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
          src="/assets-reference/portas-abertas.png"
          alt="Trabalhadores em oração e sintonia na fraternidade"
          className="h-[55vh] md:h-[65vh] w-full object-cover object-center"
          loading="lazy"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-primary/40 px-6 text-center text-primary-foreground backdrop-blur-[1px]">
          <h2 className="max-w-3xl font-serif text-3xl sm:text-4xl md:text-6xl font-bold leading-[1.1] drop-shadow-md text-white">
            As portas estão abertas
          </h2>
          <p className="mt-4 max-w-xl text-base sm:text-lg text-white/90">
            Os atendimentos são gratuitos e realizados por uma equipe voluntária dedicada ao amor e à caridade.
          </p>
          <a
            href="https://forms.gle/cPm5uMeJW74AvjNo8"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-primary px-8 py-4 text-xs sm:text-sm font-bold uppercase tracking-widest text-primary-foreground hover:bg-primary/90 transition-all mt-8 border border-white/20 shadow-lg rounded-none"
          >
            Agendar Atendimento
          </a>
        </div>
      </section>

      {/* Quadro de Coordenadores Section */}
      <section className="mx-auto max-w-[1400px] px-5 py-16 md:py-24 md:px-10 border-t border-border">
        <div className="mb-12 md:mb-16">
          <p className="eyebrow text-muted-foreground">Equipe</p>
          <h2 className="mt-4 font-serif text-3xl sm:text-4xl md:text-5xl leading-[1.08] text-foreground font-bold">
            Quadro de Coordenadores
          </h2>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
          {coordinators.map((c) => (
            <div key={c.name} className="group relative aspect-[3/4] overflow-hidden bg-secondary rounded-sm shadow-sm">
              <img
                src={c.image}
                alt={`${c.name} - ${c.role}`}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
                onError={(e) => {
                  (e.currentTarget as HTMLElement).style.display = 'none';
                }}
              />
              <div className="absolute bottom-0 left-0 right-0 bg-[#07145C]/90 p-3 text-white backdrop-blur-sm border-t border-white/10">
                <p className="font-serif text-sm sm:text-base font-bold leading-tight">{c.name}</p>
                <p className="text-[10px] eyebrow mt-1 opacity-80 uppercase tracking-wider text-accent-foreground">
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
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground">Cursos em Destaque</h2>
              </div>
              <Link href="/cursos" className="eyebrow rule-link text-primary font-bold">
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
                    <h3 className="font-serif font-bold text-xl mb-2 group-hover:text-primary transition-colors">{course.name}</h3>
                    <p className="text-sm text-foreground/70 line-clamp-2 mb-4 flex-1">{course.description}</p>
                    <span className="eyebrow text-xs text-primary font-bold mt-auto">Saiba mais &rarr;</span>
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
            <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
              <p className="eyebrow text-accent-foreground/80">Relatos e Vivências</p>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-white">Depoimentos</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.slice(0, 3).map((testimonial) => (
                <div key={testimonial.id} className="bg-white/10 backdrop-blur-md border border-white/10 p-8 flex flex-col justify-between">
                  <div>
                    <div className="flex text-amber-300 mb-4">
                      {[1,2,3,4,5].map((i) => <Star key={i} size={15} fill="currentColor" />)}
                    </div>
                    <p className="text-white/90 italic mb-6 leading-relaxed text-sm sm:text-base">
                      &quot;{testimonial.text}&quot;
                    </p>
                  </div>
                  <div className="border-t border-white/10 pt-4">
                    <div className="font-bold text-sm text-white">{testimonial.name}</div>
                    {testimonial.city && <div className="text-xs text-white/60">{testimonial.city}</div>}
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
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground">Dúvidas Frequentes</h2>
              <p className="text-foreground/70 text-base">
                Respostas para as perguntas mais comuns sobre a Fraternidade e a Apometria.
              </p>
            </div>
            <Accordion type="multiple" className="w-full border-t border-border">
              {faqItems.slice(0, 6).map((item) => (
                <AccordionItem key={item.id} value={`faq-${item.id}`}>
                  <AccordionTrigger className="text-left font-semibold text-base py-4">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-foreground/75 leading-relaxed text-sm sm:text-base pb-4">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
            {faqItems.length > 6 && (
              <div className="text-center mt-8">
                <Link href="/faq" className="eyebrow rule-link text-primary font-bold">
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
