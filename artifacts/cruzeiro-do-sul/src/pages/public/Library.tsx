import { PublicLayout } from "@/components/layout/PublicLayout";
import { useListLibraryItems } from "@workspace/api-client-react";
import { FileText, Headphones, Video, Book, Download, ExternalLink } from "lucide-react";
import { useState } from "react";

const TYPE_CONFIG = {
  pdf: { label: "Apostilas", icon: <FileText size={24} />, color: "text-red-500 bg-red-50" },
  book: { label: "Livros", icon: <Book size={24} />, color: "text-blue-500 bg-blue-50" },
  audio: { label: "Áudios", icon: <Headphones size={24} />, color: "text-green-500 bg-green-50" },
  video: { label: "Vídeos", icon: <Video size={24} />, color: "text-purple-500 bg-purple-50" },
  article: { label: "Artigos", icon: <FileText size={24} />, color: "text-orange-500 bg-orange-50" },
};

type ItemType = keyof typeof TYPE_CONFIG | "all";

export function Library() {
  const [filter, setFilter] = useState<ItemType>("all");
  // @ts-ignore - The API hook expects specific types but we are passing the generic one for the all case
  const { data: items, isLoading } = useListLibraryItems(filter !== "all" ? { type: filter as any } : undefined);

  return (
    <PublicLayout>
      <section className="bg-muted pt-20 pb-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground">
              Biblioteca
            </h1>
            <p className="text-xl text-foreground/80 leading-relaxed">
              Materiais de estudo, apostilas, recomendações de leitura e áudios para auxiliar seu desenvolvimento.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 border-b border-border bg-white sticky top-[72px] md:top-[84px] z-40">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => setFilter("all")}
              className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all ${
                filter === "all" ? "bg-primary text-white shadow-md" : "bg-muted text-foreground hover:bg-muted/80"
              }`}
            >
              Todos os Materiais
            </button>
            {Object.entries(TYPE_CONFIG).map(([key, config]) => (
              <button
                key={key}
                onClick={() => setFilter(key as ItemType)}
                className={`px-6 py-2.5 rounded-full text-sm font-bold flex items-center gap-2 transition-all ${
                  filter === key ? "bg-primary text-white shadow-md" : "bg-muted text-foreground hover:bg-muted/80"
                }`}
              >
                {config.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white min-h-[50vh]">
        <div className="container mx-auto px-4 md:px-6">
          {isLoading ? (
            <div className="flex justify-center py-20">
              <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full"></div>
            </div>
          ) : !items || items.length === 0 ? (
            <div className="text-center py-20 bg-muted/50 rounded-3xl border border-border max-w-2xl mx-auto">
              <h3 className="text-xl font-serif font-bold mb-2">Nenhum material encontrado</h3>
              <p className="text-muted-foreground">Tente selecionar outra categoria.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {items.map((item) => {
                const config = TYPE_CONFIG[item.type];
                return (
                  <div key={item.id} className="flex flex-col bg-card border border-border p-6 rounded-3xl shadow-sm hover-elevate transition-all group">
                    <div className="flex items-start gap-4 mb-4">
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${config.color}`}>
                        {config.icon}
                      </div>
                      <div className="flex-1 pt-1">
                        <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">
                          {config.label}
                        </div>
                        <h3 className="font-serif font-bold text-lg leading-tight group-hover:text-primary transition-colors">
                          {item.title}
                        </h3>
                      </div>
                    </div>
                    
                    {item.description && (
                      <p className="text-foreground/70 text-sm mb-6 flex-1 line-clamp-3">
                        {item.description}
                      </p>
                    )}
                    
                    <div className="mt-auto pt-6 border-t border-border/50">
                      {item.fileUrl ? (
                        <a 
                          href={item.fileUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-muted text-sm font-bold hover:bg-primary hover:text-white transition-colors"
                        >
                          Acessar Material
                          {item.type === 'pdf' ? <Download size={16} /> : <ExternalLink size={16} />}
                        </a>
                      ) : (
                        <div className="text-center text-sm text-muted-foreground py-3">
                          Link indisponível
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
