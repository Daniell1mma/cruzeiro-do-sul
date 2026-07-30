import { AdminLayout } from "@/components/layout/AdminLayout";
import { useListCourses, useDeleteCourse, useUpdateCourse, getListCoursesQueryKey } from "@workspace/api-client-react";
import { Button } from "@/components/ui/button";
import { Trash2, CheckCircle, XCircle, Star } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";

const statusLabel: Record<string, { label: string; classes: string }> = {
  open:     { label: "Aberto",    classes: "bg-green-100 text-green-700" },
  upcoming: { label: "Em breve",  classes: "bg-blue-100 text-blue-700" },
  closed:   { label: "Encerrado", classes: "bg-gray-100 text-gray-500" },
};

export function Courses() {
  const { data: courses, isLoading } = useListCourses();
  const deleteCourse = useDeleteCourse();
  const updateCourse = useUpdateCourse();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const invalidate = () => queryClient.invalidateQueries({ queryKey: getListCoursesQueryKey() });

  const handleDelete = (id: number) => {
    if (!confirm("Excluir este curso?")) return;
    deleteCourse.mutate({ id }, {
      onSuccess: () => { toast({ title: "Curso excluído" }); invalidate(); },
      onError:   () => toast({ title: "Erro ao excluir", variant: "destructive" }),
    });
  };

  const toggleFeatured = (id: number, featured: boolean) => {
    updateCourse.mutate({ id, data: { featured: !featured } }, {
      onSuccess: () => { toast({ title: !featured ? "Marcado como destaque" : "Destaque removido" }); invalidate(); },
      onError:   () => toast({ title: "Erro ao atualizar", variant: "destructive" }),
    });
  };

  return (
    <AdminLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-serif font-bold text-foreground">Cursos</h1>
        <p className="text-muted-foreground mt-2">Gerencie os cursos oferecidos pela Fraternidade.</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-border overflow-hidden">
        {isLoading ? (
          <div className="p-8 flex justify-center"><div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" /></div>
        ) : !courses?.length ? (
          <div className="p-8 text-center text-muted-foreground">Nenhum curso cadastrado.</div>
        ) : (
          <table className="w-full text-left text-sm">
            <thead className="bg-muted/50 text-muted-foreground">
              <tr>
                <th className="px-6 py-4 font-medium">Nome</th>
                <th className="px-6 py-4 font-medium">Público</th>
                <th className="px-6 py-4 font-medium">Duração</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {courses.map(course => {
                const s = statusLabel[course.status] ?? { label: course.status, classes: "bg-gray-100 text-gray-600" };
                return (
                  <tr key={course.id} className="hover:bg-muted/30 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-bold text-foreground">{course.name}</div>
                      <div className="text-muted-foreground text-xs mt-1 line-clamp-1">{course.description}</div>
                    </td>
                    <td className="px-6 py-4 text-muted-foreground text-xs max-w-[180px] line-clamp-2">{course.audience || '-'}</td>
                    <td className="px-6 py-4 text-muted-foreground text-xs">{course.duration || '-'}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center text-xs font-bold px-2 py-1 rounded ${s.classes}`}>{s.label}</span>
                      {course.featured && (
                        <span className="ml-2 inline-flex items-center gap-1 text-xs font-bold px-2 py-1 rounded bg-amber-100 text-amber-700">
                          <Star size={10} /> Destaque
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost" size="icon"
                          title={course.featured ? "Remover destaque" : "Destacar na home"}
                          className={`h-8 w-8 ${course.featured ? "text-amber-500 hover:text-amber-700" : "text-muted-foreground hover:text-amber-500"}`}
                          onClick={() => toggleFeatured(course.id, !!course.featured)}
                        >
                          <Star size={16} />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive" onClick={() => handleDelete(course.id)}>
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </AdminLayout>
  );
}
