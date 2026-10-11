import { useState } from "react";
import { AdminLayout } from "@/components/layout/AdminLayout";
import {
  useListAlbums, useCreateAlbum, useUpdateAlbum, useDeleteAlbum,
  useCreateGalleryImage, useDeleteGalleryImage,
  getListAlbumsQueryKey,
} from "@workspace/api-client-react";
import type { AlbumInput } from "@workspace/api-client-react";
import { Button } from "@/components/ui/button";
import { Plus, Edit2, Trash2, ChevronDown, ChevronRight, ImageIcon, Image } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { FormModal, Input, Textarea } from "@/components/admin/FormModal";

type AlbumWithImages = {
  id: number; name: string; description?: string | null; coverUrl?: string | null; imageCount?: number;
  images?: { id: number; imageUrl: string; caption?: string | null }[];
};

const EMPTY_ALBUM: AlbumInput = { name: "", description: "", coverUrl: "" };
const EMPTY_IMAGE = { imageUrl: "", caption: "" };

export function Gallery() {
  const { data: albums, isLoading } = useListAlbums();
  const createAlbum = useCreateAlbum();
  const updateAlbum = useUpdateAlbum();
  const deleteAlbum = useDeleteAlbum();
  const createImage = useCreateGalleryImage();
  const deleteImage = useDeleteGalleryImage();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const [open, setOpen] = useState<Record<number, boolean>>({});
  const [albumModal, setAlbumModal] = useState<{ open: boolean; editing: AlbumWithImages | null }>({ open: false, editing: null });
  const [albumForm, setAlbumForm] = useState<AlbumInput>(EMPTY_ALBUM);
  const [imageModal, setImageModal] = useState<{ open: boolean; albumId: number | null }>({ open: false, albumId: null });
  const [imageForm, setImageForm] = useState(EMPTY_IMAGE);

  const invalidate = () => queryClient.invalidateQueries({ queryKey: getListAlbumsQueryKey() });

  const openCreateAlbum = () => { setAlbumForm(EMPTY_ALBUM); setAlbumModal({ open: true, editing: null }); };
  const openEditAlbum  = (a: AlbumWithImages) => {
    setAlbumForm({ name: a.name, description: a.description ?? "", coverUrl: a.coverUrl ?? "" });
    setAlbumModal({ open: true, editing: a });
  };
  const closeAlbumModal = () => setAlbumModal({ open: false, editing: null });

  const openAddImage = (albumId: number) => { setImageForm(EMPTY_IMAGE); setImageModal({ open: true, albumId }); };
  const closeImageModal = () => setImageModal({ open: false, albumId: null });

  const handleAlbumSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (albumModal.editing) {
      updateAlbum.mutate({ id: albumModal.editing.id, data: albumForm }, {
        onSuccess: () => { toast({ title: "Álbum atualizado" }); invalidate(); closeAlbumModal(); },
        onError:   () => toast({ title: "Erro ao salvar", variant: "destructive" }),
      });
    } else {
      createAlbum.mutate({ data: albumForm }, {
        onSuccess: () => { toast({ title: "Álbum criado" }); invalidate(); closeAlbumModal(); },
        onError:   () => toast({ title: "Erro ao criar", variant: "destructive" }),
      });
    }
  };

  const handleImageSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageModal.albumId) return;
    createImage.mutate({ data: { albumId: imageModal.albumId, imageUrl: imageForm.imageUrl, caption: imageForm.caption } }, {
      onSuccess: () => { toast({ title: "Foto adicionada" }); invalidate(); closeImageModal(); },
      onError:   () => toast({ title: "Erro ao adicionar", variant: "destructive" }),
    });
  };

  const handleDeleteAlbum = (id: number, name: string) => {
    if (!confirm(`Excluir álbum "${name}" e todas as fotos?`)) return;
    deleteAlbum.mutate({ id }, {
      onSuccess: () => { toast({ title: "Álbum excluído" }); invalidate(); },
      onError:   () => toast({ title: "Erro ao excluir", variant: "destructive" }),
    });
  };

  const handleDeleteImage = (albumId: number, imageId: number) => {
    if (!confirm("Excluir esta foto?")) return;
    deleteImage.mutate({ id: imageId }, {
      onSuccess: () => { toast({ title: "Foto excluída" }); invalidate(); },
      onError:   () => toast({ title: "Erro ao excluir", variant: "destructive" }),
    });
  };

  const toggle = (id: number) => setOpen(p => ({ ...p, [id]: !p[id] }));

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-serif font-bold text-foreground">Galeria</h1>
          <p className="text-muted-foreground mt-2">Gerencie os álbuns e fotos.</p>
        </div>
        <Button className="gap-2" onClick={openCreateAlbum}><Plus size={16} /> Novo Álbum</Button>
      </div>

      {isLoading ? (
        <div className="p-8 flex justify-center"><div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" /></div>
      ) : !albums?.length ? (
        <div className="bg-white rounded-xl shadow-sm border border-border p-8 text-center text-muted-foreground">Nenhum álbum cadastrado.</div>
      ) : (
        <div className="space-y-4">
          {(albums as AlbumWithImages[]).map(album => (
            <div key={album.id} className="bg-white rounded-xl shadow-sm border border-border overflow-hidden">
              <div className="flex items-center justify-between px-6 py-4">
                <button className="flex items-center gap-3 text-left flex-1 min-w-0" onClick={() => toggle(album.id)}>
                  {open[album.id] ? <ChevronDown size={18} className="shrink-0 text-muted-foreground" /> : <ChevronRight size={18} className="shrink-0 text-muted-foreground" />}
                  <div className="min-w-0">
                    <span className="font-bold text-foreground">{album.name}</span>
                    <span className="ml-3 text-xs text-muted-foreground">{album.imageCount ?? 0} foto(s)</span>
                    {album.description && <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">{album.description}</p>}
                  </div>
                </button>
                <div className="flex gap-2 shrink-0">
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary" title="Adicionar foto" onClick={() => openAddImage(album.id)}><Image size={16} /></Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary" onClick={() => openEditAlbum(album)}><Edit2 size={16} /></Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive" onClick={() => handleDeleteAlbum(album.id, album.name)}><Trash2 size={16} /></Button>
                </div>
              </div>

              {open[album.id] && (
                <div className="border-t border-border px-6 py-4">
                  {!album.images?.length ? (
                    <div className="text-center py-6 text-sm text-muted-foreground">
                      Nenhuma foto. <button className="text-primary underline underline-offset-2" onClick={() => openAddImage(album.id)}>Adicionar foto</button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                      {album.images.map(img => (
                        <div key={img.id} className="relative group aspect-square rounded-lg overflow-hidden bg-muted border border-border">
                          {img.imageUrl ? (
                            <img src={img.imageUrl} alt={img.caption ?? ''} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center"><ImageIcon size={24} className="text-muted-foreground" /></div>
                          )}
                          {img.caption && <div className="absolute bottom-0 inset-x-0 bg-black/50 text-white text-xs p-1 truncate opacity-0 group-hover:opacity-100 transition-opacity">{img.caption}</div>}
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                            <Button variant="destructive" size="icon" className="h-8 w-8" onClick={() => handleDeleteImage(album.id, img.id)}><Trash2 size={14} /></Button>
                          </div>
                        </div>
                      ))}
                      <button onClick={() => openAddImage(album.id)} className="aspect-square rounded-lg border-2 border-dashed border-border flex flex-col items-center justify-center text-muted-foreground hover:border-primary hover:text-primary transition-colors">
                        <Plus size={20} />
                        <span className="text-xs mt-1">Adicionar</span>
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Album modal */}
      <FormModal open={albumModal.open} onClose={closeAlbumModal} title={albumModal.editing ? "Editar Álbum" : "Novo Álbum"} onSubmit={handleAlbumSubmit} isPending={createAlbum.isPending || updateAlbum.isPending}>
        <Input label="Nome do Álbum" required value={albumForm.name} onChange={e => setAlbumForm(f => ({ ...f, name: e.target.value }))} />
        <Textarea label="Descrição" rows={2} value={albumForm.description ?? ""} onChange={e => setAlbumForm(f => ({ ...f, description: e.target.value }))} />
        <Input label="URL da Capa" value={albumForm.coverUrl ?? ""} onChange={e => setAlbumForm(f => ({ ...f, coverUrl: e.target.value }))} hint="Imagem de destaque do álbum" />
      </FormModal>

      {/* Add image modal */}
      <FormModal open={imageModal.open} onClose={closeImageModal} title="Adicionar Foto" onSubmit={handleImageSubmit} isPending={createImage.isPending} size="sm">
        <Input label="URL da Foto" required value={imageForm.imageUrl} onChange={e => setImageForm(f => ({ ...f, imageUrl: e.target.value }))} hint="Cole o endereço da imagem" />
        {imageForm.imageUrl && (
          <div className="rounded-lg overflow-hidden border border-border aspect-video bg-muted">
            <img src={imageForm.imageUrl} alt="preview" className="w-full h-full object-cover" onError={e => (e.currentTarget.style.display = "none")} />
          </div>
        )}
        <Input label="Legenda" value={imageForm.caption} onChange={e => setImageForm(f => ({ ...f, caption: e.target.value }))} hint="Opcional" />
      </FormModal>
    </AdminLayout>
  );
}
