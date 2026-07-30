import { PublicLayout } from "@/components/layout/PublicLayout";
import { useListSettings } from "@workspace/api-client-react";
import { MapPin, Phone, Mail, Instagram, Facebook, Clock, Send } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Contact() {
  const { data: settings } = useListSettings();

  const getSetting = (key: string) => settings?.find(s => s.key === key)?.value || "";

  const address = getSetting("address") || "Rua Exemplo, 123 - Centro, Guarulhos/SP";
  const email = getSetting("email") || "contato@cruzeirodosul.org";
  const phone = getSetting("phone") || "(11) 99999-9999";
  const instagram = getSetting("instagram") || "#";
  const facebook = getSetting("facebook") || "#";
  const mapEmbed = getSetting("google_maps_embed");

  return (
    <PublicLayout>
      <section className="bg-muted pt-20 pb-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground">
              Entre em Contato
            </h1>
            <p className="text-xl text-foreground/80 leading-relaxed">
              Estamos de braços abertos para receber você. Mande uma mensagem ou venha nos visitar.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
            
            {/* Contact Info */}
            <div className="space-y-12">
              <div className="space-y-8">
                <h2 className="text-3xl font-serif font-bold text-primary">Informações de Contato</h2>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-accent text-primary flex items-center justify-center shrink-0">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Endereço</h3>
                    <p className="text-foreground/70">{address}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-accent text-primary flex items-center justify-center shrink-0">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Telefone / WhatsApp</h3>
                    <p className="text-foreground/70">{phone}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-accent text-primary flex items-center justify-center shrink-0">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">E-mail</h3>
                    <p className="text-foreground/70">{email}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-accent text-primary flex items-center justify-center shrink-0">
                    <Clock size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Horário de Funcionamento</h3>
                    <p className="text-foreground/70">
                      Terças e Quintas: 19h às 22h<br/>
                      (Atendimento fraterno mediante agendamento)
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-8 border-t border-border">
                <h3 className="font-bold text-lg mb-4">Siga nossas Redes Sociais</h3>
                <div className="flex items-center gap-4">
                  <a href={instagram} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center hover:bg-primary/90 transition-colors">
                    <Instagram size={24} />
                  </a>
                  <a href={facebook} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center hover:bg-primary/90 transition-colors">
                    <Facebook size={24} />
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form / Map */}
            <div className="bg-card border border-border shadow-lg rounded-3xl p-8 md:p-10">
              <h3 className="text-2xl font-serif font-bold mb-6">Envie uma Mensagem</h3>
              
              <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">Nome Completo</label>
                  <input type="text" id="name" className="w-full h-12 px-4 rounded-xl border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" placeholder="Seu nome" />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">E-mail</label>
                  <input type="email" id="email" className="w-full h-12 px-4 rounded-xl border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" placeholder="seu@email.com" />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">Mensagem</label>
                  <textarea id="message" rows={5} className="w-full p-4 rounded-xl border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none" placeholder="Como podemos ajudar?"></textarea>
                </div>

                <Button className="w-full h-12 rounded-xl bg-secondary hover:bg-secondary/90 text-white text-lg gap-2 mt-2">
                  <Send size={18} />
                  Enviar Mensagem
                </Button>
                <p className="text-xs text-center text-muted-foreground mt-4">
                  Sua mensagem será respondida em até 48 horas úteis.
                </p>
              </form>
            </div>

          </div>

          {mapEmbed && (
            <div className="mt-20 pt-20 border-t border-border">
              <h2 className="text-3xl font-serif font-bold text-center mb-10">Como Chegar</h2>
              <div className="w-full h-[400px] rounded-3xl overflow-hidden shadow-sm border border-border" dangerouslySetInnerHTML={{ __html: mapEmbed }}></div>
            </div>
          )}
        </div>
      </section>
    </PublicLayout>
  );
}
