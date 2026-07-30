import { AdminLayout } from "@/components/layout/AdminLayout";
import {
  useListComments, useUpdateComment, useDeleteComment,
  getListCommentsQueryKey,
} from "@workspace/api-client-react";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, Trash2 } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

export function Comments() {
  const { data: comments, isLoading } = useListComments();
  const updateComment = useUpdateComment();
  const deleteComment = useDeleteComment();
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [replyId, setReplyId] = useState<number | null>(null);
  const [replyText, setReplyText] = useState("");

  const invalidate = () => queryClient.invalidateQueries({ queryKey: getListCommentsQueryKey() });

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

  const handleReply = (id: number) => {
    if (!replyText.trim()) return;
    updateComment.mutate({ id, data: { adminReply: replyText.trim() } }, {
      onSuccess: () => { toast({ title: "Resposta salva" }); invalidate(); setReplyId(null); setReplyText(""); },
      onError:   () => toast({ title: "Erro ao salvar", variant: "destructive" }),
    });
  };

  return (
    <AdminLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-serif font-bold text-foreground">Comentários</h1>
        <p className="text-muted-foreground mt-2">Modere e responda os comentários dos visitantes.</p>
      </div>

      {isLoading ? (
        <div className="p-8 flex justify-center"><div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" /></div>
      ) : !comments?.length ? (
        <div className="bg-white rounded-xl shadow-sm border border-border p-8 text-center text-muted-foreground">Nenhum comentário encontrado.</div>
      ) : (
        <div className="space-y-4">
          {comments.map(comment => (
            <div key={comment.id} className="bg-white rounded-xl shadow-sm border border-border p-6">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2 flex-wrap">
                    <span className="font-bold text-foreground">{comment.authorName || 'Anônimo'}</span>
                    {comment.authorEmail && <span className="text-xs text-muted-foreground">{comment.authorEmail}</span>}
                    {comment.approved ? (
                      <span className="inline-flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded bg-green-100 text-green-700">Aprovado</span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-700">Pendente</span>
                    )}
                  </div>
                  <p className="text-sm text-foreground/80 mb-3">{comment.text}</p>

                  {comment.adminReply && (
                    <div className="mt-3 pl-4 border-l-2 border-primary/30 bg-muted/30 rounded-r-lg p-3">
                      <p className="text-xs font-bold text-primary mb-1">Resposta do administrador:</p>
                      <p className="text-sm text-foreground/70">{comment.adminReply}</p>
                    </div>
                  )}

                  {replyId === comment.id && (
                    <div className="mt-3 space-y-2">
                      <textarea
                        rows={2} value={replyText} onChange={e => setReplyText(e.target.value)}
                        placeholder="Escreva uma resposta…"
                        className="w-full px-3 py-2 rounded-lg border border-input text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 resize-none"
                      />
                      <div className="flex gap-2">
                        <Button size="sm" onClick={() => handleReply(comment.id)} disabled={updateComment.isPending}>Salvar</Button>
                        <Button size="sm" variant="outline" onClick={() => { setReplyId(null); setReplyText(""); }}>Cancelar</Button>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex gap-1 shrink-0">
                  <Button
                    variant="ghost" size="icon"
                    title={comment.approved ? "Ocultar" : "Aprovar"}
                    className={`h-8 w-8 ${comment.approved ? "text-muted-foreground hover:text-amber-600" : "text-muted-foreground hover:text-green-600"}`}
                    onClick={() => handleToggleApprove(comment.id, !!comment.approved)}
                  >
                    {comment.approved ? <XCircle size={16} /> : <CheckCircle size={16} />}
                  </Button>
                  <Button
                    variant="ghost" size="sm"
                    className="h-8 px-3 text-xs text-muted-foreground hover:text-primary"
                    onClick={() => { setReplyId(comment.id); setReplyText(comment.adminReply || ""); }}
                  >
                    Responder
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive" onClick={() => handleDelete(comment.id)}>
                    <Trash2 size={16} />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </AdminLayout>
  );
}
