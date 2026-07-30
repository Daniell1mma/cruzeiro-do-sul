import { PublicLayout } from "@/components/layout/PublicLayout";
import { Link } from "wouter";
import { Heart, Sparkles, BookOpen, ShieldCheck, ArrowRight, Star, HelpCircle } from "lucide-react";
import { 
  useGetFeaturedCourses, 
  useGetRecentPosts, 
  useListAlbums, 
  useListTestimonials,
  useListFaqItems,
} from "@workspace/api-client-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export function Home() {
  const { data: courses } = useGetFeaturedCourses();
  const { data: posts } = useGetRecentPosts({ limit: 3 });
  const { data: albums } = useListAlbums();
  const { data: testimonials } = useListTestimonials({ approved: true });
  const { data: faqItems } = useListFaqItems();

  const differentials = [
    {
      icon: <Heart className="w-6 h-6 text-secondary" />,
      title: "Acolhimento Integral",
      desc: "Recebemos cada pessoa com empatia e sem julgamentos, focando no ser humano."
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-secondary" />,
      title: "Seriedade e Ética",
      desc: "Trabalhos fundamentados no estudo e em práticas seguras da Apometria."
    },
    {
      icon: <BookOpen className="w-6 h-6 text-secondary" />,
      title: "Estudo Constante",
      desc: "Buscamos o aprimoramento contínuo de nossos trabalhadores através de cursos."
    },
    {
      icon: <Sparkles className="w-6 h-6 text-secondary" />,
      title: "Cura Energética",
      desc: "Técnicas que auxiliam na harmonização dos corpos sutis e limpeza espiritual."
    }
  ];

  return (
    <PublicLayout>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center pt-20 pb-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/hero.jpg"
            alt="Luz do Sol Através da Janela"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-white/70 backdrop-blur-[2px]"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/90"></div>
        </div>

        <div className="container relative z-10 px-4 md:px-6 mx-auto flex flex-col items-center text-center">
          <div className="inline-flex items-center rounded-full border border-primary/20 bg-white/50 px-3 py-1 text-sm text-primary mb-8 backdrop-blur-md">
            <span className="flex h-2 w-2 rounded-full bg-secondary mr-2"></span>
            Acolhimento Fraterno Aberto
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-foreground max-w-4xl tracking-tight mb-6">
            Paz, Equilíbrio e <span className="text-primary italic">Cura Espiritual</span>
          </h1>
          
          <p className="text-lg md:text-xl text-foreground/80 max-w-2xl mb-10 leading-relaxed">
            Bem-vindo à Fraternidade Cruzeiro do Sul. Um espaço dedicado ao estudo, prática da Apometria e ao despertar da consciência com amor e seriedade.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Link 
              href="/atendimento" 
              className="inline-flex items-center justify-center rounded-full bg-secondary px-8 py-4 text-sm font-medium text-white shadow transition-colors hover:bg-secondary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            >
              Solicitar Atendimento
            </Link>
            <Link 
              href="/apometria" 
              className="inline-flex items-center justify-center rounded-full border border-primary/20 bg-white/80 backdrop-blur-sm px-8 py-4 text-sm font-medium text-primary shadow-sm transition-colors hover:bg-primary/5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            >
              Conheça a Apometria
            </Link>
          </div>
        </div>
      </section>

      {/* Intro Summary */}
      <section className="py-24 bg-white">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground">
                Um farol de luz no seu caminho espiritual
              </h2>
              <div className="w-16 h-1 bg-secondary rounded-full"></div>
              <p className="text-foreground/80 leading-relaxed text-lg">
                A Fraternidade Cruzeiro do Sul é uma instituição espiritualista, sem fins lucrativos, dedicada ao acolhimento fraterno e ao tratamento espiritual através da Apometria.
              </p>
              <p className="text-foreground/80 leading-relaxed">
                Trabalhamos com profundo respeito, ética e responsabilidade, buscando sempre o alívio das dores da alma e o esclarecimento consciencial, desmistificando o processo de cura espiritual e tornando-o acessível a todos que buscam auxílio sincero.
              </p>
              <div className="pt-4">
                <Link href="/a-fraternidade" className="text-primary font-bold hover:underline inline-flex items-center gap-2">
                  Nossa História e Missão <ArrowRight size={16} />
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 bg-accent rounded-3xl transform rotate-3"></div>
              <img 
                src="/about.jpg" 
                alt="Grupo de pessoas em reunião fraterna" 
                className="relative rounded-2xl shadow-xl w-full object-cover aspect-[4/3]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Differentials */}
      <section className="py-24 bg-muted">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground">Por que nos procurar?</h2>
            <p className="text-foreground/80 text-lg">
              Nossos pilares de trabalho garantem um atendimento seguro e acolhedor para o seu momento de necessidade.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {differentials.map((item, idx) => (
              <div key={idx} className="bg-white p-8 rounded-2xl shadow-sm border border-border/50 hover-elevate transition-all">
                <div className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center mb-6">
                  {item.icon}
                </div>
                <h3 className="font-bold text-lg mb-3">{item.title}</h3>
                <p className="text-foreground/70 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      {courses && courses.length > 0 && (
        <section className="py-24 bg-white">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
              <div className="max-w-xl space-y-4">
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground">Cursos em Destaque</h2>
                <p className="text-foreground/80 text-lg">Aprofunde seus conhecimentos espirituais conosco.</p>
              </div>
              <Link href="/cursos" className="inline-flex items-center gap-2 text-primary font-medium hover:underline">
                Ver todos os cursos <ArrowRight size={16} />
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {courses.slice(0, 3).map(course => (
                <Link key={course.id} href={`/cursos`} className="group flex flex-col bg-white border border-border rounded-2xl overflow-hidden shadow-sm hover-elevate">
                  <div className="aspect-[16/9] bg-muted relative overflow-hidden">
                    <img 
                      src={course.imageUrl || "/course1.jpg"} 
                      alt={course.name} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-primary">
                      {course.status === 'open' ? 'Inscrições Abertas' : course.status === 'upcoming' ? 'Em Breve' : 'Encerrado'}
                    </div>
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="font-serif font-bold text-xl mb-2 group-hover:text-primary transition-colors">{course.name}</h3>
                    <p className="text-sm text-foreground/70 line-clamp-2 mb-4 flex-1">{course.description}</p>
                    <div className="flex items-center justify-between text-xs text-foreground/60 border-t border-border pt-4 mt-auto">
                      <span>{course.duration}</span>
                      <span className="font-medium text-primary">Saiba mais &rarr;</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Testimonials */}
      {testimonials && testimonials.length > 0 && (
        <section className="py-24 bg-primary text-primary-foreground relative overflow-hidden">
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-secondary/20 rounded-full blur-3xl"></div>
          
          <div className="container relative z-10 px-4 md:px-6 mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
              <h2 className="text-3xl md:text-4xl font-serif font-bold">Relatos de Paz</h2>
              <p className="text-white/80 text-lg">
                Depoimentos de pessoas que encontraram acolhimento em nossa fraternidade.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.slice(0, 3).map(testimonial => (
                <div key={testimonial.id} className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-8">
                  <div className="flex text-secondary mb-6">
                    {[1,2,3,4,5].map(i => <Star key={i} size={16} fill="currentColor" />)}
                  </div>
                  <p className="text-white/90 italic mb-8 leading-relaxed">"{testimonial.text}"</p>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center font-bold font-serif text-xl">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-bold">{testimonial.name}</div>
                      {testimonial.city && <div className="text-xs text-white/60">{testimonial.city}</div>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ Section */}
      {faqItems && faqItems.length > 0 && (
        <section className="py-24 bg-white">
          <div className="container px-4 md:px-6 mx-auto max-w-3xl">
            <div className="text-center mb-14 space-y-4">
              <div className="w-14 h-14 bg-accent rounded-full flex items-center justify-center mx-auto text-primary">
                <HelpCircle size={28} />
              </div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground">Dúvidas Frequentes</h2>
              <p className="text-foreground/70 text-lg">
                Respostas para as perguntas mais comuns sobre a Fraternidade e a Apometria.
              </p>
            </div>
            <Accordion type="multiple" className="w-full">
              {faqItems.slice(0, 6).map((item) => (
                <AccordionItem key={item.id} value={`faq-${item.id}`}>
                  <AccordionTrigger className="text-left font-semibold text-base">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-foreground/75 leading-relaxed">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
            {faqItems.length > 6 && (
              <div className="text-center mt-10">
                <Link href="/faq" className="inline-flex items-center gap-2 text-primary font-bold hover:underline">
                  Ver todas as perguntas <ArrowRight size={16} />
                </Link>
              </div>
            )}
          </div>
        </section>
      )}

      {/* CTA Bottom */}
      <section className="py-32 bg-muted text-center">
        <div className="container px-4 md:px-6 mx-auto max-w-3xl">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-6">
            Sente que precisa de ajuda?
          </h2>
          <p className="text-xl text-foreground/80 mb-10 leading-relaxed">
            Não passe por seus desafios sozinho. Nossa casa está de portas abertas para lhe receber com amor, luz e fraternidade.
          </p>
          <Link 
            href="/atendimento" 
            className="inline-flex items-center justify-center rounded-full bg-secondary px-10 py-5 text-lg font-medium text-white shadow-lg transition-transform hover:scale-105"
          >
            Agendar Atendimento Fraterno
          </Link>
        </div>
      </section>
    </PublicLayout>
  );
}
