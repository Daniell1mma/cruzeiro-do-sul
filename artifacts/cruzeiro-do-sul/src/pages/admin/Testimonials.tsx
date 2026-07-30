import { useState } from "react";
import { AdminLayout } from "@/components/layout/AdminLayout";
import {
  useListTestimonials, useCreateTestimonial, useUpdateTestimonial, useDeleteTestimonial,
  getListTestimonialsQueryKey,
} from "@workspace/api-client-react";
import type { Testimonial, TestimonialInput } from "@workspace/api-client-react";
import { Button } from "@/components/ui/button";
import { Plus, Edit2, Trash2, CheckCircle, XCircle } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { FormModal, Input, Textarea, Checkbox, Row } from "@/components/admin/FormModal";

const EMPTY: TestimonialInput = { name: "", city: "", photoUrl: "", text: "" };

export function Testimonials() {
  const { data: testimonials, isLoading } = useListTestimonials();
  const createTestimonial = useCreateTestimonial();
  const updateTestimonial = useUpdateTestimonial();
  const deleteTestimonial = useDeleteTestimonial();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const [modal, setModal] = useState<{ open: boolean; editing: Testimonial | null }>({ open: false, editing: null });
  const [form, setForm] = useState<TestimonialInput & { approved?: boolean }>(EMPTY);

  const invalidate = () => queryClient.invalidateQueries({ queryKey: getListTestimonialsQueryKey() });

  const openCreate = () => { setForm({ ...EMPTY, approved: false }); setModal({ open: true, editing: null }); };
  const openEdit = (t: Testimonial) => {
    setForm({ name: t.name, city: t.city ?? "", photoUrl: t.photoUrl ?? "", text: t.text, approved: t.approved ?? false });
    setModal({ open: true, editing: t });
  };
  const closeModal = () => setModal({ open: false, editing: null });
  const set = (k: string, v: unknown) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { approved, ...input } = form;
    if (modal.editing) {
      updateTestimonial.mutate({ id: modal.editing.id, data: { ...input, approved } }, {
        onSuccess: () => { toast({ title: "Depoimento atualizado" }); invalidate(); closeModal(); },
        onError:   () => toast({ title: "Erro ao salvar", variant: "destructive" }),
      });
    } else {
      createTestimonial.mutate({ data: input }, {
        onSuccess: () => { toast({ title: "Depoimento adicionado" }); invalidate(); closeModal(); },
        onError:   () => toast({ title: "Erro ao criar", variant: "destructive" }),
      });
    }
  };

  const handleToggleApprove = (id: number, approved: boolean) => {
    updateTestimonial.mutate({ id, data: { approved: !approved } }, {
      onSuccess: () => { toast({ title: !approved ? "Depoimento aprovado" : "Depoimento ocultado" }); invalidate(); },
      onError:   () => toast({ title: "Erro ao atualizar", variant: "destructive" }),
    });
  };

  const handleDelete = (id: number) => {
    if (!confirm("Excluir este depoimento?")) return;
    deleteTestimonial.mutate({ id }, {
      onSuccess: () => { toast({ title: "Depoimento excluído" }); invalidate(); },
      onError:   () => toast({ title: "Erro ao excluir", variant: "destructive" }),
    });
  };

  const isPending = createTestimonial.isPending || updateTestimonial.isPending;

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-serif font-bold text-foreground">Depoimentos</h1>
          <p className="text-muted-foreground mt-2">Gerencie e modere os depoimentos dos visitantes.</p>
        </div>
        <Button className="gap-2" onClick={openCreate}><Plus size={16} /> Novo Depoimento</Button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-border overflow-hidden">
        {isLoading ? (
          <div className="p-8 flex justify-center"><div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" /></div>
        ) : !testimonials?.length ? (
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
              {testimonials.map(t => (
                <tr key={t.id} className="hover:bg-muted/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-bold text-foreground">{t.name}</div>
                    <div className="text-muted-foreground text-xs mt-1">{t.city || '-'}</div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-foreground/80 line-clamp-2 text-sm">{t.text}</p>
                  </td>
                  <td className="px-6 py-4">
                    {t.approved
                      ? <span className="inline-flex items-center gap-1 text-xs font-bold px-2 py-1 rounded bg-green-100 text-green-700">Aprovado</span>
                      : <span className="inline-flex items-center gap-1 text-xs font-bold px-2 py-1 rounded bg-amber-100 text-amber-700">Pendente</span>}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" title={t.approved ? "Ocultar" : "Aprovar"} className={`h-8 w-8 ${t.approved ? "text-muted-foreground hover:text-amber-600" : "text-muted-foreground hover:text-green-600"}`} onClick={() => handleToggleApprove(t.id, !!t.approved)}>
                        {t.approved ? <XCircle size={16} /> : <CheckCircle size={16} />}
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary" onClick={() => openEdit(t)}><Edit2 size={16} /></Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive" onClick={() => handleDelete(t.id)}><Trash2 size={16} /></Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <FormModal open={modal.open} onClose={closeModal} title={modal.editing ? "Editar Depoimento" : "Novo Depoimento"} onSubmit={handleSubmit} isPending={isPending}>
        <Row>
          <Input label="Nome" required value={form.name} onChange={e => set("name", e.target.value)} />
          <Input label="Cidade" value={form.city ?? ""} onChange={e => set("city", e.target.value)} placeholder="Ex: Guarulhos, SP" />
        </Row>
        <Textarea label="Depoimento" required rows={4} value={form.text} onChange={e => set("text", e.target.value)} />
        <Input label="URL da Foto (opcional)" value={form.photoUrl ?? ""} onChange={e => set("photoUrl", e.target.value)} hint="Foto do autor do depoimento" />
        {modal.editing && (
          <Checkbox label="Aprovado — visível no site" checked={form.approved ?? false} onChange={e => set("approved", e.target.checked)} />
        )}
      </FormModal>
    </AdminLayout>
  );
}
