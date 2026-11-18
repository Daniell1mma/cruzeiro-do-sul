import { PublicLayout } from "@/components/layout/PublicLayout";
import { useListAlbums } from "@workspace/api-client-react";
import { Image as ImageIcon, X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import { useState, useEffect } from "react";
import { useSeo } from "@/hooks/useSeo";

interface GalleryPhoto {
  id: string | number;
  title: string;
  category: "Sede" | "Atendimentos" | "Coordenação";
  imageUrl: string;
  description: string;
}

const DEFAULT_PHOTOS: GalleryPhoto[] = [
  {
    id: "photo-1",
    title: "Sessão de Apometria e Cura Vibracional",
    category: "Atendimentos",
    imageUrl: "/assets-reference/hero.webp",
    description: "Trabalhos de imposição de mãos, equilíbrio bioenergético e desdobramento dos corpos sutis.",
  },
  {
    id: "photo-2",
    title: "Sede Luz e Expansão da Consciência",
    category: "Sede",
    imageUrl: "/assets-reference/portas-abertas.webp",
    description: "Nossa sede acolhedora na Rua Barbacena, 101 B, Jd. Bom Clima - Guarulhos/SP.",
  },
  {
    id: "photo-3",
    title: "Harmonia e Silêncio na Sala de Atendimento",
    category: "Atendimentos",
    imageUrl: "/assets-reference/session-inside.webp",
    description: "Ambiente preparado energeticamente para acolher os assistidos nas noites de segunda-feira.",
  },
  {
    id: "photo-4",
    title: "Rubens - Coordenação Geral",
    category: "Coordenação",
    imageUrl: "/assets-reference/rubens.webp",
    description: "Coordenação geral dos trabalhos e desenvolvimento pedagógico da Fraternidade.",
  },
  {
    id: "photo-5",
    title: "Marcilene - Coordenação Financeira",
    category: "Coordenação",
    imageUrl: "/assets-reference/marcilene.webp",
    description: "Zelo administrativo e apoio contínuo aos voluntários e assistidos.",
  },
  {
    id: "photo-6",
    title: "Elton - Coordenação",
    category: "Coordenação",
    imageUrl: "/assets-reference/elton.webp",
    description: "Operador apométrico e acolhimento nas sessões presenciais.",
  },
  {
    id: "photo-7",
    title: "Denise - Coordenação",
    category: "Coordenação",
    imageUrl: "/assets-reference/denise.webp",
    description: "Orientação e suporte aos atendidos e familiares.",
  },
  {
    id: "photo-8",
    title: "Cristiane - Coordenação",
    category: "Coordenação",
    imageUrl: "/assets-reference/cristiane.webp",
    description: "Trabalho dedicado na sintonia e passes energéticos.",
  },
  {
    id: "photo-9",
    title: "Walquiria - Coordenação",
    category: "Coordenação",
    imageUrl: "/assets-reference/walquiria.webp",
    description: "Apoio fraterno e harmonia espiritual nos trabalhos de assistência.",
  },
  {
    id: "photo-10",
    title: "Sergio - Coordenação",
    category: "Coordenação",
    imageUrl: "/assets-reference/sergio.webp",
    description: "Coordenação e disciplina nos trabalhos de desdobramento apométrico.",
  },
];

export function Gallery() {
  useSeo({
    title: "Galeria de Fotos",
    description: "Conheça as instalações da Fraternidade, nossa sede Luz e Expansão da Consciência e nossa equipe de coordenadores.",
    canonicalPath: "/galeria",
  });

  const { data: albums, isLoading } = useListAlbums();
  const [filter, setFilter] = useState<string>("all");
  const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null);

  // Combine DB albums (if any) or fallback to default institutional photos
  const photos: GalleryPhoto[] = (Array.isArray(albums) && albums.length > 0)
    ? albums.map((album) => ({
        id: String(album.id),
        title: album.name,
        category: "Atendimentos" as const,
        imageUrl: album.coverUrl || "/assets-reference/portas-abertas.webp",
        description: album.description || "",
      }))
    : DEFAULT_PHOTOS;

  const filteredPhotos = filter === "all" ? photos : photos.filter((p) => p.category === filter);

  // Close lightbox on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activePhotoIndex === null) return;
      if (e.key === "Escape") setActivePhotoIndex(null);
      if (e.key === "ArrowLeft") {
        setActivePhotoIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : filteredPhotos.length - 1));
      }
      if (e.key === "ArrowRight") {
        setActivePhotoIndex((prev) => (prev !== null && prev < filteredPhotos.length - 1 ? prev + 1 : 0));
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activePhotoIndex, filteredPhotos.length]);

  return (
    <PublicLayout>
      {/* Header */}
      <section className="bg-muted pt-14 pb-12 md:pt-20 md:pb-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center space-y-4 md:space-y-6">
            <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center mx-auto shadow-sm text-primary mb-3">
              <ImageIcon size={28} />
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-semibold tracking-tight text-foreground">
              Galeria de Fotos
            </h1>
            <p className="text-base sm:text-lg md:text-xl font-serif font-medium text-foreground/85 leading-relaxed">
              Conheça as instalações da Fraternidade, nossa equipe de coordenadores e os momentos de estudo e assistência.
            </p>
          </div>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="py-4 md:py-6 border-b border-border bg-white sticky top-[68px] z-30 shadow-xs font-sans">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-wrap items-center justify-center gap-2">
            {[
              { id: "all", label: "Todas as Fotos" },
              { id: "Sede", label: "Nossa Sede" },
              { id: "Atendimentos", label: "Atendimentos e Espaço" },
              { id: "Coordenação", label: "Equipe de Coordenadores" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id)}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-sans font-semibold uppercase tracking-wider transition-all min-h-[38px] active:scale-95 ${
                  filter === tab.id
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "bg-muted text-foreground/80 hover:bg-muted/80 hover:text-primary"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Photos Grid */}
      <section className="py-12 md:py-20 bg-white min-h-[50vh]">
        <div className="container mx-auto px-4 md:px-6">
          {isLoading ? (
            <div className="flex justify-center py-20">
              <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full"></div>
            </div>
          ) : filteredPhotos.length === 0 ? (
            <div className="text-center py-16 bg-muted/40 rounded-2xl border border-border font-sans">
              <p className="text-muted-foreground">Nenhuma foto encontrada nesta categoria.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {filteredPhotos.map((photo, index) => (
                <div
                  key={photo.id}
                  onClick={() => setActivePhotoIndex(index)}
                  className="group cursor-pointer flex flex-col bg-card border border-border rounded-sm overflow-hidden shadow-sm hover:shadow-md transition-all active:scale-[0.99]"
                >
                  <div className="aspect-[4/3] relative overflow-hidden bg-muted">
                    <img
                      src={photo.imageUrl}
                      alt={photo.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="bg-white/90 text-primary p-3 rounded-full shadow-lg">
                        <ZoomIn size={20} />
                      </span>
                    </div>
                    <span className="absolute top-3 left-3 bg-primary/90 text-white text-[10px] font-sans font-semibold uppercase tracking-wider px-2.5 py-1 rounded-sm shadow-sm backdrop-blur-xs">
                      {photo.category}
                    </span>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-serif font-medium tracking-tight text-lg md:text-xl text-foreground group-hover:text-primary transition-colors leading-snug">
                        {photo.title}
                      </h3>
                      {photo.description && (
                        <p className="mt-2 text-xs sm:text-sm text-foreground/75 leading-relaxed line-clamp-2 font-sans font-normal">
                          {photo.description}
                        </p>
                      )}
                    </div>
                    <div className="mt-4 pt-3 border-t border-border flex items-center justify-between text-xs font-sans font-semibold text-primary">
                      <span>Clique para ampliar</span>
                      <ZoomIn size={14} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Lightbox Modal */}
      {activePhotoIndex !== null && filteredPhotos[activePhotoIndex] && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex flex-col items-center justify-center p-4 sm:p-6"
          onClick={() => setActivePhotoIndex(null)}
          role="dialog"
          aria-modal="true"
        >
          {/* Close button */}
          <button
            onClick={() => setActivePhotoIndex(null)}
            className="absolute top-4 right-4 z-50 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 p-2.5 rounded-full transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
            aria-label="Fechar visualizador"
          >
            <X size={24} />
          </button>

          {/* Navigation previous */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setActivePhotoIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : filteredPhotos.length - 1));
            }}
            className="absolute left-3 sm:left-6 z-50 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 p-3 rounded-full transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
            aria-label="Foto anterior"
          >
            <ChevronLeft size={28} />
          </button>

          {/* Navigation next */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setActivePhotoIndex((prev) => (prev !== null && prev < filteredPhotos.length - 1 ? prev + 1 : 0));
            }}
            className="absolute right-3 sm:right-6 z-50 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 p-3 rounded-full transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
            aria-label="Próxima foto"
          >
            <ChevronRight size={28} />
          </button>

          {/* Active Image Box */}
          <div
            className="max-w-4xl max-h-[80vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={filteredPhotos[activePhotoIndex].imageUrl}
              alt={filteredPhotos[activePhotoIndex].title}
              className="max-h-[65vh] w-auto max-w-full object-contain rounded-sm shadow-2xl border border-white/10"
            />
            <div className="mt-4 text-center text-white space-y-1 px-4">
              <span className="text-[10px] uppercase font-sans font-semibold tracking-wider text-accent bg-accent/20 px-2 py-0.5 rounded">
                {filteredPhotos[activePhotoIndex].category}
              </span>
              <h4 className="font-serif text-lg sm:text-2xl font-medium tracking-tight">
                {filteredPhotos[activePhotoIndex].title}
              </h4>
              <p className="text-xs sm:text-sm text-white/80 max-w-xl font-sans font-normal">
                {filteredPhotos[activePhotoIndex].description}
              </p>
              <p className="text-[11px] text-white/50 pt-1 font-sans">
                Foto {activePhotoIndex + 1} de {filteredPhotos.length}
              </p>
            </div>
          </div>
        </div>
      )}
    </PublicLayout>
  );
}
