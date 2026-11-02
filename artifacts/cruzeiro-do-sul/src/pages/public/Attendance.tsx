import { PublicLayout } from "@/components/layout/PublicLayout";
import { useListSettings } from "@workspace/api-client-react";

const prepRules = [
  { n: "01", text: "Alimentação leve no dia;", isWarning: false },
  { n: "02", text: "Evite álcool, fumo e energéticos por 24 horas.", isWarning: false },
  { n: "03", text: "Horário máximo de entrada: 19:30 H (impreterivelmente).", isWarning: false },
  { n: "04", text: "Use roupas confortáveis; você ficará deitado.", isWarning: false },
  { n: "05", text: "É vedado o uso de shorts, bermudas, roupas transparentes, calça legging e decotes, tanto para o atendido quanto para o acompanhante.", isWarning: false },
  { n: "06", text: "Todo paciente idoso ou debilitado deverá sempre ser acompanhado de um parente ou responsável, o mesmo com crianças menores.", isWarning: false },
  { n: "07", text: "O tratamento apométrico não substitui o tratamento médico, funcionando como tratamento complementar; assim, continue com as orientações médicas.", isWarning: true },
];

export function Attendance() {
  const { data: settings } = useListSettings();
  const formUrl = (Array.isArray(settings) ? settings.find(s => s.key === "attendance_form_url")?.value : "") || "https://forms.gle/cPm5uMeJW74AvjNo8";

  return (
    <PublicLayout>
      {/* Header */}
      <header className="mx-auto max-w-[1400px] px-5 pb-8 pt-20 md:pt-24 md:px-10 text-center">
        <p className="eyebrow text-muted-foreground">Serviço gratuito</p>
        <h1 className="mt-6 font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.05] text-foreground font-bold">
          Como se preparar para os atendimentos
        </h1>
      </header>

      {/* Preparation Steps List */}
      <section className="mx-auto max-w-[1400px] px-5 py-6 md:px-10">
        <div className="flex flex-col items-center text-center">
          <div className="max-w-2xl w-full">
            <ul className="mt-4 border-t border-border">
              {prepRules.map((rule) => (
                <li key={rule.n} className="flex items-start gap-6 border-b border-border py-5 text-left">
                  <span className="eyebrow text-accent font-bold pt-0.5">{rule.n}</span>
                  <span className={`leading-relaxed text-sm sm:text-base ${
                    rule.isWarning 
                      ? "text-foreground font-bold italic text-base sm:text-lg border-l-2 border-primary pl-3 py-1 bg-primary/5"
                      : "text-muted-foreground"
                  }`}>
                    {rule.text}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-10 mb-8">
              <a
                href={formUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-primary px-8 py-4 text-xs sm:text-sm font-bold uppercase tracking-widest text-primary-foreground hover:bg-primary/90 transition-all shadow-md rounded-none"
              >
                Agendar Atendimento
              </a>
              <p className="mt-3 text-xs text-muted-foreground">
                Atendimentos realizados às segundas-feiras, às 19h.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pós-Atendimento Section (Navy Blue Band) */}
      <section className="bg-secondary text-secondary-foreground py-20 md:py-24 mt-8">
        <div className="mx-auto max-w-[1400px] px-5 md:px-10">
          <div className="max-w-2xl mx-auto text-center">
            <p className="eyebrow text-accent-foreground/70 mb-6 font-semibold">Pós-Atendimento</p>
            <article>
              <h3 className="font-serif text-3xl sm:text-4xl text-white font-bold mb-6">
                Orientações Gerais
              </h3>
              <p className="text-secondary-foreground/90 leading-relaxed text-lg sm:text-xl italic font-medium">
                Após a sessão de apometria, você receberá orientações do grupo de apoio que serão desde, orações, dietas sugeridas e curativos energéticos.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* Spacing */}
      <div className="h-16"></div>
    </PublicLayout>
  );
}
