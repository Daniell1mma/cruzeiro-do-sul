import { PublicLayout } from "@/components/layout/PublicLayout";
import { useListSettings } from "@workspace/api-client-react";
import { useState } from "react";
import { Send, CheckCircle2 } from "lucide-react";

export function Contact() {
  const { data: settings } = useListSettings();

  const getSetting = (key: string) => Array.isArray(settings) ? (settings.find(s => s.key === key)?.value || "") : "";

  const address = getSetting("address") || "Rua Barbacena, 101 B (antigo 75)\nJd. Bom Clima — Guarulhos, SP";
  const email = getSetting("email") || "fraternidadecruzeirodosulguaru@gmail.com";
  const phone = getSetting("phone") || "(11) 94944-6881";
  const facebook = getSetting("facebook") || "facebook.com/ApometriaGuarulhos";

  const [formSent, setFormSent] = useState(false);

  return (
    <PublicLayout>
      {/* Header */}
      <header className="mx-auto max-w-[1400px] px-5 pb-12 pt-20 md:pt-24 md:px-10 text-center md:text-left">
        <p className="eyebrow text-muted-foreground">Estamos por perto</p>
        <h1 className="mt-6 font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.05] text-foreground font-bold">
          Contato
        </h1>
      </header>

      {/* Main Grid: Info + Map */}
      <section className="mx-auto max-w-[1400px] px-5 pb-20 md:px-10">
        <div className="grid gap-12 border-t border-border pt-12 md:grid-cols-2 items-start">
          
          {/* Info Side */}
          <div className="flex flex-col gap-8">
            <div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-foreground mb-6">
                Onde estamos
              </h2>
              <div className="space-y-6">
                <div>
                  <p className="eyebrow text-muted-foreground">Nome da sede</p>
                  <p className="text-xl sm:text-2xl font-bold font-serif text-primary mt-1">
                    Luz e Expansão da Consciência
                  </p>
                </div>

                <div>
                  <p className="eyebrow text-muted-foreground">Endereço</p>
                  <p className="text-base sm:text-lg leading-relaxed mt-1 text-foreground whitespace-pre-line font-medium">
                    {address}
                  </p>
                </div>

                <div>
                  <p className="eyebrow text-muted-foreground">Informação complementar</p>
                  <p className="text-base sm:text-lg leading-relaxed mt-1 text-foreground/80">
                    Atendimentos às segundas-feiras, às 19h, mediante agendamento prévio.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-8 border-t border-border space-y-4">
              <div>
                <p className="eyebrow text-muted-foreground">Telefone e WhatsApp</p>
                <p className="mt-1 text-base sm:text-lg font-medium text-foreground">
                  <a href={`https://wa.me/55${phone.replace(/\D/g, "")}`} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                    {phone}
                  </a>
                </p>
              </div>

              <div>
                <p className="eyebrow text-muted-foreground">E-mail</p>
                <p className="mt-1 text-base sm:text-lg font-medium text-foreground">
                  <a href={`mailto:${email}`} className="hover:text-primary transition-colors break-all">
                    {email}
                  </a>
                </p>
              </div>

              <div>
                <p className="eyebrow text-muted-foreground">Rede Social</p>
                <p className="mt-1 text-base sm:text-lg font-medium text-foreground">
                  <a href={facebook.startsWith("http") ? facebook : `https://${facebook}`} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                    {facebook}
                  </a>
                </p>
              </div>
            </div>
          </div>

          {/* Map Side */}
          <div className="h-[400px] sm:h-[450px] w-full overflow-hidden rounded-sm border border-border shadow-md">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3660.7936746830584!2d-46.51659852467362!3d-23.431876578891077!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce8a853768297b%3A0x633d740594a9d701!2sRua%20Barbacena%2C%20101%20-%20Jardim%20Bom%20Clima%2C%20Guarulhos%20-%20SP%2C%2007122-260!5e0!3m2!1spt-BR!2sbr!4v1723326750000!5m2!1spt-BR!2sbr"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Localização da Fraternidade"
            ></iframe>
          </div>

        </div>

        {/* Message Form Box */}
        <div className="mt-16 pt-16 border-t border-border max-w-2xl mx-auto">
          <div className="bg-muted/30 border border-border p-8 sm:p-10 rounded-sm">
            <h3 className="text-2xl font-serif font-bold text-foreground mb-3 text-center">
              Envie uma Mensagem
            </h3>
            <p className="text-sm text-muted-foreground text-center mb-8">
              Tem alguma dúvida sobre os trabalhos da Fraternidade? Preencha os campos abaixo.
            </p>

            {formSent ? (
              <div className="bg-primary/10 border border-primary/20 p-6 text-center rounded-sm">
                <CheckCircle2 className="w-10 h-10 text-primary mx-auto mb-3" />
                <p className="font-bold text-foreground text-lg mb-1">Mensagem enviada com sucesso!</p>
                <p className="text-sm text-muted-foreground">Entraremos em contato com você em breve.</p>
              </div>
            ) : (
              <form
                className="space-y-4"
                onSubmit={(e) => {
                  e.preventDefault();
                  setFormSent(true);
                }}
              >
                <div>
                  <label htmlFor="name" className="block text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1.5">
                    Nome Completo
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    className="w-full h-11 px-3.5 border border-border bg-background text-foreground text-sm focus:outline-none focus:border-primary"
                    placeholder="Seu nome"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1.5">
                    Seu E-mail
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    className="w-full h-11 px-3.5 border border-border bg-background text-foreground text-sm focus:outline-none focus:border-primary"
                    placeholder="seu@email.com"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1.5">
                    Mensagem
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={4}
                    className="w-full p-3.5 border border-border bg-background text-foreground text-sm focus:outline-none focus:border-primary resize-none"
                    placeholder="Como podemos ajudar?"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-3.5 text-xs font-bold uppercase tracking-widest transition-all mt-4 flex items-center justify-center gap-2"
                >
                  <Send size={14} /> Enviar Mensagem
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
