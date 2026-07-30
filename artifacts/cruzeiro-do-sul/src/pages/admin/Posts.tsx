import { AdminLayout } from "@/components/layout/AdminLayout";
import { useListPosts, useDeletePost, getListPostsQueryKey } from "@workspace/api-client-react";
import { Button } from "@/components/ui/button";
import { Plus, Edit2, Trash2, Calendar, FileCheck, FileEdit, Clock } from "lucide-react";
import { Link } from "wouter";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";

export function Posts() {
  const { data: posts, isLoading } = useListPosts();
  const deletePost = useDeletePost();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const handleDelete = (id: number) => {
    if (confirm("Tem certeza que deseja excluir este post?")) {
      deletePost.mutate({ id }, {
        onSuccess: () => {
          toast({ title: "Post excluído com sucesso" });
          queryClient.invalidateQueries({ queryKey: getListPostsQueryKey() });
        },
        onError: () => {
          toast({ title: "Erro ao excluir", variant: "destructive" });
        }
      });
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'published': return <span className="inline-flex items-center gap-1 text-xs font-bold px-2 py-1 rounded bg-green-100 text-green-700"><FileCheck size={14} /> Publicado</span>;
      case 'draft': return <span className="inline-flex items-center gap-1 text-xs font-bold px-2 py-1 rounded bg-gray-100 text-gray-700"><FileEdit size={14} /> Rascunho</span>;
      case 'scheduled': return <span className="inline-flex items-center gap-1 text-xs font-bold px-2 py-1 rounded bg-blue-100 text-blue-700"><Clock size={14} /> Agendado</span>;
      default: return null;
    }
  };

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-serif font-bold text-foreground">Blog Posts</h1>
          <p className="text-muted-foreground mt-2">Gerencie os artigos do blog.</p>
        </div>
        <Button className="gap-2">
          <Plus size={16} /> Novo Post
        </Button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-border overflow-hidden">
        {isLoading ? (
          <div className="p-8 flex justify-center"><div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full"></div></div>
        ) : !posts || posts.length === 0 ? (
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
                  <td className="px-6 py-4">
                    {getStatusBadge(post.status)}
                    {post.featured && <span className="ml-2 inline-flex items-center gap-1 text-xs font-bold px-2 py-1 rounded bg-amber-100 text-amber-700">Destaque</span>}
                  </td>
                  <td className="px-6 py-4 text-muted-foreground">{post.category || '-'}</td>
                  <td className="px-6 py-4 text-muted-foreground">
                    {format(new Date(post.createdAt), "dd MMM yyyy", { locale: ptBR })}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary">
                        <Edit2 size={16} />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive" onClick={() => handleDelete(post.id)}>
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </AdminLayout>
  );
}
