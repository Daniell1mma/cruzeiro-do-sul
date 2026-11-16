import { useListSettings } from "@workspace/api-client-react";

export function FloatingWhatsApp() {
  const { data: settings } = useListSettings();
  const whatsapp = (Array.isArray(settings)
    ? settings.find((s) => s.key === "whatsapp")?.value
    : undefined) || "5511949446881";

  const cleanDigits = whatsapp.replace(/\D/g, "");
  const number = cleanDigits.startsWith("55") ? cleanDigits : `55${cleanDigits}`;
  const url = `https://wa.me/${number}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-40 bg-[#25D366] hover:bg-[#20ba5a] text-white w-12 h-12 sm:w-14 sm:h-14 rounded-full shadow-xl hover:shadow-2xl transition-all hover:scale-105 active:scale-95 flex items-center justify-center group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2"
      aria-label="Fale conosco no WhatsApp oficial da Fraternidade"
      title="Fale conosco no WhatsApp"
    >
      {/* WhatsApp official SVG icon */}
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="30" height="30" fill="white" aria-hidden="true">
        <path d="M16 0C7.163 0 0 7.163 0 16c0 2.82.736 5.469 2.027 7.77L0 32l8.432-2.008A15.938 15.938 0 0 0 16 32c8.837 0 16-7.163 16-16S24.837 0 16 0zm0 29.333a13.28 13.28 0 0 1-6.747-1.832l-.484-.287-5.008 1.193 1.217-4.872-.315-.5A13.258 13.258 0 0 1 2.667 16C2.667 8.636 8.636 2.667 16 2.667S29.333 8.636 29.333 16 23.364 29.333 16 29.333zm7.27-9.878c-.398-.199-2.355-1.162-2.72-1.294-.365-.133-.631-.199-.897.199-.265.398-1.03 1.294-1.262 1.56-.232.265-.465.299-.863.1-.398-.2-1.681-.62-3.203-1.977-1.184-1.056-1.983-2.36-2.215-2.758-.232-.398-.025-.613.174-.811.179-.179.398-.465.597-.698.199-.232.265-.398.398-.664.133-.265.066-.498-.033-.697-.1-.199-.897-2.163-1.229-2.96-.324-.778-.653-.673-.897-.685l-.764-.013c-.265 0-.697.1-1.063.498-.365.398-1.394 1.362-1.394 3.322s1.428 3.852 1.627 4.117c.199.265 2.81 4.29 6.81 6.017.952.411 1.696.657 2.275.841.956.305 1.827.262 2.515.159.767-.114 2.355-.963 2.688-1.893.332-.93.332-1.727.232-1.893-.099-.166-.365-.265-.763-.464z"/>
      </svg>
      <span className="absolute right-full mr-4 bg-white text-foreground px-3.5 py-2 rounded-lg shadow-lg text-xs font-semibold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border border-border">
        Fale conosco no WhatsApp
      </span>
    </a>
  );
}
