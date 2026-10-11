import { useState } from "react";
import { AdminLayout } from "@/components/layout/AdminLayout";
import {
  useListLibraryItems, useCreateLibraryItem, useUpdateLibraryItem, useDeleteLibraryItem,
  getListLibraryItemsQueryKey,
} from "@workspace/api-client-react";
import type { LibraryItem, LibraryItemInput } from "@workspace/api-client-react";
import { Button } from "@/components/ui/button";
import { Plus, Edit2, Trash2, FileText, Headphones, Video, BookOpen, Link as LinkIcon, File } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { FormModal, Input, Textarea, Select, Checkbox, Row } from "@/components/admin/FormModal";

const EMPTY: LibraryItemInput = { title: "", type: "pdf", description: "", fileUrl: "", category: "", featured: false };

const typeOpts = [
  { value: "pdf",     label: "PDF" },
  { value: "book",    label: "Livro" },
  { value: "audio",   label: "Áudio" },
  { value: "video",   label: "Vídeo" },
  { value: "article", label: "Artigo / Link" },
];

const typeIcon: Record<string, React.ReactNode> = {
  pdf:     <FileText  size={16} className="text-red-500" />,
  audio:   <Headphones size={16} className="text-purple-500" />,
  video:   <Video     size={16} className="text-blue-500" />,
  book:    <BookOpen  size={16} className="text-green-500" />,
  article: <LinkIcon  size={16} className="text-orange-500" />,
};

export function Library() {
  const { data: items, isLoading } = useListLibraryItems();
  const createItem = useCreateLibraryItem();
  const updateItem = useUpdateLibraryItem();
  const deleteItem = useDeleteLibraryItem();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const [modal, setModal] = useState<{ open: boolean; editing: LibraryItem | null }>({ open: false, editing: null });
  const [form, setForm] = useState<LibraryItemInput>(EMPTY);

  const invalidate = () => queryClient.invalidateQueries({ queryKey: getListLibraryItemsQueryKey() });

  const openCreate = () => { setForm(EMPTY); setModal({ open: true, editing: null }); };
  const openEdit = (item: LibraryItem) => {
    setForm({
      title: item.title, type: (item.type as LibraryItemInput["type"]),
      description: item.description ?? "", fileUrl: item.fileUrl ?? "",
      category: item.category ?? "", featured: item.featured ?? false,
    });
    setModal({ open: true, editing: item });
  };
  const closeModal = () => setModal({ open: false, editing: null });
  const set = (k: keyof LibraryItemInput, v: unknown) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (modal.editing) {
      updateItem.mutate({ id: modal.editing.id, data: form }, {
        onSuccess: () => { toast({ title: "Material atualizado" }); invalidate(); closeModal(); },
        onError:   () => toast({ title: "Erro ao salvar", variant: "destructive" }),
      });
    } else {
      createItem.mutate({ data: form }, {
        onSuccess: () => { toast({ title: "Material adicionado" }); invalidate(); closeModal(); },
        onError:   () => toast({ title: "Erro ao criar", variant: "destructive" }),
      });
    }
  };

  const handleDelete = (id: number) => {
    if (!confirm("Excluir este material?")) return;
    deleteItem.mutate({ id }, {
      onSuccess: () => { toast({ title: "Material excluído" }); invalidate(); },
      onError:   () => toast({ title: "Erro ao excluir", variant: "destructive" }),
    });
  };

  const isPending = createItem.isPending || updateItem.isPending;

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-serif font-bold text-foreground">Biblioteca</h1>
          <p className="text-muted-foreground mt-2">Gerencie os materiais disponíveis na biblioteca.</p>
        </div>
        <Button className="gap-2" onClick={openCreate}><Plus size={16} /> Novo Material</Button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-border overflow-hidden">
        {isLoading ? (
          <div className="p-8 flex justify-center"><div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" /></div>
        ) : !items?.length ? (
          <div className="p-8 text-center text-muted-foreground">Nenhum material cadastrado.</div>
        ) : (
          <table className="w-full text-left text-sm">
            <thead className="bg-muted/50 text-muted-foreground">
              <tr>
                <th className="px-6 py-4 font-medium">Tipo</th>
                <th className="px-6 py-4 font-medium">Título</th>
                <th className="px-6 py-4 font-medium">Categoria</th>
                <th className="px-6 py-4 font-medium">Destaque</th>
                <th className="px-6 py-4 font-medium text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {items.map(item => (
                <tr key={item.id} className="hover:bg-muted/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {typeIcon[item.type] ?? <File size={16} className="text-gray-400" />}
                      <span className="text-xs font-medium text-muted-foreground capitalize">{item.type}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-bold text-foreground">{item.title}</div>
                    {item.description && <div className="text-muted-foreground text-xs mt-1 line-clamp-1">{item.description}</div>}
                  </td>
                  <td className="px-6 py-4 text-muted-foreground">{item.category || '-'}</td>
                  <td className="px-6 py-4">
                    {item.featured && <span className="inline-flex items-center text-xs font-bold px-2 py-1 rounded bg-amber-100 text-amber-700">Sim</span>}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary" onClick={() => openEdit(item)}><Edit2 size={16} /></Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive" onClick={() => handleDelete(item.id)}><Trash2 size={16} /></Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <FormModal open={modal.open} onClose={closeModal} title={modal.editing ? "Editar Material" : "Novo Material"} onSubmit={handleSubmit} isPending={isPending}>
        <Row>
          <Input label="Título" required value={form.title} onChange={e => set("title", e.target.value)} />
          <Select label="Tipo" required value={form.type} onChange={e => set("type", e.target.value as LibraryItemInput["type"])} options={typeOpts} />
        </Row>
        <Textarea label="Descrição" rows={3} value={form.description ?? ""} onChange={e => set("description", e.target.value)} />
        <Row>
          <Input label="URL do Arquivo / Link" value={form.fileUrl ?? ""} onChange={e => set("fileUrl", e.target.value)} hint="Link para PDF, vídeo ou artigo" />
          <Input label="Categoria" value={form.category ?? ""} onChange={e => set("category", e.target.value)} hint="Ex: Apometria, Espiritualidade" />
        </Row>
        <Checkbox label="Destaque na Biblioteca" description="Exibir em posição de destaque na página da biblioteca" checked={form.featured ?? false} onChange={e => set("featured", e.target.checked)} />
      </FormModal>
    </AdminLayout>
  );
}
