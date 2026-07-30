import { PublicLayout } from "@/components/layout/PublicLayout";
import { useListTimelineEvents, useListSettings } from "@workspace/api-client-react";
import { Heart, Eye, Star } from "lucide-react";

export function Fraternidade() {
  const { data: events, isLoading: loadingTimeline } = useListTimelineEvents();
  const { data: settings, isLoading: loadingSettings } = useListSettings();

  const getSetting = (key: string, fallback = "") => {
    return settings?.find((s) => s.key === key)?.value ?? fallback;
  };

  const mission = getSetting(
    "mission",
    "A Fraternidade Cruzeiro do Sul tem como missão primária o acolhimento fraterno e o tratamento espiritual de seres encarnados e desencarnados, utilizando a técnica da Apometria aliada aos ensinamentos do Evangelho do Cristo. Buscamos ser um pronto-socorro espiritual, onde a dor encontra alívio e a ignorância encontra esclarecimento."
  );
  const vision = getSetting(
    "vision",
    "Ser um centro de referência em tratamento espiritual, estudo e prática da Apometria, reconhecido pela seriedade, ética e amorosidade. Almejamos formar trabalhadores conscientes de sua responsabilidade espiritual, multiplicando os pontos de luz na humanidade."
  );
  const values = getSetting(
    "values",
    "Amor Incondicional | Ética e Respeito | Gratuidade | Estudo Contínuo | Humildade"
  );

  const valuesList = values
    .split("|")
    .map((v) => v.trim())
    .filter(Boolean);

  const valueIcons = [
    <Heart className="w-5 h-5" />,
    <Star className="w-5 h-5" />,
    <Eye className="w-5 h-5" />,
  ];

  return (
    <PublicLayout>
      {/* Hero */}
      <section className="bg-muted pt-20 pb-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground">
              A Fraternidade
            </h1>
            <p className="text-xl text-foreground/80 leading-relaxed">
              Conheça quem somos, nossa missão, nossos valores e a jornada de
              amor que nos trouxe até aqui.
            </p>
          </div>
        </div>
      </section>

      {/* Quem Somos */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          {loadingSettings ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full"></div>
            </div>
          ) : (
            <div className="prose prose-lg prose-headings:font-serif prose-headings:text-foreground prose-a:text-primary max-w-none">
              <img
                src="/about.jpg"
                alt="Fraternidade Cruzeiro do Sul"
                className="w-full rounded-2xl shadow-md mb-12 aspect-[21/9] object-cover"
              />

              <h2 className="text-3xl font-bold">Nossa Missão</h2>
              <p>{mission}</p>

              <h2 className="text-3xl font-bold mt-12">Nossa Visão</h2>
              <p>{vision}</p>

              <h2 className="text-3xl font-bold mt-12">Nossos Valores</h2>
              <div className="not-prose grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                {valuesList.map((value, i) => {
                  const parts = value.split(":");
                  const title = parts[0]?.trim();
                  const desc = parts.slice(1).join(":").trim();
                  return (
                    <div
                      key={i}
                      className="flex items-start gap-4 bg-accent/30 rounded-2xl p-5 border border-border/40"
                    >
                      <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary flex-shrink-0 mt-0.5">
                        {valueIcons[i % valueIcons.length]}
                      </div>
                      <div>
                        <p className="font-bold text-foreground">{title}</p>
                        {desc && (
                          <p className="text-sm text-foreground/70 mt-1 leading-relaxed">
                            {desc}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Divisor */}
      <div className="bg-muted h-2 w-full" />

      {/* Nossa História — Timeline */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground">
              Nossa História
            </h2>
            <p className="text-xl text-foreground/70">
              Uma jornada de amor, dedicação e serviço ao próximo.
            </p>
            <div className="w-16 h-1 bg-secondary rounded-full mx-auto"></div>
          </div>

          {loadingTimeline ? (
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
                    <div
                      key={event.id}
                      className="relative flex flex-col md:flex-row items-center gap-8 md:gap-16"
                    >
                      {/* Dot */}
                      <div className="absolute left-4 md:left-1/2 w-8 h-8 bg-secondary rounded-full border-4 border-white shadow-sm transform -translate-x-[15px] md:-translate-x-1/2 flex items-center justify-center z-10">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      </div>

                      {/* Content */}
                      <div
                        className={`w-full md:w-1/2 pl-12 md:pl-0 ${
                          isEven
                            ? "md:pr-16 md:text-right"
                            : "md:order-2 md:pl-16"
                        }`}
                      >
                        <div className="bg-white border border-border p-6 md:p-8 rounded-3xl shadow-sm hover-elevate transition-all">
                          <span className="inline-block bg-primary/10 text-primary font-bold px-3 py-1 rounded-full text-sm mb-4">
                            {event.year}
                          </span>
                          <h3 className="text-2xl font-serif font-bold mb-4">
                            {event.title}
                          </h3>
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

                      {/* Spacer */}
                      <div
                        className={`hidden md:block w-1/2 ${isEven ? "md:order-2" : ""}`}
                      ></div>
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
