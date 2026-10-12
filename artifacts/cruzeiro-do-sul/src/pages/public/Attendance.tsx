import { PublicLayout } from "@/components/layout/PublicLayout";
import { useListSettings } from "@workspace/api-client-react";
import { CheckCircle2, AlertCircle, Clock, HeartHandshake, ExternalLink } from "lucide-react";

export function Attendance() {
  const { data: settings } = useListSettings();
  const formUrl = (Array.isArray(settings) ? settings.find(s => s.key === "attendance_form_url")?.value : "") || "#";

  return (
    <PublicLayout>
      {/* Header */}
      <section className="bg-muted pt-14 pb-12 md:pt-20 md:pb-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center space-y-4 md:space-y-6">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-foreground">
              Atendimento Fraterno
            </h1>
            <p className="text-lg md:text-xl text-foreground/80 leading-relaxed">
              Um espaço de escuta, acolhimento e direcionamento espiritual. Estamos aqui para ajudar você a encontrar seu equilíbrio.
            </p>
          </div>
        </div>
      </section>

      <section className="py-14 md:py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start max-w-6xl mx-auto">

            {/* Left: Info */}
            <div className="space-y-8 md:space-y-10">
              <div className="space-y-4">
                <h2 className="text-2xl md:text-3xl font-serif font-bold">Como funciona?</h2>
                <p className="text-foreground/80 leading-relaxed">
                  O atendimento em nossa Fraternidade é <strong>100% gratuito</strong> e realizado por voluntários preparados. Nosso objetivo é oferecer suporte espiritual através da Apometria e de passes magnéticos.
                </p>
              </div>

              <div className="space-y-6">
                {[
                  {
                    n: "1",
                    title: "Preencha a Ficha",
                    desc: "O primeiro passo é preencher nosso formulário de triagem online. Ele nos ajuda a entender melhor o seu caso antes mesmo de você chegar."
                  },
                  {
                    n: "2",
                    title: "Aguarde o Contato",
                    desc: "Nossa equipe de triagem avaliará sua ficha e entrará em contato (geralmente via WhatsApp) para agendar o dia e horário do seu atendimento presencial."
                  },
                  {
                    n: "3",
                    title: "Compareça à Sessão",
                    desc: "No dia marcado, venha com roupas claras e confortáveis, e o coração aberto para receber o auxílio espiritual."
                  }
                ].map(({ n, title, desc }) => (
                  <div key={n} className="flex gap-4">
                    <div className="w-11 h-11 rounded-full bg-accent flex items-center justify-center shrink-0">
                      <span className="font-bold text-primary text-lg">{n}</span>
                    </div>
                    <div>
                      <h3 className="text-lg md:text-xl font-bold mb-1.5">{title}</h3>
                      <p className="text-foreground/70 leading-relaxed text-sm md:text-base">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Action Card — NOT sticky on mobile */}
            <div className="bg-primary text-primary-foreground rounded-3xl p-7 sm:p-8 shadow-xl lg:sticky lg:top-28">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center">
                  <HeartHandshake size={34} className="text-secondary" />
                </div>
              </div>

              <h3 className="text-xl md:text-2xl font-serif font-bold text-center mb-3">Solicitar Ajuda</h3>
              <p className="text-center text-white/80 mb-8 text-sm md:text-base">
                O formulário é rápido, seguro e todas as suas informações são tratadas com absoluto sigilo.
              </p>

              <div className="space-y-3.5 mb-8 text-sm text-white/90">
                <div className="flex items-center gap-3">
                  <CheckCircle2 size={17} className="text-secondary shrink-0" />
                  <span>Atendimento totalmente gratuito</span>
                </div>
                <div className="flex items-center gap-3">
                  <AlertCircle size={17} className="text-secondary shrink-0" />
                  <span>Sigilo absoluto das informações</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock size={17} className="text-secondary shrink-0" />
                  <span>Resposta em até 48 horas úteis</span>
                </div>
              </div>

              <a
                href={formUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 rounded-full bg-secondary hover:bg-secondary/90 text-white py-4 text-base font-bold shadow-lg transition-transform hover:-translate-y-1 active:translate-y-0"
              >
                Preencher Ficha de Atendimento
                <ExternalLink size={18} />
              </a>
            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
