import { PublicLayout } from "@/components/layout/PublicLayout";
import { useListCourses } from "@workspace/api-client-react";
import { Clock, Users, ArrowRight, User } from "lucide-react";
import { Link } from "wouter";

export function Courses() {
  const { data: courses, isLoading } = useListCourses();

  const getStatusConfig = (status: string) => {
    switch(status) {
      case 'open': return { label: 'Inscrições Abertas', color: 'bg-green-100 text-green-800 border-green-200' };
      case 'upcoming': return { label: 'Em Breve', color: 'bg-blue-100 text-blue-800 border-blue-200' };
      case 'closed': return { label: 'Encerrado', color: 'bg-gray-100 text-gray-800 border-gray-200' };
      default: return { label: status, color: 'bg-gray-100 text-gray-800' };
    }
  };

  return (
    <PublicLayout>
      <section className="bg-muted pt-20 pb-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground">
              Cursos e Estudos
            </h1>
            <p className="text-xl text-foreground/80 leading-relaxed">
              A fé raciocinada liberta. Conheça nossos grupos de estudo e cursos de aprimoramento mediúnico e apométrico.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white min-h-[50vh]">
        <div className="container mx-auto px-4 md:px-6">
          {isLoading ? (
            <div className="flex justify-center py-20">
              <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full"></div>
            </div>
          ) : !courses || courses.length === 0 ? (
            <div className="text-center py-20 bg-muted/50 rounded-3xl border border-border">
              <h3 className="text-xl font-serif font-bold mb-2">Nenhum curso disponível</h3>
              <p className="text-muted-foreground">No momento não temos turmas abertas. Volte em breve.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {courses.map((course) => {
                const status = getStatusConfig(course.status);
                return (
                  <div key={course.id} className="group flex flex-col bg-card border border-border rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-all">
                    <div className="aspect-video relative overflow-hidden bg-muted">
                      <img 
                        src={course.imageUrl || "/course1.jpg"} 
                        alt={course.name} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className={`absolute top-4 left-4 border px-3 py-1.5 rounded-full text-xs font-bold backdrop-blur-md ${status.color}`}>
                        {status.label}
                      </div>
                    </div>
                    
                    <div className="p-6 flex-1 flex flex-col">
                      <h2 className="text-2xl font-serif font-bold mb-3 group-hover:text-primary transition-colors">{course.name}</h2>
                      <p className="text-foreground/70 mb-6 flex-1 line-clamp-3 leading-relaxed">
                        {course.description}
                      </p>
                      
                      <div className="space-y-3 mb-6 bg-accent/30 p-4 rounded-xl text-sm">
                        {course.duration && (
                          <div className="flex items-center gap-3 text-foreground/80">
                            <Clock size={16} className="text-primary" />
                            <span>{course.duration}</span>
                          </div>
                        )}
                        {course.audience && (
                          <div className="flex items-center gap-3 text-foreground/80">
                            <Users size={16} className="text-primary" />
                            <span>{course.audience}</span>
                          </div>
                        )}
                        {course.instructor && (
                          <div className="flex items-center gap-3 text-foreground/80">
                            <User size={16} className="text-primary" />
                            <span>{course.instructor}</span>
                          </div>
                        )}
                      </div>
                      
                      <Link 
                        href="/contato" 
                        className="mt-auto w-full inline-flex items-center justify-center gap-2 rounded-xl bg-white border border-primary text-primary px-4 py-3 text-sm font-bold hover:bg-primary hover:text-white transition-colors"
                      >
                        Tenho Interesse
                        <ArrowRight size={16} />
                      </Link>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </section>
    </PublicLayout>
  );
}
