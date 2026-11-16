import { PublicLayout } from "@/components/layout/PublicLayout";
import { useListTimelineEvents, useListSettings } from "@workspace/api-client-react";
import { Heart, Eye, Star } from "lucide-react";
import { useSeo } from "@/hooks/useSeo";

const DEFAULT_TIMELINE_EVENTS = [
  {
    id: 1,
    year: "2004",
    title: "O Início com o Prof. Francisco Alberto da Eira",
    text: "Em março de 2004, o Professor Francisco Alberto da Eira, precursor da Apometria em São Paulo, realizou a palestra 'O que é Apometria', marcando o início da formação dos 11 membros fundadores e do primeiro curso de 44 aulas.",
    imageUrl: "/assets-reference/hero.webp"
  },
  {
    id: 2,
    year: "2010",
    title: "Consolidação dos Atendimentos Fraternos",
    text: "Estruturação dos atendimentos bioenergéticos gratuitos com foco na caridade e no alívio de desordens físicas, psíquicas e espirituais sob as diretrizes do Evangelho e da ética apométrica.",
    imageUrl: "/assets-reference/session-inside.webp"
  },
  {
    id: 3,
    year: "2018",
    title: "Expansão Pedagógica e Formação Contínua",
    text: "Coordenação pedagógica desenvolvendo materiais de estudo, atualizações à luz da medicina vibracional e formação de novas turmas de trabalhadores voluntários.",
    imageUrl: "/assets-reference/portas-abertas.webp"
  },
  {
    id: 4,
    year: "2025 / 2026",
    title: "21 Anos de Amor, Cura e Merecimento",
    text: "Comemoração de mais de duas décadas de dedicação fraterna, atendimentos gratuitos e acolhimento incondicional à comunidade na sede Luz e Expansão da Consciência.",
    imageUrl: ""
  }
];

export function Fraternidade() {
  useSeo({
    title: "A Fraternidade",
    description: "Conheça quem somos, nossa missão, nossos valores e nossa trajetória a serviço do bem, da caridade e da cura espiritual.",
    canonicalPath: "/a-fraternidade",
  });

  const { data: events, isLoading: loadingTimeline } = useListTimelineEvents();
  const { data: settings, isLoading: loadingSettings } = useListSettings();

  const timelineEvents = (Array.isArray(events) && events.length > 0) ? events : DEFAULT_TIMELINE_EVENTS;

  const getSetting = (key: string, fallback = "") => {
    return Array.isArray(settings) ? (settings.find((s) => s.key === key)?.value ?? fallback) : fallback;
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
    <Heart key="heart" className="w-5 h-5" />,
    <Star key="star" className="w-5 h-5" />,
    <Eye key="eye" className="w-5 h-5" />,
  ];

  return (
    <PublicLayout>
      {/* Hero */}
      <section className="bg-muted pt-14 pb-12 md:pt-20 md:pb-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center space-y-4 md:space-y-6">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-foreground">
              A Fraternidade
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-foreground/80 leading-relaxed">
              Conheça quem somos, nossa missão, nossos valores e a jornada de
              amor que nos trouxe até aqui.
            </p>
          </div>
        </div>
      </section>

      {/* Quem Somos */}
      <section className="py-12 md:py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          {loadingSettings ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full"></div>
            </div>
          ) : (
            <div className="prose prose-lg prose-headings:font-serif prose-headings:text-foreground prose-a:text-primary max-w-none">
              <img
                src="/assets-reference/portas-abertas.webp"
                alt="Fraternidade Cruzeiro do Sul"
                className="w-full rounded-sm shadow-md mb-12 aspect-[21/9] object-cover border border-border"
              />

              <div className="bg-muted/50 p-6 md:p-8 rounded-sm border border-border mb-12 not-prose">
                <p className="eyebrow text-muted-foreground mb-2">Quem Somos</p>
                <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-4">
                  Fraternidade Cruzeiro do Sul de Apometria de Guarulhos
                </h2>
                <p className="text-foreground/80 leading-relaxed text-base md:text-lg mb-3">
                  A Fraternidade Cruzeiro do Sul nasceu de um propósito de estudo, aprendizado e serviço, voltado ao desenvolvimento integral do ser e à busca por caminhos complementares de cuidado e equilíbrio.
                </p>
                <p className="text-foreground/80 leading-relaxed text-base md:text-lg">
                  Somos uma Sociedade Beneficente, sem fins lucrativos, políticos ou ideológicos, que tem como finalidade estudar e aprofundar o desenvolvimento mental e físico do ser, além de oferecer tratamentos energéticos alternativos e complementares à saúde física, mental, emocional e espiritual, por meio da terapia vibracional (Medicina Vibracional).
                </p>
              </div>

              <h2 className="text-3xl font-bold font-serif">Nossa Missão</h2>
              <p>{mission}</p>

              <h2 className="text-3xl font-bold font-serif mt-12">Nossa Visão</h2>
              <p>{vision}</p>

              <h2 className="text-3xl font-bold font-serif mt-12">Nossos Princípios Fundamentais</h2>
              <div className="not-prose grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                {valuesList.map((value, i) => {
                  const parts = value.split(":");
                  const title = parts[0]?.trim();
                  const desc = parts.slice(1).join(":").trim();
                  return (
                    <div
                      key={i}
                      className="flex items-start gap-4 bg-muted/40 rounded-sm p-5 border border-border"
                    >
                      <div className="w-10 h-10 bg-primary/10 rounded-sm flex items-center justify-center text-primary flex-shrink-0 mt-0.5">
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
      <section className="py-16 md:py-24 bg-muted">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <div className="text-center mb-16 space-y-4">
            <p className="eyebrow text-muted-foreground">Mais de Duas Décadas</p>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground">
              Nossa História
            </h2>
            <p className="text-lg sm:text-xl text-foreground/70 max-w-2xl mx-auto">
              Uma jornada de amor, dedicação voluntária e acolhimento espiritual iniciada em 2004.
            </p>
            <div className="w-16 h-1 bg-secondary rounded-full mx-auto"></div>
          </div>

          {loadingTimeline ? (
            <div className="flex justify-center py-20">
              <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full"></div>
            </div>
          ) : (
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-border transform md:-translate-x-1/2"></div>

              <div className="space-y-12 md:space-y-16">
                {timelineEvents.map((event, index) => {
                  const isEven = index % 2 === 0;
                  return (
                    <div
                      key={event.id}
                      className="relative flex flex-col md:flex-row items-center gap-6 md:gap-12"
                    >
                      {/* Dot */}
                      <div className="absolute left-4 md:left-1/2 w-8 h-8 bg-primary rounded-full border-4 border-white shadow-md transform -translate-x-[15px] md:-translate-x-1/2 flex items-center justify-center z-10">
                        <div className="w-2.5 h-2.5 bg-white rounded-full"></div>
                      </div>

                      {/* Content */}
                      <div
                        className={`w-full md:w-1/2 pl-12 md:pl-0 ${
                          isEven
                            ? "md:pr-12 md:text-right"
                            : "md:order-2 md:pl-12"
                        }`}
                      >
                        <div className="bg-white border border-border p-6 md:p-8 rounded-sm shadow-sm hover:shadow-md transition-all">
                          <span className="inline-block bg-primary/10 text-primary font-bold px-3 py-1 rounded-sm text-xs uppercase tracking-wider mb-3">
                            {event.year}
                          </span>
                          <h3 className="text-xl md:text-2xl font-serif font-bold mb-3 text-foreground">
                            {event.title}
                          </h3>
                          <p className="text-foreground/75 leading-relaxed text-sm sm:text-base">
                            {event.text}
                          </p>
                          {event.imageUrl && (
                            <img
                              src={event.imageUrl}
                              alt={event.title}
                              className="mt-4 w-full rounded-sm aspect-video object-cover border border-border"
                              loading="lazy"
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

              {/* Complete history and attendance CTA */}
              <div className="mt-16 text-center space-y-4 pt-8">
                <div>
                  <a
                    href="/historia"
                    className="eyebrow rule-link text-primary font-bold text-sm inline-block"
                  >
                    Ler a história institucional completa dos 21 anos &rarr;
                  </a>
                </div>
                <div>
                  <a
                    href="/atendimento"
                    className="inline-flex items-center gap-2 bg-primary px-8 py-3.5 text-xs sm:text-sm font-bold uppercase tracking-widest text-primary-foreground hover:bg-primary/90 transition-all rounded-none min-h-[44px] active:scale-[0.98] shadow-sm"
                  >
                    Agendar Atendimento
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </PublicLayout>
  );
}
