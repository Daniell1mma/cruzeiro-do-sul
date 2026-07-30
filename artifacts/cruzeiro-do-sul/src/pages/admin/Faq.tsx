import { useState } from "react";
import { AdminLayout } from "@/components/layout/AdminLayout";
import {
  useListFaqItems, useCreateFaqItem, useUpdateFaqItem, useDeleteFaqItem,
  getListFaqItemsQueryKey,
} from "@workspace/api-client-react";
import type { FaqItem, FaqItemInput } from "@workspace/api-client-react";
import { Button } from "@/components/ui/button";
import { Plus, Edit2, Trash2, ChevronDown, ChevronRight } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { FormModal, Input, Textarea, Row } from "@/components/admin/FormModal";

const EMPTY: FaqItemInput = { question: "", answer: "", category: "", sortOrder: 0 };

export function Faq() {
  const { data: items, isLoading } = useListFaqItems();
  const createItem = useCreateFaqItem();
  const updateItem = useUpdateFaqItem();
  const deleteItem = useDeleteFaqItem();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const [modal, setModal] = useState<{ open: boolean; editing: FaqItem | null }>({ open: false, editing: null });
  const [form, setForm] = useState<FaqItemInput>(EMPTY);
  const [expanded, setExpanded] = useState<Record<number, boolean>>({});

  const invalidate = () => queryClient.invalidateQueries({ queryKey: getListFaqItemsQueryKey() });

  const openCreate = () => { setForm(EMPTY); setModal({ open: true, editing: null }); };
  const openEdit = (item: FaqItem) => {
    setForm({ question: item.question, answer: item.answer, category: item.category ?? "", sortOrder: item.sortOrder ?? 0 });
    setModal({ open: true, editing: item });
  };
  const closeModal = () => setModal({ open: false, editing: null });
  const set = (k: keyof FaqItemInput, v: unknown) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = { ...form, sortOrder: Number(form.sortOrder) };
    if (modal.editing) {
      updateItem.mutate({ id: modal.editing.id, data }, {
        onSuccess: () => { toast({ title: "Pergunta atualizada" }); invalidate(); closeModal(); },
        onError:   () => toast({ title: "Erro ao salvar", variant: "destructive" }),
      });
    } else {
      createItem.mutate({ data }, {
        onSuccess: () => { toast({ title: "Pergunta adicionada" }); invalidate(); closeModal(); },
        onError:   () => toast({ title: "Erro ao criar", variant: "destructive" }),
      });
    }
  };

  const handleDelete = (id: number) => {
    if (!confirm("Excluir esta pergunta?")) return;
    deleteItem.mutate({ id }, {
      onSuccess: () => { toast({ title: "Pergunta excluída" }); invalidate(); },
      onError:   () => toast({ title: "Erro ao excluir", variant: "destructive" }),
    });
  };

  const toggle = (id: number) => setExpanded(p => ({ ...p, [id]: !p[id] }));
  const isPending = createItem.isPending || updateItem.isPending;

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-serif font-bold text-foreground">FAQ</h1>
          <p className="text-muted-foreground mt-2">Gerencie as perguntas frequentes do site.</p>
        </div>
        <Button className="gap-2" onClick={openCreate}><Plus size={16} /> Nova Pergunta</Button>
      </div>

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
                <div className="flex gap-2 shrink-0">
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary" onClick={() => openEdit(item)}><Edit2 size={16} /></Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive" onClick={() => handleDelete(item.id)}><Trash2 size={16} /></Button>
                </div>
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

      <FormModal open={modal.open} onClose={closeModal} title={modal.editing ? "Editar Pergunta" : "Nova Pergunta"} onSubmit={handleSubmit} isPending={isPending} size="lg">
        <Row>
          <Input label="Categoria" value={form.category ?? ""} onChange={e => set("category", e.target.value)} placeholder="Ex: Apometria, Cursos, Atendimento" />
          <Input label="Ordem de exibição" type="number" value={String(form.sortOrder ?? 0)} onChange={e => set("sortOrder", +e.target.value)} hint="Menor número aparece primeiro" />
        </Row>
        <Input label="Pergunta" required value={form.question} onChange={e => set("question", e.target.value)} placeholder="Ex: O que é Apometria?" />
        <Textarea label="Resposta" required rows={5} value={form.answer} onChange={e => set("answer", e.target.value)} />
      </FormModal>
    </AdminLayout>
  );
}
