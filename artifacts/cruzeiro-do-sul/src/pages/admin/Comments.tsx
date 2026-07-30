import { useState } from "react";
import { AdminLayout } from "@/components/layout/AdminLayout";
import {
  useListComments, useUpdateComment, useDeleteComment,
  getListCommentsQueryKey,
} from "@workspace/api-client-react";
import type { Comment } from "@workspace/api-client-react";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, Trash2, Edit2, MessageSquare } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { FormModal, Textarea, Checkbox } from "@/components/admin/FormModal";

export function Comments() {
  const { data: comments, isLoading } = useListComments();
  const updateComment = useUpdateComment();
  const deleteComment = useDeleteComment();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const [modal, setModal] = useState<{ open: boolean; comment: Comment | null; tab: "edit" | "reply" }>({ open: false, comment: null, tab: "edit" });
  const [text, setText] = useState("");
  const [replyText, setReplyText] = useState("");
  const [approved, setApproved] = useState(false);

  const invalidate = () => queryClient.invalidateQueries({ queryKey: getListCommentsQueryKey() });

  const openEdit = (c: Comment) => {
    setText(c.text ?? "");
    setReplyText(c.adminReply ?? "");
    setApproved(c.approved ?? false);
    setModal({ open: true, comment: c, tab: "edit" });
  };
  const closeModal = () => setModal({ open: false, comment: null, tab: "edit" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!modal.comment) return;
    updateComment.mutate({ id: modal.comment.id, data: { text, adminReply: replyText || undefined, approved } }, {
      onSuccess: () => { toast({ title: "Comentário atualizado" }); invalidate(); closeModal(); },
      onError:   () => toast({ title: "Erro ao salvar", variant: "destructive" }),
    });
  };

  const handleToggleApprove = (id: number, approved: boolean) => {
    updateComment.mutate({ id, data: { approved: !approved } }, {
      onSuccess: () => { toast({ title: !approved ? "Comentário aprovado" : "Comentário ocultado" }); invalidate(); },
      onError:   () => toast({ title: "Erro ao atualizar", variant: "destructive" }),
    });
  };

  const handleDelete = (id: number) => {
    if (!confirm("Excluir este comentário?")) return;
    deleteComment.mutate({ id }, {
      onSuccess: () => { toast({ title: "Comentário excluído" }); invalidate(); },
      onError:   () => toast({ title: "Erro ao excluir", variant: "destructive" }),
    });
  };

  const pending = comments?.filter(c => !c.approved).length ?? 0;

  return (
    <AdminLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-serif font-bold text-foreground">Comentários</h1>
        <p className="text-muted-foreground mt-2">
          Modere e responda comentários dos visitantes.
          {pending > 0 && <span className="ml-2 inline-flex items-center gap-1 text-xs font-bold px-2 py-1 rounded bg-amber-100 text-amber-700">{pending} pendente{pending > 1 ? "s" : ""}</span>}
        </p>
      </div>

      {isLoading ? (
        <div className="p-8 flex justify-center"><div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" /></div>
      ) : !comments?.length ? (
        <div className="bg-white rounded-xl shadow-sm border border-border p-8 text-center text-muted-foreground">Nenhum comentário encontrado.</div>
      ) : (
        <div className="space-y-4">
          {comments.map(c => (
            <div key={c.id} className={`bg-white rounded-xl shadow-sm border overflow-hidden ${!c.approved ? "border-amber-200" : "border-border"}`}>
              <div className="px-6 py-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2 flex-wrap">
                      <span className="font-bold text-foreground">{c.authorName || 'Anônimo'}</span>
                      {c.authorEmail && <span className="text-xs text-muted-foreground">{c.authorEmail}</span>}
                      {c.postType && <span className="text-xs bg-muted px-2 py-0.5 rounded-full text-muted-foreground capitalize">{c.postType}</span>}
                      {c.approved
                        ? <span className="inline-flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded bg-green-100 text-green-700">Aprovado</span>
                        : <span className="inline-flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-700">Pendente</span>}
                    </div>
                    <p className="text-sm text-foreground/80">{c.text}</p>

                    {c.adminReply && (
                      <div className="mt-3 pl-4 border-l-2 border-primary/30 bg-muted/30 rounded-r-lg p-3">
                        <div className="flex items-center gap-1.5 mb-1">
                          <MessageSquare size={12} className="text-primary" />
                          <span className="text-xs font-bold text-primary">Resposta do administrador</span>
                        </div>
                        <p className="text-sm text-foreground/70">{c.adminReply}</p>
                      </div>
                    )}
                  </div>

                  <div className="flex gap-1 shrink-0">
                    <Button variant="ghost" size="icon" title={c.approved ? "Ocultar" : "Aprovar"} className={`h-8 w-8 ${c.approved ? "text-muted-foreground hover:text-amber-600" : "text-muted-foreground hover:text-green-600"}`} onClick={() => handleToggleApprove(c.id, !!c.approved)}>
                      {c.approved ? <XCircle size={16} /> : <CheckCircle size={16} />}
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary" title="Editar / Responder" onClick={() => openEdit(c)}><Edit2 size={16} /></Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive" onClick={() => handleDelete(c.id)}><Trash2 size={16} /></Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <FormModal open={modal.open} onClose={closeModal} title="Editar Comentário" onSubmit={handleSubmit} isPending={updateComment.isPending}>
        <Textarea label="Texto do comentário" required rows={3} value={text} onChange={e => setText(e.target.value)} />
        <Textarea label="Resposta do administrador" rows={3} value={replyText} onChange={e => setReplyText(e.target.value)} hint="Deixe em branco para não responder" />
        <Checkbox label="Aprovado — visível no site" checked={approved} onChange={e => setApproved(e.target.checked)} />
      </FormModal>
    </AdminLayout>
  );
}
