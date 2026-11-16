import { PublicLayout } from "@/components/layout/PublicLayout";
import { useListCourses } from "@workspace/api-client-react";
import { Clock, Users, ArrowRight, User } from "lucide-react";
import { Link } from "wouter";
import { useSeo } from "@/hooks/useSeo";

const DEFAULT_COURSES = [
  {
    id: 1,
    name: "Formação Básica em Apometria",
    description: "Estudo teórico e prático dos fundamentos da Apometria, leis bioenergéticas formuladas pelo Dr. Lacerda, anatomia dos corpos sutis e ética na assistência.",
    status: "upcoming",
    duration: "44 aulas teóricas e práticas",
    audience: "Aberto a todos os interessados (maiores de 18 anos)",
    instructor: "Corpo Docente da Fraternidade",
    imageUrl: "/assets-reference/hero.webp"
  },
  {
    id: 2,
    name: "Capacitação de Operadores e Médiuns de Sustentação",
    description: "Aprofundamento em técnicas de desdobramento anímico, polarização de impulsos mentais, tratamentos espirituais e condução segura na mesa apométrica.",
    status: "upcoming",
    duration: "Módulos práticos supervisionados",
    audience: "Trabalhadores e concluintes do módulo básico",
    instructor: "Coordenação Geral e Pedagógica",
    imageUrl: "/assets-reference/session-inside.webp"
  },
  {
    id: 3,
    name: "Medicina Vibracional e Física Quântica Aplicada",
    description: "Estudos complementares sobre a interface entre mecânica quântica, campos mórficos, ressonância vibracional e o poder curativo do amor incondicional.",
    status: "upcoming",
    duration: "Ciclos de palestras e seminários",
    audience: "Trabalhadores da Fraternidade e terapeutas",
    instructor: "José Rubens Gonçalves e convidados",
    imageUrl: "/assets-reference/portas-abertas.webp"
  }
];

export function Courses() {
  useSeo({
    title: "Cursos e Formação em Apometria",
    description: "Cursos teóricos e práticos de Apometria e medicina vibracional ministrados pelo corpo docente da Fraternidade Cruzeiro do Sul.",
    canonicalPath: "/cursos",
  });

  const { data: courses, isLoading } = useListCourses();

  const coursesToDisplay = (Array.isArray(courses) && courses.length > 0) ? courses : DEFAULT_COURSES;

  const getStatusConfig = (status: string) => {
    switch (status) {
      case "open":     return { label: "Inscrições Abertas", color: "bg-green-100 text-green-800 border-green-200" };
      case "upcoming": return { label: "Consulte Próxima Turma", color: "bg-blue-100 text-blue-800 border-blue-200" };
      case "closed":   return { label: "Encerrado",          color: "bg-gray-100 text-gray-800 border-gray-200" };
      default:         return { label: status,               color: "bg-gray-100 text-gray-800" };
    }
  };

  return (
    <PublicLayout>
      {/* Header */}
      <header className="mx-auto max-w-[1400px] px-5 pb-12 pt-20 md:pt-24 md:px-10 text-center">
        <p className="eyebrow text-muted-foreground">Formação e Conhecimento</p>
        <h1 className="mt-6 font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1] text-foreground font-bold">
          Cursos
        </h1>
      </header>

      <section className="mx-auto max-w-[1400px] px-5 pb-24 md:px-10">
        <div className="max-w-4xl mx-auto border-t border-border pt-12 space-y-8">
          
          <p className="text-lg sm:text-xl text-foreground font-medium leading-relaxed">
            A fraternidade oferece cursos de apometria presenciais e on-line, dentro do programa temos:
          </p>

          {/* Courses Grid */}
          {isLoading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
              {coursesToDisplay.map((course) => {
                const status = getStatusConfig(course.status);
                const encodedMsg = encodeURIComponent(`Olá! Tenho interesse no curso: ${course.name}`);
                return (
                  <div key={course.id} className="group flex flex-col bg-card border border-border rounded-sm overflow-hidden shadow-sm hover:shadow-md transition-all">
                    <div className="aspect-video relative overflow-hidden bg-muted">
                      <img
                        src={course.imageUrl || "/assets-reference/hero.webp"}
                        alt={course.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className={`absolute top-3 left-3 border px-2.5 py-1 text-xs font-bold backdrop-blur-md ${status.color}`}>
                        {status.label}
                      </div>
                    </div>

                    <div className="p-6 flex-1 flex flex-col">
                      <h2 className="text-xl md:text-2xl font-serif font-bold mb-2 group-hover:text-primary transition-colors">
                        {course.name}
                      </h2>
                      <p className="text-foreground/75 mb-5 flex-1 line-clamp-3 leading-relaxed text-sm md:text-base">
                        {course.description}
                      </p>

                      <div className="space-y-2 mb-6 bg-muted/40 p-3.5 text-xs text-foreground/80 border border-border/50">
                        {course.duration && (
                          <div className="flex items-center gap-2">
                            <Clock size={14} className="text-primary shrink-0" />
                            <span>{course.duration}</span>
                          </div>
                        )}
                        {course.audience && (
                          <div className="flex items-center gap-2">
                            <Users size={14} className="text-primary shrink-0" />
                            <span>{course.audience}</span>
                          </div>
                        )}
                        {course.instructor && (
                          <div className="flex items-center gap-2">
                            <User size={14} className="text-primary shrink-0" />
                            <span>{course.instructor}</span>
                          </div>
                        )}
                      </div>

                      <a
                        href={`https://wa.me/5511949446881?text=${encodedMsg}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-auto w-full inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground py-3.5 text-xs font-bold uppercase tracking-widest hover:bg-primary/90 transition-all min-h-[44px] active:scale-[0.98] shadow-xs"
                      >
                        Tenho Interesse
                        <ArrowRight size={14} />
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Reference Notice Box */}
          <div className="bg-secondary/15 p-8 sm:p-10 border border-border text-center rounded-sm mt-12">
            <p className="text-base sm:text-lg text-foreground font-medium leading-relaxed">
              No momento não temos inscrições abertas, caso tenha interesse entre em contato pelo WhatsApp:
            </p>
            <div className="mt-6">
              <a
                href="https://wa.me/5511949446881"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-primary px-8 py-3.5 text-xs sm:text-sm font-bold uppercase tracking-widest text-primary-foreground hover:bg-primary/90 transition-all rounded-none shadow-sm"
              >
                Falar no WhatsApp (11) 94944-6881
              </a>
            </div>
          </div>

        </div>
      </section>
    </PublicLayout>
  );
}
