import { PublicLayout } from "@/components/layout/PublicLayout";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useListFaqItems } from "@workspace/api-client-react";

export function Apometria() {
  const { data: faqItems } = useListFaqItems({ category: "apometria" });

  return (
    <PublicLayout>
      <section className="bg-muted pt-14 pb-12 md:pt-20 md:pb-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center space-y-4 md:space-y-6">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-foreground">
              O que é Apometria?
            </h1>
            <p className="text-lg md:text-xl text-foreground/80 leading-relaxed">
              Uma técnica terapêutica espiritual baseada no desdobramento induzido dos corpos sutis.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <div className="prose prose-base md:prose-lg prose-headings:font-serif prose-headings:text-foreground max-w-none mb-16 md:mb-20">
            <img
              src="/apometria.jpg"
              alt="Representação da energia apométrica"
              className="w-full rounded-2xl shadow-sm mb-8 md:mb-12 aspect-[16/9] md:aspect-[21/9] object-cover border border-border"
            />

            <p className="lead text-lg md:text-2xl text-primary font-serif italic text-center mb-8 md:mb-12">
              "Apometria não é religião, é uma técnica de tratamento espiritual calcada em princípios físicos e energéticos."
            </p>

            <h3>Origem e Definição</h3>
            <p>
              O termo Apometria vem do grego <em>"apo"</em> (além de, separar) e <em>"metron"</em> (medida), significando o desdobramento ou separação dos corpos sutis do ser humano. A técnica foi sistematizada na década de 1960 pelo Dr. José Lacerda de Azevedo, médico e espírita brasileiro, no Hospital Espírita de Porto Alegre.
            </p>

            <h3>Como funciona?</h3>
            <p>
              Através de comandos verbais e emissão de energia (pulsos magnéticos), o grupo de trabalhadores (médiuns) induz a separação temporária dos corpos espirituais do paciente. Isso permite que a equipe espiritual superior acesse traumas profundos, resgates de vidas passadas, cordões energéticos negativos e obsessores que estejam prejudicando a saúde física ou mental do atendido.
            </p>
            <p>
              O paciente, durante o processo, pode estar presente fisicamente ou ser tratado à distância (apometria à distância), pois no plano espiritual não há barreiras de espaço ou tempo.
            </p>

            <h3>Leis da Apometria</h3>
            <p>
              O Dr. Lacerda catalogou 13 leis fundamentais que regem a Apometria, baseadas na física quântica e nas leis morais. A principal delas é a <strong>Lei do Desdobramento Espiritual</strong>, que permite a dissociação dos corpos e o trabalho em múltiplas dimensões simultaneamente.
            </p>
          </div>

          {faqItems && faqItems.length > 0 && (
            <div className="mt-12 md:mt-16 pt-12 md:pt-16 border-t border-border">
              <h2 className="text-2xl md:text-3xl font-serif font-bold text-center mb-8 md:mb-10">
                Dúvidas Frequentes sobre Apometria
              </h2>
              <Accordion type="single" collapsible className="w-full">
                {faqItems.map((item) => (
                  <AccordionItem key={item.id} value={`item-${item.id}`}>
                    <AccordionTrigger className="text-left font-bold text-base md:text-lg">{item.question}</AccordionTrigger>
                    <AccordionContent className="text-sm md:text-base text-foreground/80 leading-relaxed">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          )}
        </div>
      </section>
    </PublicLayout>
  );
}
