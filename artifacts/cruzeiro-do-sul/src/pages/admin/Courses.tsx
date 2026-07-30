import { useState } from "react";
import { AdminLayout } from "@/components/layout/AdminLayout";
import {
  useListCourses, useCreateCourse, useUpdateCourse, useDeleteCourse,
  getListCoursesQueryKey,
} from "@workspace/api-client-react";
import type { Course, CourseInput } from "@workspace/api-client-react";
import { Button } from "@/components/ui/button";
import { Plus, Edit2, Trash2, Star } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { FormModal, Input, Textarea, Select, Checkbox, Row, slugify } from "@/components/admin/FormModal";

const EMPTY: CourseInput = {
  name: "", slug: "", imageUrl: "", description: "",
  audience: "", duration: "", instructor: "", status: "open", featured: false,
};

const statusOpts = [
  { value: "open",     label: "Aberto — inscrições abertas" },
  { value: "upcoming", label: "Em breve" },
  { value: "closed",   label: "Encerrado" },
];

const statusBadge = (s: string) => {
  const m: Record<string, string> = { open: "bg-green-100 text-green-700", upcoming: "bg-blue-100 text-blue-700", closed: "bg-gray-100 text-gray-500" };
  const l: Record<string, string> = { open: "Aberto", upcoming: "Em breve", closed: "Encerrado" };
  return <span className={`inline-flex text-xs font-bold px-2 py-1 rounded ${m[s] ?? "bg-gray-100 text-gray-600"}`}>{l[s] ?? s}</span>;
};

export function Courses() {
  const { data: courses, isLoading } = useListCourses();
  const createCourse = useCreateCourse();
  const updateCourse = useUpdateCourse();
  const deleteCourse = useDeleteCourse();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const [modal, setModal] = useState<{ open: boolean; editing: Course | null }>({ open: false, editing: null });
  const [form, setForm] = useState<CourseInput>(EMPTY);

  const invalidate = () => queryClient.invalidateQueries({ queryKey: getListCoursesQueryKey() });

  const openCreate = () => { setForm(EMPTY); setModal({ open: true, editing: null }); };
  const openEdit = (c: Course) => {
    setForm({
      name: c.name, slug: c.slug ?? "", imageUrl: c.imageUrl ?? "", description: c.description ?? "",
      audience: c.audience ?? "", duration: c.duration ?? "", instructor: c.instructor ?? "",
      status: (c.status as CourseInput["status"]) ?? "open", featured: c.featured ?? false,
    });
    setModal({ open: true, editing: c });
  };
  const closeModal = () => setModal({ open: false, editing: null });
  const set = (k: keyof CourseInput, v: unknown) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (modal.editing) {
      updateCourse.mutate({ id: modal.editing.id, data: form }, {
        onSuccess: () => { toast({ title: "Curso atualizado" }); invalidate(); closeModal(); },
        onError:   () => toast({ title: "Erro ao salvar", variant: "destructive" }),
      });
    } else {
      createCourse.mutate({ data: form }, {
        onSuccess: () => { toast({ title: "Curso criado" }); invalidate(); closeModal(); },
        onError:   () => toast({ title: "Erro ao criar", variant: "destructive" }),
      });
    }
  };

  const handleDelete = (id: number) => {
    if (!confirm("Excluir este curso?")) return;
    deleteCourse.mutate({ id }, {
      onSuccess: () => { toast({ title: "Curso excluído" }); invalidate(); },
      onError:   () => toast({ title: "Erro ao excluir", variant: "destructive" }),
    });
  };

  const isPending = createCourse.isPending || updateCourse.isPending;

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-serif font-bold text-foreground">Cursos</h1>
          <p className="text-muted-foreground mt-2">Gerencie os cursos da Fraternidade.</p>
        </div>
        <Button className="gap-2" onClick={openCreate}><Plus size={16} /> Novo Curso</Button>
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
                <th className="px-6 py-4 font-medium">Instrutor</th>
                <th className="px-6 py-4 font-medium">Duração</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {courses.map(c => (
                <tr key={c.id} className="hover:bg-muted/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-bold text-foreground">{c.name}</div>
                    <div className="text-muted-foreground text-xs mt-1 line-clamp-1">{c.description}</div>
                  </td>
                  <td className="px-6 py-4 text-muted-foreground">{c.instructor || '-'}</td>
                  <td className="px-6 py-4 text-muted-foreground text-xs">{c.duration || '-'}</td>
                  <td className="px-6 py-4 space-x-1">
                    {statusBadge(c.status)}
                    {c.featured && <span className="inline-flex items-center gap-1 text-xs font-bold px-2 py-1 rounded bg-amber-100 text-amber-700"><Star size={10} />Destaque</span>}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary" onClick={() => openEdit(c)}><Edit2 size={16} /></Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive" onClick={() => handleDelete(c.id)}><Trash2 size={16} /></Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <FormModal open={modal.open} onClose={closeModal} title={modal.editing ? "Editar Curso" : "Novo Curso"} onSubmit={handleSubmit} isPending={isPending} size="lg">
        <Row>
          <Input label="Nome do Curso" required value={form.name} onChange={e => { set("name", e.target.value); if (!modal.editing) set("slug", slugify(e.target.value)); }} />
          <Input label="Slug" value={form.slug ?? ""} onChange={e => set("slug", e.target.value)} hint="Gerado automaticamente" />
        </Row>
        <Textarea label="Descrição" rows={3} value={form.description ?? ""} onChange={e => set("description", e.target.value)} />
        <Row>
          <Input label="Público-alvo" value={form.audience ?? ""} onChange={e => set("audience", e.target.value)} hint="Ex: Iniciantes sem experiência" />
          <Input label="Duração" value={form.duration ?? ""} onChange={e => set("duration", e.target.value)} hint="Ex: 32 horas — 8 encontros" />
        </Row>
        <Row>
          <Input label="Instrutor" value={form.instructor ?? ""} onChange={e => set("instructor", e.target.value)} />
          <Select label="Status" value={form.status ?? "open"} onChange={e => set("status", e.target.value as CourseInput["status"])} options={statusOpts} />
        </Row>
        <Input label="URL da Imagem de Capa" value={form.imageUrl ?? ""} onChange={e => set("imageUrl", e.target.value)} hint="Cole o endereço da imagem" />
        <Checkbox label="Destaque na Home" description="Exibir este curso na seção de cursos da página inicial" checked={form.featured ?? false} onChange={e => set("featured", e.target.checked)} />
      </FormModal>
    </AdminLayout>
  );
}
