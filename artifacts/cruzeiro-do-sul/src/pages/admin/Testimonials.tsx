import { AdminLayout } from "@/components/layout/AdminLayout";
import { useListTestimonials, useUpdateTestimonial, useDeleteTestimonial, getListTestimonialsQueryKey } from "@workspace/api-client-react";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, Trash2 } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";

export function Testimonials() {
  const { data: testimonials, isLoading } = useListTestimonials();
  const updateTestimonial = useUpdateTestimonial();
  const deleteTestimonial = useDeleteTestimonial();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const handleUpdateStatus = (id: number, approved: boolean) => {
    updateTestimonial.mutate({ id, data: { approved } }, {
      onSuccess: () => {
        toast({ title: approved ? "Depoimento aprovado" : "Depoimento ocultado" });
        queryClient.invalidateQueries({ queryKey: getListTestimonialsQueryKey() });
      },
      onError: () => {
        toast({ title: "Erro ao atualizar", variant: "destructive" });
      }
    });
  };

  const handleDelete = (id: number) => {
    if (confirm("Tem certeza que deseja excluir este depoimento?")) {
      deleteTestimonial.mutate({ id }, {
        onSuccess: () => {
          toast({ title: "Excluído com sucesso" });
          queryClient.invalidateQueries({ queryKey: getListTestimonialsQueryKey() });
        },
        onError: () => {
          toast({ title: "Erro ao excluir", variant: "destructive" });
        }
      });
    }
  };

  return (
    <AdminLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-serif font-bold text-foreground">Depoimentos</h1>
        <p className="text-muted-foreground mt-2">Aprove ou rejeite depoimentos deixados por visitantes.</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-border overflow-hidden">
        {isLoading ? (
          <div className="p-8 flex justify-center"><div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full"></div></div>
        ) : !testimonials || testimonials.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground">Nenhum depoimento encontrado.</div>
        ) : (
          <table className="w-full text-left text-sm">
            <thead className="bg-muted/50 text-muted-foreground">
              <tr>
                <th className="px-6 py-4 font-medium">Nome / Cidade</th>
                <th className="px-6 py-4 font-medium w-1/2">Texto</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {testimonials.map(item => (
                <tr key={item.id} className="hover:bg-muted/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-bold text-foreground">{item.name}</div>
                    <div className="text-muted-foreground text-xs mt-1">{item.city || '-'}</div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-foreground/80 line-clamp-2">{item.text}</p>
                  </td>
                  <td className="px-6 py-4">
                    {item.approved ? (
                      <span className="inline-flex items-center gap-1 text-xs font-bold px-2 py-1 rounded bg-green-100 text-green-700">Aprovado</span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-xs font-bold px-2 py-1 rounded bg-amber-100 text-amber-700">Pendente</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      {item.approved ? (
                        <Button variant="ghost" size="icon" title="Ocultar" className="h-8 w-8 text-muted-foreground hover:text-amber-600" onClick={() => handleUpdateStatus(item.id, false)}>
                          <XCircle size={16} />
                        </Button>
                      ) : (
                        <Button variant="ghost" size="icon" title="Aprovar" className="h-8 w-8 text-muted-foreground hover:text-green-600" onClick={() => handleUpdateStatus(item.id, true)}>
                          <CheckCircle size={16} />
                        </Button>
                      )}
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive" onClick={() => handleDelete(item.id)}>
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
