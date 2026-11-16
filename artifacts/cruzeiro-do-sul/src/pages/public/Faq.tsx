import { PublicLayout } from "@/components/layout/PublicLayout";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useListFaqItems } from "@workspace/api-client-react";
import { HelpCircle, MessageSquare, ArrowRight } from "lucide-react";
import { useState } from "react";
import { Link } from "wouter";
import { useSeo } from "@/hooks/useSeo";

const DEFAULT_FAQS = [
  {
    id: 1,
    category: "Sobre a Fraternidade",
    question: "O que é a Fraternidade Cruzeiro do Sul de Apometria?",
    answer: "A Fraternidade Cruzeiro do Sul de Apometria de Guarulhos é uma Sociedade Beneficente sem fins lucrativos, políticos ou ideológicos, fundada a partir de março de 2004 pelo Professor Francisco Alberto da Eira. Nosso objetivo é o acolhimento fraterno, o estudo e a prática da Apometria e de tratamentos bioenergéticos complementares inteiramente gratuitos."
  },
  {
    id: 2,
    category: "Sobre a Fraternidade",
    question: "Existe algum custo financeiro para os atendimentos?",
    answer: "Não. Todos os nossos atendimentos espirituais e energéticos são 100% gratuitos. Seguimos com fidelidade o princípio crístico: 'Dai de graça o que de graça recebestes'. Nada se cobra, nada se vende."
  },
  {
    id: 3,
    category: "Sobre a Fraternidade",
    question: "Onde fica localizada a Fraternidade e quais são os horários?",
    answer: "Nossos atendimentos presenciais acontecem na sede do espaço Luz e Expansão da Consciência, localizada na Rua Barbacena, 101 B (antigo 75) - Jd. Bom Clima, Guarulhos/SP, às segundas-feiras às 19h (com entrada máxima até 19:30h impreterivelmente) mediante agendamento prévio."
  },
  {
    id: 4,
    category: "Atendimentos e Agendamento",
    question: "Como posso agendar um atendimento?",
    answer: "Os agendamentos são abertos periodicamente às segundas-feiras às 12h através do nosso formulário online oficial ou pelo nosso WhatsApp de contato (11) 94944-6881. Não realizamos pronto-atendimento sem agendamento prévio."
  },
  {
    id: 5,
    category: "Atendimentos e Agendamento",
    question: "Como devo me preparar para o dia do atendimento?",
    answer: "No dia do atendimento: alimentação leve, abstenção de álcool, fumo e energéticos por 24 horas. Use roupas confortáveis e claras (você ficará deitado). É vedado o uso de shorts, bermudas, roupas transparentes, calça legging e decotes, tanto para o paciente quanto para o acompanhante."
  },
  {
    id: 6,
    category: "Atendimentos e Agendamento",
    question: "A Apometria substitui o tratamento médico convencional?",
    answer: "De forma alguma! O tratamento apométrico atua nos campos energéticos e corpos sutis e funciona estritamente como tratamento complementar. Você nunca deve interromper medicamentos ou consultas do seu médico."
  },
  {
    id: 7,
    category: "Atendimentos e Agendamento",
    question: "Idosos e crianças podem ser atendidos?",
    answer: "Sim! Todo paciente idoso, debilitado ou criança menor deverá sempre estar acompanhado de um parente ou responsável legal durante todo o atendimento."
  },
  {
    id: 8,
    category: "Apometria e Doutrina",
    question: "A Apometria é uma religião?",
    answer: "Não. A Apometria não é uma religião, mas uma técnica bioenergética fundamentada em leis anímico-espirituais, desenvolvida inicialmente pelo Dr. Luiz Rodrigues em 1963 e aprofundada pelo médico Dr. José Lacerda de Azevedo. Ela dialoga com princípios da física quântica e com a ética do Evangelho do Cristo."
  },
  {
    id: 9,
    category: "Apometria e Doutrina",
    question: "O que significa a palavra Apometria?",
    answer: "Vem do grego: APO ('além de', 'fora de') e METRON ('medida'). Significa literalmente 'além da medida, além do corpo físico', expressando a capacidade de atuar sobre os corpos sutis através do desdobramento anímico induzido pela vontade e força mental dos operadores."
  },
  {
    id: 10,
    category: "Cursos e Formação",
    question: "Como participar dos cursos de formação em Apometria?",
    answer: "A Fraternidade oferece cursos presenciais e online periodicamente. Quando novas turmas são abertas, divulgamos em nossa página de Cursos e redes sociais. Você também pode manifestar seu interesse diretamente pelo nosso WhatsApp oficial."
  }
];

type FaqItemDisplay = {
  id: number;
  category?: string | null;
  question: string;
  answer: string;
};

export function Faq() {
  useSeo({
    title: "Dúvidas Frequentes (FAQ)",
    description: "Perguntas frequentes sobre o que é Apometria, gratuidade dos atendimentos fraternos, preparação e agendamento prévio.",
    canonicalPath: "/faq",
  });

  const { data: faqItems, isLoading } = useListFaqItems();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const itemsToUse: FaqItemDisplay[] = (Array.isArray(faqItems) && faqItems.length > 0) ? faqItems : DEFAULT_FAQS;

  // Extract unique categories
  const categories = ["all", ...Array.from(new Set(itemsToUse.map(item => item.category || "Geral")))];

  // Filter items
  const filteredItems = selectedCategory === "all"
    ? itemsToUse
    : itemsToUse.filter(item => (item.category || "Geral") === selectedCategory);

  // Group filtered FAQs by category
  const groupedFaqs = filteredItems.reduce<Record<string, FaqItemDisplay[]>>((acc, item) => {
    const cat = item.category || 'Geral';
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(item);
    return acc;
  }, {});

  return (
    <PublicLayout>
      {/* Header */}
      <section className="bg-muted pt-14 pb-12 md:pt-20 md:pb-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center space-y-4 md:space-y-6">
            <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center mx-auto shadow-sm text-primary mb-3">
              <HelpCircle size={28} />
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-foreground">
              Dúvidas Frequentes
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-foreground/80 leading-relaxed">
              Respostas claras sobre a Fraternidade Cruzeiro do Sul, os tratamentos energéticos, agendamentos e a técnica da Apometria.
            </p>
          </div>
        </div>
      </section>

      {/* Category Filter Pills */}
      <section className="py-4 md:py-6 border-b border-border bg-white sticky top-[68px] z-30 shadow-xs">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-wrap items-center justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider transition-all min-h-[38px] active:scale-95 ${
                  selectedCategory === cat
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "bg-muted text-foreground/80 hover:bg-muted/80 hover:text-primary"
                }`}
              >
                {cat === "all" ? "Todas as Dúvidas" : cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Accordion List */}
      <section className="py-12 md:py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          {isLoading ? (
            <div className="flex justify-center py-20">
              <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full"></div>
            </div>
          ) : Object.keys(groupedFaqs).length === 0 ? (
            <div className="text-center py-16 bg-muted/40 rounded-2xl border border-border">
              <p className="text-muted-foreground">Nenhuma pergunta encontrada nesta categoria.</p>
            </div>
          ) : (
            Object.entries(groupedFaqs).map(([category, items], index) => (
              <div key={category} className={index > 0 ? "mt-12 sm:mt-16" : ""}>
                <h2 className="text-xl sm:text-2xl font-serif font-bold mb-4 sm:mb-6 text-primary border-b border-border pb-2">
                  {category}
                </h2>
                <Accordion type="multiple" className="w-full divide-y divide-border border-y border-border">
                  {items.map((item) => (
                    <AccordionItem key={item.id} value={`item-${item.id}`} className="border-b-0">
                      <AccordionTrigger className="text-left font-bold text-base sm:text-lg py-4 hover:text-primary transition-colors hover:no-underline">
                        {item.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-sm sm:text-base text-foreground/80 leading-relaxed pb-4">
                        {item.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            ))
          )}

          {/* CTA Box */}
          <div className="mt-16 sm:mt-20 bg-muted/40 border border-border p-6 sm:p-10 rounded-sm text-center">
            <MessageSquare className="w-10 h-10 text-primary mx-auto mb-3" />
            <h3 className="font-serif text-2xl font-bold text-foreground mb-2">
              Não encontrou a resposta que procurava?
            </h3>
            <p className="text-muted-foreground text-sm sm:text-base max-w-xl mx-auto mb-6">
              Nossa equipe de voluntários está à disposição para esclarecer suas dúvidas sobre agendamentos e a Fraternidade.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href="https://wa.me/5511949446881"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba5a] text-white px-6 py-3.5 text-xs font-bold uppercase tracking-widest shadow transition-all active:scale-95"
              >
                Falar no WhatsApp
              </a>
              <Link
                href="/atendimento"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3.5 text-xs font-bold uppercase tracking-widest shadow transition-all active:scale-95"
              >
                Agendar Atendimento <ArrowRight size={14} />
              </Link>
            </div>
          </div>

        </div>
      </section>
    </PublicLayout>
  );
}
