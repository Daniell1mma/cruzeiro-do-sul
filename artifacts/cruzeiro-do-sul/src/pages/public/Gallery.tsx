import { PublicLayout } from "@/components/layout/PublicLayout";
import { useListAlbums } from "@workspace/api-client-react";
import { Image as ImageIcon } from "lucide-react";
import { Link } from "wouter";

export function Gallery() {
  const { data: albums, isLoading } = useListAlbums();

  return (
    <PublicLayout>
      <section className="bg-muted pt-14 pb-12 md:pt-20 md:pb-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center space-y-4 md:space-y-6">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-foreground">
              Nossa Galeria
            </h1>
            <p className="text-lg md:text-xl text-foreground/80 leading-relaxed">
              Registros dos nossos encontros, cursos e do nosso espaço de luz.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-20 bg-white min-h-[50vh]">
        <div className="container mx-auto px-4 md:px-6">
          {isLoading ? (
            <div className="flex justify-center py-20">
              <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full"></div>
            </div>
          ) : !Array.isArray(albums) || albums.length === 0 ? (
            <div className="text-center py-16 bg-muted/50 rounded-3xl border border-border">
              <ImageIcon size={40} className="mx-auto text-muted-foreground mb-4" />
              <h3 className="text-xl font-serif font-bold mb-2">Nenhum álbum publicado</h3>
              <p className="text-muted-foreground">Em breve adicionaremos fotos do nosso espaço.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-8">
              {albums.map((album) => (
                <Link key={album.id} href={`/galeria/${album.id}`} className="group block">
                  <div className="bg-card border border-border rounded-2xl md:rounded-3xl overflow-hidden hover-elevate transition-all">
                    {/* aspect-[4/3] on mobile, square on sm+ */}
                    <div className="aspect-[4/3] sm:aspect-square relative overflow-hidden bg-muted">
                      {album.coverUrl ? (
                        <img
                          src={album.coverUrl}
                          alt={album.name}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                          <ImageIcon size={48} opacity={0.2} />
                        </div>
                      )}
                      {album.imageCount !== undefined && (
                        <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-md text-white px-2.5 py-1 rounded-full text-xs font-bold flex items-center gap-1.5">
                          <ImageIcon size={12} />
                          {album.imageCount} fotos
                        </div>
                      )}
                    </div>
                    <div className="p-4 md:p-6">
                      <h3 className="font-serif font-bold text-lg md:text-xl mb-1.5 group-hover:text-primary transition-colors">{album.name}</h3>
                      {album.description && (
                        <p className="text-foreground/70 text-sm line-clamp-2">{album.description}</p>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </PublicLayout>
  );
}
