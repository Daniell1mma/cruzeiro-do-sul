import { AdminLayout } from "@/components/layout/AdminLayout";
import { useListLibraryItems, useDeleteLibraryItem, getListLibraryItemsQueryKey } from "@workspace/api-client-react";
import { Button } from "@/components/ui/button";
import { Trash2, FileText, Headphones, Video, BookOpen, Link as LinkIcon, File } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";

const typeIcon: Record<string, JSX.Element> = {
  pdf:     <FileText size={16} className="text-red-500" />,
  audio:   <Headphones size={16} className="text-purple-500" />,
  video:   <Video size={16} className="text-blue-500" />,
  book:    <BookOpen size={16} className="text-green-500" />,
  article: <LinkIcon size={16} className="text-orange-500" />,
};

export function Library() {
  const { data: items, isLoading } = useListLibraryItems();
  const deleteItem = useDeleteLibraryItem();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const handleDelete = (id: number) => {
    if (!confirm("Excluir este material?")) return;
    deleteItem.mutate({ id }, {
      onSuccess: () => {
        toast({ title: "Material excluído" });
        queryClient.invalidateQueries({ queryKey: getListLibraryItemsQueryKey() });
      },
      onError: () => toast({ title: "Erro ao excluir", variant: "destructive" }),
    });
  };

  return (
    <AdminLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-serif font-bold text-foreground">Biblioteca</h1>
        <p className="text-muted-foreground mt-2">Gerencie os materiais disponíveis na biblioteca.</p>
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
                <th className="px-6 py-4 font-medium">Autor</th>
                <th className="px-6 py-4 font-medium">Categoria</th>
                <th className="px-6 py-4 font-medium text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {items.map(item => (
                <tr key={item.id} className="hover:bg-muted/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {typeIcon[item.type] ?? <File size={16} className="text-gray-400" />}
                      <span className="text-xs font-medium capitalize text-muted-foreground">{item.type}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-bold text-foreground">{item.title}</div>
                    {item.description && <div className="text-muted-foreground text-xs mt-1 line-clamp-1">{item.description}</div>}
                  </td>
                  <td className="px-6 py-4 text-muted-foreground">{item.author || '-'}</td>
                  <td className="px-6 py-4 text-muted-foreground">{item.category || '-'}</td>
                  <td className="px-6 py-4 text-right">
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive" onClick={() => handleDelete(item.id)}>
                      <Trash2 size={16} />
                    </Button>
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
