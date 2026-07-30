import { useState } from "react";
import { AdminLayout } from "@/components/layout/AdminLayout";
import {
  useListAlbums, useDeleteAlbum, useDeleteGalleryImage,
  getListAlbumsQueryKey,
} from "@workspace/api-client-react";
import { Button } from "@/components/ui/button";
import { Trash2, ChevronDown, ChevronRight, ImageIcon } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";

export function Gallery() {
  const { data: albums, isLoading } = useListAlbums();
  const deleteAlbum = useDeleteAlbum();
  const deleteImage = useDeleteGalleryImage();
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [open, setOpen] = useState<Record<number, boolean>>({});

  const invalidate = () => queryClient.invalidateQueries({ queryKey: getListAlbumsQueryKey() });

  const handleDeleteAlbum = (id: number, name: string) => {
    if (!confirm(`Excluir o álbum "${name}" e todas as suas fotos?`)) return;
    deleteAlbum.mutate({ id }, {
      onSuccess: () => { toast({ title: "Álbum excluído" }); invalidate(); },
      onError:   () => toast({ title: "Erro ao excluir", variant: "destructive" }),
    });
  };

  const handleDeleteImage = (albumId: number, imageId: number) => {
    if (!confirm("Excluir esta foto?")) return;
    deleteImage.mutate({ albumId, imageId }, {
      onSuccess: () => { toast({ title: "Foto excluída" }); invalidate(); },
      onError:   () => toast({ title: "Erro ao excluir", variant: "destructive" }),
    });
  };

  const toggle = (id: number) => setOpen(prev => ({ ...prev, [id]: !prev[id] }));

  return (
    <AdminLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-serif font-bold text-foreground">Galeria</h1>
        <p className="text-muted-foreground mt-2">Gerencie os álbuns e fotos da galeria.</p>
      </div>

      {isLoading ? (
        <div className="p-8 flex justify-center"><div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" /></div>
      ) : !albums?.length ? (
        <div className="bg-white rounded-xl shadow-sm border border-border p-8 text-center text-muted-foreground">Nenhum álbum cadastrado.</div>
      ) : (
        <div className="space-y-4">
          {albums.map(album => (
            <div key={album.id} className="bg-white rounded-xl shadow-sm border border-border overflow-hidden">
              {/* Album header */}
              <div className="flex items-center justify-between px-6 py-4">
                <button
                  className="flex items-center gap-3 text-left flex-1 min-w-0"
                  onClick={() => toggle(album.id)}
                >
                  {open[album.id] ? <ChevronDown size={18} className="shrink-0 text-muted-foreground" /> : <ChevronRight size={18} className="shrink-0 text-muted-foreground" />}
                  <div className="min-w-0">
                    <span className="font-bold text-foreground">{album.name}</span>
                    <span className="ml-3 text-xs text-muted-foreground">
                      {(album as { imageCount?: number }).imageCount ?? 0} {(album as { imageCount?: number }).imageCount === 1 ? "foto" : "fotos"}
                    </span>
                  </div>
                </button>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive shrink-0" onClick={() => handleDeleteAlbum(album.id, album.name)}>
                  <Trash2 size={16} />
                </Button>
              </div>

              {/* Images */}
              {open[album.id] && (
                <div className="border-t border-border px-6 py-4">
                  {!(album as { images?: unknown[] }).images || (album as { images?: unknown[] }).images?.length === 0 ? (
                    <p className="text-sm text-muted-foreground text-center py-4">Nenhuma foto neste álbum.</p>
                  ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                      {((album as { images?: { id: number; url: string; caption?: string }[] }).images ?? []).map(img => (
                        <div key={img.id} className="relative group aspect-square rounded-lg overflow-hidden bg-muted border border-border">
                          {img.url ? (
                            <img src={img.url} alt={img.caption || ''} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-muted-foreground"><ImageIcon size={24} /></div>
                          )}
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                            <Button
                              variant="destructive" size="icon"
                              className="h-8 w-8"
                              onClick={() => handleDeleteImage(album.id, img.id)}
                            >
                              <Trash2 size={14} />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </AdminLayout>
  );
}
