import { PublicLayout } from "@/components/layout/PublicLayout";
import { useListLibraryItems, ListLibraryItemsType } from "@workspace/api-client-react";
import { FileText, Headphones, Video, Book, Download, ExternalLink } from "lucide-react";
import { useState } from "react";
import { useSeo } from "@/hooks/useSeo";

const TYPE_CONFIG = {
  pdf:     { label: "Apostilas", icon: <FileText  size={22} />, color: "text-red-500 bg-red-50" },
  book:    { label: "Livros",    icon: <Book      size={22} />, color: "text-blue-500 bg-blue-50" },
  audio:   { label: "Áudios",   icon: <Headphones size={22} />, color: "text-green-500 bg-green-50" },
  video:   { label: "Vídeos",   icon: <Video     size={22} />, color: "text-purple-500 bg-purple-50" },
  article: { label: "Artigos",  icon: <FileText  size={22} />, color: "text-orange-500 bg-orange-50" },
};

type ItemType = keyof typeof TYPE_CONFIG | "all";

const DEFAULT_LIBRARY_ITEMS = [
  {
    id: 1,
    title: "Espírito e Matéria: Novos Horizontes para a Medicina",
    description: "Obra seminal publicada em 1977 pelo Dr. José Lacerda de Azevedo, detalhando a comprovação científica das leis e das técnicas fundamentais da Apometria.",
    type: "book" as const,
    fileUrl: "https://www.google.com/search?q=Livro+Espirito+e+Materia+Jose+Lacerda+de+Azevedo",
  },
  {
    id: 2,
    title: "Energia e Espírito: Teoria e Prática da Apometria",
    description: "Livro clássico de 1993 que consolida a prática clínica, a bioenergia, os campos de força magnéticos e o desdobramento dos corpos sutis.",
    type: "book" as const,
    fileUrl: "https://www.google.com/search?q=Livro+Energia+e+Espirito+Jose+Lacerda+de+Azevedo",
  },
  {
    id: 3,
    title: "Guia das 13 Leis da Apometria e Desdobramento",
    description: "Apostila com a descrição completa, aplicação prática e fundamentação bioenergética das 13 leis apométricas aplicadas nos atendimentos.",
    type: "pdf" as const,
    fileUrl: "/apometria",
  },
  {
    id: 4,
    title: "Manual de Preparação e Pós-Atendimento Fraterno",
    description: "Orientações essenciais para pacientes e acompanhantes: cuidados com alimentação, equilíbrio vibracional e orientações pós-sessão.",
    type: "pdf" as const,
    fileUrl: "/atendimento",
  },
  {
    id: 5,
    title: "A Medicina Vibracional e o Desdobramento Espiritual",
    description: "Artigo de aprofundamento sobre os princípios quânticos e a ação da vontade dirigida nos campos energéticos do ser humano.",
    type: "article" as const,
    fileUrl: "/blog/o-que-e-e-como-funciona-a-apometria",
  },
  {
    id: 6,
    title: "Áudio: Harmonização e Oração da Fraternidade",
    description: "Prece e sintonia de paz com a Espiritualidade Maior e com a falange médica socorrista do Dr. Bezerra de Menezes.",
    type: "audio" as const,
    fileUrl: "https://wa.me/5511949446881?text=Ola%2C%20gostaria%20de%20receber%20o%20audio%20de%20harmonizacao",
  },
];

export function Library() {
  useSeo({
    title: "Biblioteca e Materiais de Estudo",
    description: "Apostilas, livros clássicos de Apometria do Dr. José Lacerda de Azevedo, artigos e áudios de harmonização.",
    canonicalPath: "/biblioteca",
  });

  const [filter, setFilter] = useState<ItemType>("all");
  const { data: items, isLoading } = useListLibraryItems(filter !== "all" ? { type: filter as ListLibraryItemsType } : undefined);

  const rawList = (Array.isArray(items) && items.length > 0) ? items : DEFAULT_LIBRARY_ITEMS;
  const filteredItems = filter !== "all" ? rawList.filter((it: any) => it.type === filter) : rawList;

  return (
    <PublicLayout>
      <section className="bg-muted pt-14 pb-12 md:pt-20 md:pb-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center space-y-4 md:space-y-6">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-foreground">
              Biblioteca
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-foreground/80 leading-relaxed">
              Materiais de estudo, apostilas, recomendações de leitura e áudios para auxiliar seu desenvolvimento espiritual.
            </p>
          </div>
        </div>
      </section>

      {/* Filter bar */}
      <section className="py-4 md:py-6 border-b border-border bg-white sticky top-[68px] z-30 shadow-xs">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-wrap items-center justify-center gap-2">
            <button
              onClick={() => setFilter("all")}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider transition-all min-h-[38px] active:scale-95 ${
                filter === "all" ? "bg-primary text-white shadow-sm" : "bg-muted text-foreground/80 hover:bg-muted/80 hover:text-primary"
              }`}
            >
              Todos os Materiais
            </button>
            {Object.entries(TYPE_CONFIG).map(([key, config]) => (
              <button
                key={key}
                onClick={() => setFilter(key as ItemType)}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider transition-all min-h-[38px] active:scale-95 ${
                  filter === key ? "bg-primary text-white shadow-sm" : "bg-muted text-foreground/80 hover:bg-muted/80 hover:text-primary"
                }`}
              >
                {config.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-20 bg-white min-h-[50vh]">
        <div className="container mx-auto px-4 md:px-6">
          {isLoading ? (
            <div className="flex justify-center py-20">
              <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full"></div>
            </div>
          ) : filteredItems.length === 0 ? (
            <div className="text-center py-16 bg-muted/40 rounded-sm border border-border max-w-2xl mx-auto">
              <h3 className="text-xl font-serif font-bold mb-2">Nenhum material encontrado</h3>
              <p className="text-muted-foreground">Tente selecionar outra categoria de estudo.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
              {filteredItems.map((item: any) => {
                const config = TYPE_CONFIG[item.type as keyof typeof TYPE_CONFIG] || TYPE_CONFIG.article;
                return (
                  <div key={item.id} className="flex flex-col bg-card border border-border p-6 rounded-sm shadow-sm hover:shadow-md transition-all group justify-between">
                    <div>
                      <div className="flex items-start gap-4 mb-4">
                        <div className={`w-12 h-12 rounded-sm flex items-center justify-center shrink-0 ${config.color}`}>
                          {config.icon}
                        </div>
                        <div className="flex-1 pt-0.5">
                          <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-1">
                            {config.label}
                          </div>
                          <h3 className="font-serif font-bold text-base md:text-lg leading-tight group-hover:text-primary transition-colors">
                            {item.title}
                          </h3>
                        </div>
                      </div>

                      {item.description && (
                        <p className="text-foreground/75 text-sm mb-6 leading-relaxed line-clamp-3">
                          {item.description}
                        </p>
                      )}
                    </div>

                    <div className="mt-auto pt-4 border-t border-border">
                      {item.fileUrl ? (
                        <a
                          href={item.fileUrl}
                          target={item.fileUrl.startsWith("http") ? "_blank" : undefined}
                          rel={item.fileUrl.startsWith("http") ? "noopener noreferrer" : undefined}
                          className="flex items-center justify-center gap-2 w-full py-3 rounded-none bg-primary hover:bg-primary/90 text-primary-foreground text-xs font-bold uppercase tracking-wider transition-all min-h-[44px] active:scale-[0.98] shadow-xs"
                        >
                          Acessar Material
                          {item.type === "pdf" ? <Download size={14} /> : <ExternalLink size={14} />}
                        </a>
                      ) : (
                        <div className="text-center text-xs text-muted-foreground py-3">
                          Disponível na sede
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </PublicLayout>
  );
}

