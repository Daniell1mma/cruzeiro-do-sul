import { PublicLayout } from "@/components/layout/PublicLayout";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useListFaqItems } from "@workspace/api-client-react";
import { Link } from "wouter";
import { useSeo } from "@/hooks/useSeo";

const DEFAULT_APOMETRIA_FAQS = [
  {
    id: 1,
    question: "O que acontece durante o desdobramento na sessão?",
    answer: "O paciente permanece confortavelmente deitado e consciente. A equipe de médiuns e operadores realiza o desdobramento dos corpos sutis através de comandos mentais e pulsos magnéticos, atuando na raiz energética das queixas."
  },
  {
    id: 2,
    question: "Quantas sessões de Apometria são necessárias?",
    answer: "Cada caso é individual. Com frequência, uma a três sessões proporcionam o reequilíbrio bioenergético pretendido. Ao término da sessão, a equipe fraterna orienta se há recomendação de retorno."
  },
  {
    id: 3,
    question: "A Apometria tem vínculo com alguma religião específica?",
    answer: "Não. A Apometria é uma técnica terapêutica bioenergética ecumênica. Respeitamos todos os credos e acolhemos pessoas de qualquer crença — ou sem crença — sob a égide da caridade pura e desinteressada."
  }
];

export function Apometria() {
  useSeo({
    title: "O que é Apometria?",
    description: "Entenda a técnica bioenergética de desdobramento anímico desenvolvida pelo Dr. José Lacerda de Azevedo e as 13 Leis da Apometria.",
    canonicalPath: "/apometria",
  });

  const { data: rawFaqItems } = useListFaqItems({ category: "apometria" });
  const faqItems = (Array.isArray(rawFaqItems) && rawFaqItems.length > 0) ? rawFaqItems : DEFAULT_APOMETRIA_FAQS;

  return (
    <PublicLayout>
      {/* Header */}
      <header className="mx-auto max-w-[1400px] px-5 pb-12 pt-20 md:pt-24 md:px-10 text-center md:text-left">
        <p className="eyebrow text-muted-foreground">Fundamentos</p>
        <h1 className="mt-6 font-serif text-4xl sm:text-5xl md:text-6xl text-foreground font-semibold leading-[1.08]">
          O que é Apometria?
        </h1>
      </header>

      {/* Main Content */}
      <section className="mx-auto max-w-[1400px] px-5 pb-24 md:px-10">
        <div className="border-t border-border pt-12">
          <div className="max-w-4xl mx-auto space-y-6 text-foreground/85 text-base sm:text-lg leading-relaxed font-sans font-normal">
            
            <p>
              A Apometria é apresentada pela Fraternidade Cruzeiro do Sul como uma terapia bioenergética que utiliza técnicas de desdobramento do ser humano, trabalhando a relação entre o corpo físico e os chamados corpos sutis ou espirituais.
            </p>
            <p>
              Esse desdobramento é induzido por meio da energia mental e da vontade dirigida do operador, utilizando pulsos ou comandos energéticos mentais.
            </p>

            {/* O Significado */}
            <div className="pt-8">
              <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-foreground mb-4">
                O significado da palavra Apometria
              </h2>
              <p>O termo Apometria tem origem grega e resulta da união de:</p>
              <ul className="mt-4 list-none space-y-2 pl-4 border-l-2 border-primary/30">
                <li><strong className="text-primary font-semibold">APO</strong> — “além de” ou “fora de”</li>
                <li><strong className="text-primary font-semibold">METRON</strong> — “medida” ou “medição”</li>
              </ul>
              <p className="mt-4">
                Assim, o significado é: <strong className="text-primary font-semibold">“Além da medida, além do corpo físico”</strong>.
              </p>
              <p className="mt-4">
                Dentro dessa compreensão, a Apometria consiste em um conjunto de técnicas voltadas ao trabalho com energias e ao desdobramento entre o corpo físico e os corpos sutis ou espirituais.
              </p>
            </div>

            {/* Como surgiu */}
            <div className="pt-10">
              <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-foreground mb-4">
                Como surgiu a Apometria?
              </h2>
              <p>
                O material da Fraternidade apresenta como um dos marcos históricos da técnica o ano de 1963, quando, durante o VI Congresso Espírita Pan-Americano, em Buenos Aires, o farmacêutico-bioquímico e psicoterapeuta Dr. Luiz Rodrigues apresentou uma técnica que vinha utilizando em seus trabalhos, denominada inicialmente Hipnometria.
              </p>
              <p className="mt-4">
                Posteriormente, no Hospital Espírita de Porto Alegre, o médico Dr. José Lacerda de Azevedo tomou conhecimento da técnica e passou a estudá-la e desenvolvê-la. A partir de suas experiências, compreendeu que o método não dependia de hipnose e que o desdobramento poderia ser produzido pela vontade treinada e pela ação mental do operador. Por essa razão, substituiu o nome Hipnometria por Apometria.
              </p>
              <p className="mt-4">
                Dr. Lacerda tornou-se uma das principais referências no desenvolvimento da técnica e publicou as obras “Espírito e Matéria – Novos Horizontes para a Medicina”, em 1977, e “Energia e Espírito – Teoria e Prática da Apometria”, em 1993.
              </p>
            </div>

            {/* Para que é utilizada */}
            <div className="pt-10">
              <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-foreground mb-4">
                Para que é utilizada?
              </h2>
              <p>
                De acordo com o material da Fraternidade, a Apometria é utilizada para trabalhos voltados ao equilíbrio físico, mental e espiritual, incluindo assistência espiritual a encarnados e desencarnados e situações relacionadas a perturbações de natureza física, emocional, psíquica ou espiritual.
              </p>
              <p className="mt-4">
                A técnica também é apresentada como um recurso complementar aos trabalhos de desobsessão, especialmente em situações consideradas mais complexas dentro da abordagem espiritual adotada pela Fraternidade.
              </p>
            </div>

            {/* Apometria e espiritualidade */}
            <div className="pt-10">
              <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-foreground mb-4">
                Apometria e espiritualidade
              </h2>
              <p>
                Um dos princípios mais importantes destacados no material é que a Apometria deve ser praticada com amor, ética, responsabilidade e respeito ao livre-arbítrio.
              </p>
              <p className="mt-4">
                O curso enfatiza que a técnica deve estar fundamentada no propósito de servir e na caridade, colocando o amor acima das diferenças e evitando qualquer utilização que tenha como objetivo obter vantagens pessoais.
              </p>
              <p className="mt-6">
                Por isso, a Fraternidade destaca duas palavras como fundamentais para o trabalho:
              </p>
              <p className="mt-4 font-serif text-2xl sm:text-3xl font-semibold tracking-wider text-primary">
                CONVICÇÃO E FORÇA
              </p>
              <p className="mt-4">
                Convicção naquilo que está sendo realizado, força mental direcionada pela vontade firme e, acima de tudo, amor. O próprio material ressalta que a Apometria exige estudo, disciplina e aprimoramento contínuo de seus trabalhadores.
              </p>
            </div>

            {/* Uma técnica a serviço do ser */}
            <div className="pt-10">
              <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-foreground mb-4">
                Uma técnica a serviço do ser
              </h2>
              <p>
                Para a Fraternidade Cruzeiro do Sul, a Apometria representa uma possibilidade de aprofundamento do trabalho espiritual e energético, sempre orientada pelo propósito de auxiliar e servir.
              </p>

              <blockquote className="mt-8 border-l-4 border-primary pl-6 py-2 italic text-lg sm:text-xl text-primary font-serif font-medium bg-muted/40">
                “Muitos são os caminhos que levam ao Pai. E a Apometria se apresenta como mais uma opção.”
              </blockquote>
            </div>

            <div className="pt-12 text-center">
              <Link
                href="/atendimento"
                className="inline-flex items-center gap-2 bg-primary px-8 py-4 font-sans text-xs sm:text-sm font-semibold uppercase tracking-wider text-primary-foreground hover:bg-primary/90 transition-all rounded-sm min-h-[48px] active:scale-[0.98] shadow-sm"
              >
                Agendar Atendimento Fraterno
              </Link>
            </div>

          </div>

          {/* FAQ Accordion */}
          {Array.isArray(faqItems) && faqItems.length > 0 && (
            <div className="mt-20 pt-16 border-t border-border max-w-4xl mx-auto">
              <h2 className="text-2xl sm:text-3xl font-serif font-semibold text-center mb-8">
                Dúvidas Frequentes sobre Apometria
              </h2>
              <Accordion type="single" collapsible className="w-full">
                {faqItems.map((item) => (
                  <AccordionItem key={item.id} value={`item-${item.id}`}>
                    <AccordionTrigger className="text-left font-sans font-semibold text-base md:text-lg">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-sm md:text-base text-foreground/80 leading-relaxed font-sans font-normal">
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
