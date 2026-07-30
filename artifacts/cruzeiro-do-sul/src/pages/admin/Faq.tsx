import { AdminLayout } from "@/components/layout/AdminLayout";
import {
  useListFaqItems, useDeleteFaqItem, useCreateFaqItem, useUpdateFaqItem,
  getListFaqItemsQueryKey,
} from "@workspace/api-client-react";
import { Button } from "@/components/ui/button";
import { Trash2, Plus, ChevronDown, ChevronRight } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

export function Faq() {
  const { data: items, isLoading } = useListFaqItems();
  const deleteItem = useDeleteFaqItem();
  const createItem = useCreateFaqItem();
  const updateItem = useUpdateFaqItem();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ question: "", answer: "", category: "", sortOrder: 0 });
  const [expanded, setExpanded] = useState<Record<number, boolean>>({});

  const invalidate = () => queryClient.invalidateQueries({ queryKey: getListFaqItemsQueryKey() });

  const handleDelete = (id: number) => {
    if (!confirm("Excluir esta pergunta?")) return;
    deleteItem.mutate({ id }, {
      onSuccess: () => { toast({ title: "Pergunta excluída" }); invalidate(); },
      onError:   () => toast({ title: "Erro ao excluir", variant: "destructive" }),
    });
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    createItem.mutate({ data: { question: form.question, answer: form.answer, category: form.category || undefined, sortOrder: Number(form.sortOrder) } }, {
      onSuccess: () => {
        toast({ title: "Pergunta adicionada" });
        invalidate();
        setShowForm(false);
        setForm({ question: "", answer: "", category: "", sortOrder: 0 });
      },
      onError: () => toast({ title: "Erro ao salvar", variant: "destructive" }),
    });
  };

  const toggle = (id: number) => setExpanded(prev => ({ ...prev, [id]: !prev[id] }));

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-serif font-bold text-foreground">FAQ</h1>
          <p className="text-muted-foreground mt-2">Gerencie as perguntas frequentes do site.</p>
        </div>
        <Button className="gap-2" onClick={() => setShowForm(v => !v)}>
          <Plus size={16} /> Nova Pergunta
        </Button>
      </div>

      {showForm && (
        <form onSubmit={handleCreate} className="bg-white rounded-xl shadow-sm border border-border p-6 mb-6 space-y-4">
          <h2 className="font-bold text-lg">Nova Pergunta</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Categoria</label>
              <input value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
                placeholder="Ex: Apometria, Cursos…" className="w-full px-3 py-2 rounded-lg border border-input text-sm focus:outline-none focus:ring-2 focus:ring-primary/40" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Ordem</label>
              <input type="number" value={form.sortOrder} onChange={e => setForm(f => ({ ...f, sortOrder: +e.target.value }))}
                className="w-full px-3 py-2 rounded-lg border border-input text-sm focus:outline-none focus:ring-2 focus:ring-primary/40" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Pergunta *</label>
            <input required value={form.question} onChange={e => setForm(f => ({ ...f, question: e.target.value }))}
              placeholder="Ex: O que é Apometria?" className="w-full px-3 py-2 rounded-lg border border-input text-sm focus:outline-none focus:ring-2 focus:ring-primary/40" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Resposta *</label>
            <textarea required rows={4} value={form.answer} onChange={e => setForm(f => ({ ...f, answer: e.target.value }))}
              className="w-full px-3 py-2 rounded-lg border border-input text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 resize-none" />
          </div>
          <div className="flex gap-3 justify-end">
            <Button type="button" variant="outline" onClick={() => setShowForm(false)}>Cancelar</Button>
            <Button type="submit" disabled={createItem.isPending}>{createItem.isPending ? "Salvando…" : "Salvar"}</Button>
          </div>
        </form>
      )}

      {isLoading ? (
        <div className="p-8 flex justify-center"><div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" /></div>
      ) : !items?.length ? (
        <div className="bg-white rounded-xl shadow-sm border border-border p-8 text-center text-muted-foreground">Nenhuma pergunta cadastrada.</div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-border overflow-hidden divide-y divide-border">
          {items.map(item => (
            <div key={item.id}>
              <div className="flex items-center px-6 py-4 gap-4">
                <button className="flex-1 flex items-center gap-3 text-left min-w-0" onClick={() => toggle(item.id)}>
                  {expanded[item.id] ? <ChevronDown size={16} className="shrink-0 text-muted-foreground" /> : <ChevronRight size={16} className="shrink-0 text-muted-foreground" />}
                  <div className="min-w-0">
                    <span className="font-medium text-foreground">{item.question}</span>
                    {item.category && <span className="ml-3 text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">{item.category}</span>}
                  </div>
                </button>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive shrink-0" onClick={() => handleDelete(item.id)}>
                  <Trash2 size={16} />
                </Button>
              </div>
              {expanded[item.id] && (
                <div className="px-6 pb-5 pt-1 bg-muted/20">
                  <p className="text-sm text-foreground/80 leading-relaxed">{item.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </AdminLayout>
  );
}
