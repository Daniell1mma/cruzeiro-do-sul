import { MessageCircle } from "lucide-react";
import { useListSettings } from "@workspace/api-client-react";

export function FloatingWhatsApp() {
  const { data: settings } = useListSettings();
  const whatsapp = settings?.find(s => s.key === "whatsapp")?.value;

  if (!whatsapp) return null;

  const number = whatsapp.replace(/\D/g, "");
  const url = `https://wa.me/55${number}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:scale-110 transition-transform flex items-center justify-center group"
      aria-label="Fale conosco no WhatsApp"
    >
      <MessageCircle size={28} className="fill-current" />
      <span className="absolute right-full mr-4 bg-white text-foreground px-3 py-1.5 rounded-lg shadow-md text-sm font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        Como podemos ajudar?
      </span>
    </a>
  );
}
