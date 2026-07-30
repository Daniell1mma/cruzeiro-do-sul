import { PublicLayout } from "@/components/layout/PublicLayout";
import { useListSettings } from "@workspace/api-client-react";
import { CheckCircle2, AlertCircle, Clock, HeartHandshake, ExternalLink } from "lucide-react";

export function Attendance() {
  const { data: settings } = useListSettings();
  const formUrl = settings?.find(s => s.key === "attendance_form_url")?.value || "#";

  return (
    <PublicLayout>
      {/* Header */}
      <section className="bg-muted pt-20 pb-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground">
              Atendimento Fraterno
            </h1>
            <p className="text-xl text-foreground/80 leading-relaxed">
              Um espaço de escuta, acolhimento e direcionamento espiritual. Estamos aqui para ajudar você a encontrar seu equilíbrio.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start max-w-6xl mx-auto">
            
            {/* Left: Info */}
            <div className="space-y-10">
              <div className="space-y-4">
                <h2 className="text-3xl font-serif font-bold">Como funciona?</h2>
                <p className="text-foreground/80 leading-relaxed">
                  O atendimento em nossa Fraternidade é <strong>100% gratuito</strong> e realizado por voluntários preparados. Nosso objetivo é oferecer suporte espiritual através da Apometria e de passes magnéticos.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center shrink-0">
                    <span className="font-bold text-primary text-xl">1</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Preencha a Ficha</h3>
                    <p className="text-foreground/70 leading-relaxed">
                      O primeiro passo é preencher nosso formulário de triagem online. Ele nos ajuda a entender melhor o seu caso antes mesmo de você chegar.
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center shrink-0">
                    <span className="font-bold text-primary text-xl">2</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Aguarde o Contato</h3>
                    <p className="text-foreground/70 leading-relaxed">
                      Nossa equipe de triagem avaliará sua ficha e entrará em contato (geralmente via WhatsApp) para agendar o dia e horário do seu atendimento presencial.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center shrink-0">
                    <span className="font-bold text-primary text-xl">3</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Compareça à Sessão</h3>
                    <p className="text-foreground/70 leading-relaxed">
                      No dia marcado, venha com roupas claras e confortáveis, e o coração aberto para receber o auxílio espiritual.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Action Card */}
            <div className="bg-primary text-primary-foreground rounded-3xl p-8 md:p-12 shadow-xl sticky top-32">
              <div className="flex justify-center mb-8">
                <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center">
                  <HeartHandshake size={40} className="text-secondary" />
                </div>
              </div>
              
              <h3 className="text-2xl font-serif font-bold text-center mb-4">Solicitar Ajuda</h3>
              <p className="text-center text-white/80 mb-10">
                O formulário é rápido, seguro e todas as suas informações são tratadas com absoluto sigilo.
              </p>

              <div className="space-y-4 mb-10 text-sm text-white/90">
                <div className="flex items-center gap-3">
                  <CheckCircle2 size={18} className="text-secondary" />
                  <span>Atendimento totalmente gratuito</span>
                </div>
                <div className="flex items-center gap-3">
                  <AlertCircle size={18} className="text-secondary" />
                  <span>Sigilo absoluto das informações</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock size={18} className="text-secondary" />
                  <span>Resposta em até 48 horas úteis</span>
                </div>
              </div>

              <a 
                href={formUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 rounded-full bg-secondary hover:bg-secondary/90 text-white py-5 text-lg font-bold shadow-lg transition-transform hover:-translate-y-1"
              >
                Preencher Ficha de Atendimento
                <ExternalLink size={20} />
              </a>
            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
