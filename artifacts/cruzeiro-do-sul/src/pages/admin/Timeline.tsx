import { AdminLayout } from "@/components/layout/AdminLayout";
import {
  useListTimelineEvents, useDeleteTimelineEvent, useCreateTimelineEvent,
  getListTimelineEventsQueryKey,
} from "@workspace/api-client-react";
import { Button } from "@/components/ui/button";
import { Trash2, Plus } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

export function Timeline() {
  const { data: events, isLoading } = useListTimelineEvents();
  const deleteEvent = useDeleteTimelineEvent();
  const createEvent = useCreateTimelineEvent();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ year: "", title: "", text: "", sortOrder: 0 });

  const invalidate = () => queryClient.invalidateQueries({ queryKey: getListTimelineEventsQueryKey() });

  const handleDelete = (id: number) => {
    if (!confirm("Excluir este evento da linha do tempo?")) return;
    deleteEvent.mutate({ id }, {
      onSuccess: () => { toast({ title: "Evento excluído" }); invalidate(); },
      onError:   () => toast({ title: "Erro ao excluir", variant: "destructive" }),
    });
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    createEvent.mutate({ data: { year: form.year, title: form.title, text: form.text, sortOrder: Number(form.sortOrder) } }, {
      onSuccess: () => {
        toast({ title: "Evento adicionado" });
        invalidate();
        setShowForm(false);
        setForm({ year: "", title: "", text: "", sortOrder: 0 });
      },
      onError: () => toast({ title: "Erro ao salvar", variant: "destructive" }),
    });
  };

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-serif font-bold text-foreground">Nossa História</h1>
          <p className="text-muted-foreground mt-2">Gerencie os eventos da linha do tempo.</p>
        </div>
        <Button className="gap-2" onClick={() => setShowForm(v => !v)}>
          <Plus size={16} /> Novo Evento
        </Button>
      </div>

      {showForm && (
        <form onSubmit={handleCreate} className="bg-white rounded-xl shadow-sm border border-border p-6 mb-6 space-y-4">
          <h2 className="font-bold text-lg">Novo Evento</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Ano *</label>
              <input required value={form.year} onChange={e => setForm(f => ({ ...f, year: e.target.value }))}
                placeholder="2024" className="w-full px-3 py-2 rounded-lg border border-input text-sm focus:outline-none focus:ring-2 focus:ring-primary/40" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Ordem</label>
              <input type="number" value={form.sortOrder} onChange={e => setForm(f => ({ ...f, sortOrder: +e.target.value }))}
                className="w-full px-3 py-2 rounded-lg border border-input text-sm focus:outline-none focus:ring-2 focus:ring-primary/40" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Título *</label>
            <input required value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
              placeholder="Ex: Fundação da Fraternidade" className="w-full px-3 py-2 rounded-lg border border-input text-sm focus:outline-none focus:ring-2 focus:ring-primary/40" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Descrição</label>
            <textarea rows={3} value={form.text} onChange={e => setForm(f => ({ ...f, text: e.target.value }))}
              className="w-full px-3 py-2 rounded-lg border border-input text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 resize-none" />
          </div>
          <div className="flex gap-3 justify-end">
            <Button type="button" variant="outline" onClick={() => setShowForm(false)}>Cancelar</Button>
            <Button type="submit" disabled={createEvent.isPending}>{createEvent.isPending ? "Salvando…" : "Salvar"}</Button>
          </div>
        </form>
      )}

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
                <th className="px-6 py-4 font-medium w-16">Ordem</th>
                <th className="px-6 py-4 font-medium text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {events.map(ev => (
                <tr key={ev.id} className="hover:bg-muted/30 transition-colors">
                  <td className="px-6 py-4 font-bold text-primary">{ev.year}</td>
                  <td className="px-6 py-4 font-medium text-foreground">{ev.title}</td>
                  <td className="px-6 py-4 text-muted-foreground text-xs line-clamp-2">{ev.text || '-'}</td>
                  <td className="px-6 py-4 text-muted-foreground text-center">{ev.sortOrder ?? '-'}</td>
                  <td className="px-6 py-4 text-right">
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive" onClick={() => handleDelete(ev.id)}>
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
