import { PublicLayout } from "@/components/layout/PublicLayout";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useListFaqItems } from "@workspace/api-client-react";
import { HelpCircle } from "lucide-react";

export function Faq() {
  const { data: faqItems, isLoading } = useListFaqItems();

  if (isLoading) {
    return (
      <PublicLayout>
        <div className="min-h-[50vh] flex items-center justify-center">
          <div className="animate-pulse flex flex-col items-center">
            <HelpCircle size={40} className="text-muted-foreground mb-4" />
            <div className="text-muted-foreground">Carregando perguntas...</div>
          </div>
        </div>
      </PublicLayout>
    );
  }

  // Group FAQs by category
  const groupedFaqs = faqItems?.reduce((acc, item) => {
    const cat = item.category || 'Geral';
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(item);
    return acc;
  }, {} as Record<string, typeof faqItems>) || {};

  return (
    <PublicLayout>
      <section className="bg-muted pt-20 pb-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto shadow-sm text-primary mb-4">
              <HelpCircle size={32} />
            </div>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground">
              Dúvidas Frequentes
            </h1>
            <p className="text-xl text-foreground/80 leading-relaxed">
              Respostas para as perguntas mais comuns sobre nossa Fraternidade, os tratamentos e a Apometria.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          {Object.entries(groupedFaqs).map(([category, items], index) => (
            <div key={category} className={index > 0 ? "mt-16" : ""}>
              <h2 className="text-2xl font-serif font-bold mb-6 text-primary border-b border-border pb-2 capitalize">
                {category}
              </h2>
              <Accordion type="multiple" className="w-full">
                {items.map((item) => (
                  <AccordionItem key={item.id} value={`item-${item.id}`}>
                    <AccordionTrigger className="text-left font-bold text-lg">{item.question}</AccordionTrigger>
                    <AccordionContent className="text-base text-foreground/80 leading-relaxed">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))}

          {(!faqItems || faqItems.length === 0) && (
            <div className="text-center text-muted-foreground py-12">
              Nenhuma pergunta cadastrada no momento.
            </div>
          )}
        </div>
      </section>
    </PublicLayout>
  );
}
