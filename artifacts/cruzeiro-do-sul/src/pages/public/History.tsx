import { PublicLayout } from "@/components/layout/PublicLayout";
import { useListTimelineEvents } from "@workspace/api-client-react";

export function History() {
  const { data: events, isLoading } = useListTimelineEvents();

  return (
    <PublicLayout>
      <section className="bg-muted pt-20 pb-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground">
              Nossa História
            </h1>
            <p className="text-xl text-foreground/80 leading-relaxed">
              Uma jornada de amor, dedicação e serviço ao próximo. Conheça os marcos da nossa fundação.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white min-h-[50vh]">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          {isLoading ? (
            <div className="flex justify-center py-20">
              <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full"></div>
            </div>
          ) : !events || events.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-muted-foreground">História em construção.</p>
            </div>
          ) : (
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-border transform md:-translate-x-1/2"></div>
              
              <div className="space-y-16">
                {events.map((event, index) => {
                  const isEven = index % 2 === 0;
                  
                  return (
                    <div key={event.id} className="relative flex flex-col md:flex-row items-center gap-8 md:gap-16">
                      
                      {/* Timeline Dot */}
                      <div className="absolute left-4 md:left-1/2 w-8 h-8 bg-secondary rounded-full border-4 border-white shadow-sm transform -translate-x-[15px] md:-translate-x-1/2 flex items-center justify-center z-10">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      </div>

                      {/* Content - Left side on desktop for even items */}
                      <div className={`w-full md:w-1/2 pl-12 md:pl-0 ${isEven ? 'md:pr-16 md:text-right' : 'md:order-2 md:pl-16'}`}>
                        <div className="bg-card border border-border p-6 md:p-8 rounded-3xl shadow-sm hover-elevate transition-all">
                          <span className="inline-block bg-primary/10 text-primary font-bold px-3 py-1 rounded-full text-sm mb-4">
                            {event.year}
                          </span>
                          <h3 className="text-2xl font-serif font-bold mb-4">{event.title}</h3>
                          <p className="text-foreground/70 leading-relaxed">
                            {event.text}
                          </p>
                          {event.imageUrl && (
                            <img 
                              src={event.imageUrl} 
                              alt={event.title} 
                              className="mt-6 w-full rounded-xl aspect-video object-cover"
                            />
                          )}
                        </div>
                      </div>
                      
                      {/* Empty space for the other side on desktop */}
                      <div className={`hidden md:block w-1/2 ${isEven ? 'md:order-2' : ''}`}></div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </section>
    </PublicLayout>
  );
}
