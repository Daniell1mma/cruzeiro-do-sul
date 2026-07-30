import { useState } from "react";
import { AdminLayout } from "@/components/layout/AdminLayout";
import {
  useListPosts, useCreatePost, useUpdatePost, useDeletePost,
  getListPostsQueryKey,
} from "@workspace/api-client-react";
import type { Post, PostInput } from "@workspace/api-client-react";
import { Button } from "@/components/ui/button";
import { Plus, Edit2, Trash2, FileCheck, FileEdit, Clock, Star } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { FormModal, Input, Textarea, Select, Checkbox, Row, slugify } from "@/components/admin/FormModal";

const EMPTY: PostInput = {
  title: "", slug: "", subtitle: "", coverUrl: "", content: "",
  authorName: "", category: "", tags: "", status: "draft", featured: false,
  seoTitle: "", seoDescription: "",
};

export function Posts() {
  const { data: posts, isLoading } = useListPosts();
  const createPost = useCreatePost();
  const updatePost = useUpdatePost();
  const deletePost = useDeletePost();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const [modal, setModal] = useState<{ open: boolean; editing: Post | null }>({ open: false, editing: null });
  const [form, setForm] = useState<PostInput>(EMPTY);

  const invalidate = () => queryClient.invalidateQueries({ queryKey: getListPostsQueryKey() });

  const openCreate = () => { setForm(EMPTY); setModal({ open: true, editing: null }); };
  const openEdit = (p: Post) => {
    setForm({
      title: p.title, slug: p.slug, subtitle: p.subtitle ?? "", coverUrl: p.coverUrl ?? "",
      content: p.content ?? "", authorName: p.authorName ?? "", category: p.category ?? "",
      tags: p.tags ?? "", status: (p.status as PostInput["status"]) ?? "draft",
      featured: p.featured ?? false, seoTitle: p.seoTitle ?? "", seoDescription: p.seoDescription ?? "",
    });
    setModal({ open: true, editing: p });
  };
  const closeModal = () => setModal({ open: false, editing: null });

  const set = (k: keyof PostInput, v: unknown) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (modal.editing) {
      updatePost.mutate({ id: modal.editing.id, data: form }, {
        onSuccess: () => { toast({ title: "Post atualizado" }); invalidate(); closeModal(); },
        onError:   () => toast({ title: "Erro ao salvar", variant: "destructive" }),
      });
    } else {
      createPost.mutate({ data: form }, {
        onSuccess: () => { toast({ title: "Post criado" }); invalidate(); closeModal(); },
        onError:   () => toast({ title: "Erro ao criar", variant: "destructive" }),
      });
    }
  };

  const handleDelete = (id: number) => {
    if (!confirm("Excluir este post?")) return;
    deletePost.mutate({ id }, {
      onSuccess: () => { toast({ title: "Post excluído" }); invalidate(); },
      onError:   () => toast({ title: "Erro ao excluir", variant: "destructive" }),
    });
  };

  const statusBadge = (status: string) => {
    const map: Record<string, { label: string; cls: string; icon: JSX.Element }> = {
      published: { label: "Publicado", cls: "bg-green-100 text-green-700", icon: <FileCheck size={12} /> },
      draft:     { label: "Rascunho",  cls: "bg-gray-100 text-gray-600",   icon: <FileEdit size={12} /> },
      scheduled: { label: "Agendado",  cls: "bg-blue-100 text-blue-700",   icon: <Clock size={12} /> },
    };
    const s = map[status] ?? map.draft;
    return <span className={`inline-flex items-center gap-1 text-xs font-bold px-2 py-1 rounded ${s.cls}`}>{s.icon}{s.label}</span>;
  };

  const isPending = createPost.isPending || updatePost.isPending;

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-serif font-bold text-foreground">Blog Posts</h1>
          <p className="text-muted-foreground mt-2">Gerencie os artigos do blog.</p>
        </div>
        <Button className="gap-2" onClick={openCreate}><Plus size={16} /> Novo Post</Button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-border overflow-hidden">
        {isLoading ? (
          <div className="p-8 flex justify-center"><div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" /></div>
        ) : !posts?.length ? (
          <div className="p-8 text-center text-muted-foreground">Nenhum post encontrado.</div>
        ) : (
          <table className="w-full text-left text-sm">
            <thead className="bg-muted/50 text-muted-foreground">
              <tr>
                <th className="px-6 py-4 font-medium">Título</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium">Categoria</th>
                <th className="px-6 py-4 font-medium">Data</th>
                <th className="px-6 py-4 font-medium text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {posts.map(post => (
                <tr key={post.id} className="hover:bg-muted/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-bold text-foreground">{post.title}</div>
                    <div className="text-muted-foreground text-xs mt-1">{post.slug}</div>
                  </td>
                  <td className="px-6 py-4 space-x-1">
                    {statusBadge(post.status)}
                    {post.featured && <span className="inline-flex items-center gap-1 text-xs font-bold px-2 py-1 rounded bg-amber-100 text-amber-700"><Star size={10} />Destaque</span>}
                  </td>
                  <td className="px-6 py-4 text-muted-foreground">{post.category || '-'}</td>
                  <td className="px-6 py-4 text-muted-foreground">{format(new Date(post.createdAt), "dd MMM yyyy", { locale: ptBR })}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary" onClick={() => openEdit(post)}><Edit2 size={16} /></Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive" onClick={() => handleDelete(post.id)}><Trash2 size={16} /></Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <FormModal open={modal.open} onClose={closeModal} title={modal.editing ? "Editar Post" : "Novo Post"} onSubmit={handleSubmit} isPending={isPending} size="xl">
        <Row>
          <Input label="Título" required value={form.title} onChange={e => { set("title", e.target.value); if (!modal.editing) set("slug", slugify(e.target.value)); }} />
          <Input label="Slug (URL)" required value={form.slug} onChange={e => set("slug", e.target.value)} hint="Ex: meu-artigo-sobre-apometria" />
        </Row>
        <Input label="Subtítulo" value={form.subtitle ?? ""} onChange={e => set("subtitle", e.target.value)} />
        <Row>
          <Input label="Autor" value={form.authorName ?? ""} onChange={e => set("authorName", e.target.value)} />
          <Input label="Categoria" value={form.category ?? ""} onChange={e => set("category", e.target.value)} />
        </Row>
        <Input label="URL da Imagem de Capa" value={form.coverUrl ?? ""} onChange={e => set("coverUrl", e.target.value)} hint="Cole o endereço da imagem" />
        <Textarea label="Conteúdo" rows={8} value={form.content ?? ""} onChange={e => set("content", e.target.value)} />
        <Row>
          <Select label="Status" value={form.status ?? "draft"} onChange={e => set("status", e.target.value as PostInput["status"])} options={[
            { value: "draft", label: "Rascunho" },
            { value: "published", label: "Publicado" },
            { value: "scheduled", label: "Agendado" },
          ]} />
          <Input label="Tags" value={form.tags ?? ""} onChange={e => set("tags", e.target.value)} hint="Separadas por vírgula" />
        </Row>
        <Checkbox label="Destaque na Home" description="Exibir este post na seção de destaques da página inicial" checked={form.featured ?? false} onChange={e => set("featured", e.target.checked)} />
        <Row>
          <Input label="SEO — Título" value={form.seoTitle ?? ""} onChange={e => set("seoTitle", e.target.value)} />
          <Input label="SEO — Descrição" value={form.seoDescription ?? ""} onChange={e => set("seoDescription", e.target.value)} />
        </Row>
      </FormModal>
    </AdminLayout>
  );
}
