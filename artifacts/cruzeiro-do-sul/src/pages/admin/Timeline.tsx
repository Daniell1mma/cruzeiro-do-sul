import { useState } from "react";
import { AdminLayout } from "@/components/layout/AdminLayout";
import {
  useListTimelineEvents, useCreateTimelineEvent, useUpdateTimelineEvent, useDeleteTimelineEvent,
  getListTimelineEventsQueryKey,
} from "@workspace/api-client-react";
import type { TimelineEvent, TimelineEventInput } from "@workspace/api-client-react";
import { Button } from "@/components/ui/button";
import { Plus, Edit2, Trash2 } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { FormModal, Input, Textarea, Row } from "@/components/admin/FormModal";

const EMPTY: TimelineEventInput = { year: "", title: "", text: "", imageUrl: "", sortOrder: 0 };

export function Timeline() {
  const { data: events, isLoading } = useListTimelineEvents();
  const createEvent = useCreateTimelineEvent();
  const updateEvent = useUpdateTimelineEvent();
  const deleteEvent = useDeleteTimelineEvent();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const [modal, setModal] = useState<{ open: boolean; editing: TimelineEvent | null }>({ open: false, editing: null });
  const [form, setForm] = useState<TimelineEventInput>(EMPTY);

  const invalidate = () => queryClient.invalidateQueries({ queryKey: getListTimelineEventsQueryKey() });

  const openCreate = () => { setForm(EMPTY); setModal({ open: true, editing: null }); };
  const openEdit = (ev: TimelineEvent) => {
    setForm({ year: ev.year, title: ev.title, text: ev.text, imageUrl: ev.imageUrl ?? "", sortOrder: ev.sortOrder ?? 0 });
    setModal({ open: true, editing: ev });
  };
  const closeModal = () => setModal({ open: false, editing: null });
  const set = (k: keyof TimelineEventInput, v: unknown) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = { ...form, sortOrder: Number(form.sortOrder) };
    if (modal.editing) {
      updateEvent.mutate({ id: modal.editing.id, data }, {
        onSuccess: () => { toast({ title: "Evento atualizado" }); invalidate(); closeModal(); },
        onError:   () => toast({ title: "Erro ao salvar", variant: "destructive" }),
      });
    } else {
      createEvent.mutate({ data }, {
        onSuccess: () => { toast({ title: "Evento adicionado" }); invalidate(); closeModal(); },
        onError:   () => toast({ title: "Erro ao criar", variant: "destructive" }),
      });
    }
  };

  const handleDelete = (id: number) => {
    if (!confirm("Excluir este evento?")) return;
    deleteEvent.mutate({ id }, {
      onSuccess: () => { toast({ title: "Evento excluído" }); invalidate(); },
      onError:   () => toast({ title: "Erro ao excluir", variant: "destructive" }),
    });
  };

  const isPending = createEvent.isPending || updateEvent.isPending;

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-serif font-bold text-foreground">Nossa História</h1>
          <p className="text-muted-foreground mt-2">Gerencie os eventos da linha do tempo.</p>
        </div>
        <Button className="gap-2" onClick={openCreate}><Plus size={16} /> Novo Evento</Button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-border overflow-hidden">
        {isLoading ? (
          <div className="p-8 flex justify-center"><div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" /></div>
        ) : !events?.length ? (
          <div className="p-8 text-center text-muted-foreground">Nenhum evento cadastrado.</div>
        ) : (
          <table className="w-full text-left text-sm">
            <thead className="bg-muted/50 text-muted-foreground">
              <tr>
                <th className="px-6 py-4 font-medium w-20">Ano</th>
                <th className="px-6 py-4 font-medium">Título</th>
                <th className="px-6 py-4 font-medium w-1/2">Descrição</th>
                <th className="px-6 py-4 font-medium w-16 text-center">Ordem</th>
                <th className="px-6 py-4 font-medium text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {events.map(ev => (
                <tr key={ev.id} className="hover:bg-muted/30 transition-colors">
                  <td className="px-6 py-4 font-bold text-primary text-lg">{ev.year}</td>
                  <td className="px-6 py-4 font-medium text-foreground">{ev.title}</td>
                  <td className="px-6 py-4 text-muted-foreground text-xs line-clamp-2">{ev.text}</td>
                  <td className="px-6 py-4 text-center text-muted-foreground">{ev.sortOrder}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary" onClick={() => openEdit(ev)}><Edit2 size={16} /></Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive" onClick={() => handleDelete(ev.id)}><Trash2 size={16} /></Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <FormModal open={modal.open} onClose={closeModal} title={modal.editing ? "Editar Evento" : "Novo Evento"} onSubmit={handleSubmit} isPending={isPending}>
        <Row>
          <Input label="Ano" required value={form.year} onChange={e => set("year", e.target.value)} placeholder="Ex: 2005" />
          <Input label="Ordem de exibição" type="number" value={String(form.sortOrder ?? 0)} onChange={e => set("sortOrder", +e.target.value)} hint="Menor número aparece primeiro" />
        </Row>
        <Input label="Título do Evento" required value={form.title} onChange={e => set("title", e.target.value)} placeholder="Ex: Fundação da Fraternidade" />
        <Textarea label="Descrição" required rows={4} value={form.text} onChange={e => set("text", e.target.value)} />
        <Input label="URL da Imagem" value={form.imageUrl ?? ""} onChange={e => set("imageUrl", e.target.value)} hint="Opcional — foto associada ao evento" />
      </FormModal>
    </AdminLayout>
  );
}
