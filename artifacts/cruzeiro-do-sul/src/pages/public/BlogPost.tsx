import { PublicLayout } from "@/components/layout/PublicLayout";
import { useGetPostBySlug, useListComments, useCreateComment } from "@workspace/api-client-react";
import { useParams, Link } from "wouter";
import { Calendar, User, ArrowLeft, MessageCircle, Send, CheckCircle } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useState } from "react";

import { DEFAULT_POSTS } from "@/data/defaultPosts";
import { useSeo } from "@/hooks/useSeo";

export function BlogPost() {
  const { slug } = useParams();
  const { data: post, isLoading, error } = useGetPostBySlug(slug as string);

  const fallbackPost = DEFAULT_POSTS.find((p) => p.slug === slug);
  const activePost = post || fallbackPost;

  useSeo({
    title: activePost ? activePost.title : "Artigo",
    description: activePost ? activePost.subtitle || activePost.title : undefined,
    canonicalPath: slug ? `/blog/${slug}` : "/blog",
  });

  if (isLoading && !activePost) {
    return (
      <PublicLayout>
        <div className="min-h-[70vh] flex items-center justify-center">
          <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full"></div>
        </div>
      </PublicLayout>
    );
  }

  if (!activePost) {
    return (
      <PublicLayout>
        <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-3xl font-serif font-bold mb-4">Artigo não encontrado</h1>
          <p className="text-muted-foreground mb-8">O conteúdo que você está procurando não existe ou foi removido.</p>
          <Link href="/blog" className="text-primary font-bold hover:underline">Voltar para o Blog</Link>
        </div>
      </PublicLayout>
    );
  }

  const postData = activePost;

  return (
    <PublicLayout>
      <article className="pb-24">
        {/* Header */}
        <header className="pt-16 pb-12 sm:pt-20 sm:pb-16 bg-muted px-4">
          <div className="container mx-auto max-w-4xl">
            <Link href="/blog" className="inline-flex items-center text-sm font-sans font-semibold text-muted-foreground hover:text-primary mb-8 transition-colors">
              <ArrowLeft size={16} className="mr-2" /> Voltar para o Blog
            </Link>
            
            {postData.category && (
              <div className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-sm text-xs font-sans font-semibold uppercase tracking-wider mb-6">
                {postData.category}
              </div>
            )}
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-semibold tracking-tight text-foreground leading-tight mb-6">
              {postData.title}
            </h1>
            
            {postData.subtitle && (
              <p className="text-lg sm:text-xl md:text-2xl text-foreground/75 mb-8 font-serif italic font-medium leading-relaxed">
                {postData.subtitle}
              </p>
            )}
            
            <div className="flex items-center gap-6 text-sm text-foreground/60 border-t border-border/50 pt-6 font-sans">
              <div className="flex items-center gap-2">
                <Calendar size={16} />
                <time>{format(new Date(postData.createdAt), "dd 'de' MMMM, yyyy", { locale: ptBR })}</time>
              </div>
              {postData.authorName && (
                <div className="flex items-center gap-2">
                  <User size={16} />
                  <span>Por <strong className="font-semibold text-foreground/80">{postData.authorName}</strong></span>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Cover */}
        {postData.coverUrl && (
          <div className="container mx-auto px-4 max-w-5xl -mt-10 mb-16 relative z-10">
            <img 
              src={postData.coverUrl} 
              alt={postData.title} 
              className="w-full aspect-[21/9] object-cover rounded-sm border border-border shadow-md"
            />
          </div>
        )}

        {/* Content */}
        <div className="container mx-auto px-4 max-w-3xl mt-16 font-sans">
          <div 
            className="prose prose-lg prose-headings:font-serif prose-headings:font-semibold prose-headings:tracking-tight prose-headings:text-foreground prose-p:font-sans prose-p:font-normal prose-a:text-primary max-w-none text-foreground/85 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: postData.content || '' }}
          />
          
          {postData.tags && (
            <div className="mt-12 pt-8 border-t border-border flex gap-2 flex-wrap font-sans">
              {postData.tags.split(',').map(tag => (
                <span key={tag.trim()} className="bg-muted text-muted-foreground px-3 py-1 rounded-sm text-xs font-medium">
                  #{tag.trim()}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Comments Section */}
        <CommentsSection postId={postData.id} />
      </article>
    </PublicLayout>
  );
}

// ─── Comments Section ──────────────────────────────────────────────────────────

function CommentsSection({ postId }: { postId: number }) {
  const { data: comments, refetch } = useListComments({ postId, postType: "blog", approved: true });
  const { mutateAsync: createComment, isPending } = useCreateComment();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", content: "" });
  const [formError, setFormError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setFormError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.content.trim()) {
      setFormError("Preencha todos os campos obrigatórios.");
      return;
    }
    try {
      await createComment({ data: { postId, postType: "blog", ...form } });
      setSubmitted(true);
      setForm({ name: "", email: "", content: "" });
      refetch();
    } catch {
      setFormError("Erro ao enviar comentário. Tente novamente.");
    }
  };

  return (
    <section className="container mx-auto px-4 max-w-3xl mt-20 font-sans">
      <div className="border-t border-border pt-12">
        <h2 className="text-2xl font-serif font-semibold tracking-tight text-foreground mb-2 flex items-center gap-3">
          <MessageCircle className="w-6 h-6 text-primary" />
          Comentários
        </h2>
        <p className="text-sm text-muted-foreground mb-10">
          Compartilhe sua reflexão. Os comentários são revisados antes de serem publicados.
        </p>

        {/* Approved comments list */}
        {Array.isArray(comments) && comments.length > 0 ? (
          <div className="space-y-6 mb-14">
            {comments.map((comment) => (
              <div key={comment.id} className="bg-muted rounded-2xl p-6">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-primary/10 rounded-full flex items-center justify-center font-bold text-primary text-sm font-sans">
                      {comment.name.charAt(0).toUpperCase()}
                    </div>
                    <span className="font-semibold text-foreground font-sans">{comment.name}</span>
                  </div>
                  <time className="text-xs text-muted-foreground">
                    {format(new Date(comment.createdAt), "dd/MM/yyyy", { locale: ptBR })}
                  </time>
                </div>
                <p className="text-foreground/80 leading-relaxed text-sm font-sans font-normal">{comment.content}</p>
                {comment.adminReply && (
                  <div className="mt-4 pl-4 border-l-2 border-primary/30">
                    <p className="text-xs font-semibold text-primary mb-1">Resposta da Fraternidade</p>
                    <p className="text-foreground/70 text-sm leading-relaxed font-sans">{comment.adminReply}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-10 text-muted-foreground text-sm mb-14 font-sans">
            Nenhum comentário ainda. Seja o primeiro a compartilhar sua reflexão!
          </div>
        )}

        {/* Submit form */}
        {submitted ? (
          <div className="bg-accent/40 border border-primary/20 rounded-2xl p-8 text-center font-sans">
            <CheckCircle className="w-10 h-10 text-primary mx-auto mb-4" />
            <h3 className="font-serif font-semibold text-lg text-foreground mb-2">Comentário enviado!</h3>
            <p className="text-sm text-muted-foreground">
              Obrigado pela sua mensagem. Ela será publicada após revisão da nossa equipe.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="mt-6 text-sm text-primary font-semibold hover:underline"
            >
              Enviar outro comentário
            </button>
          </div>
        ) : (
          <div className="bg-muted/50 border border-border rounded-2xl p-8 font-sans">
            <h3 className="font-serif font-semibold text-xl text-foreground mb-6">Deixe seu comentário</h3>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="comment-name" className="block text-sm font-medium text-foreground mb-2">
                    Nome <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="comment-name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Seu nome"
                    className="w-full border border-border rounded-xl px-4 py-3 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition font-sans"
                  />
                </div>
                <div>
                  <label htmlFor="comment-email" className="block text-sm font-medium text-foreground mb-2">
                    E-mail <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="comment-email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="seu@email.com"
                    className="w-full border border-border rounded-xl px-4 py-3 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition font-sans"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="comment-content" className="block text-sm font-medium text-foreground mb-2">
                  Comentário <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="comment-content"
                  name="content"
                  value={form.content}
                  onChange={handleChange}
                  placeholder="Compartilhe sua reflexão sobre este artigo..."
                  rows={5}
                  className="w-full border border-border rounded-xl px-4 py-3 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition resize-none font-sans"
                />
              </div>
              {formError && (
                <p className="text-sm text-red-500">{formError}</p>
              )}
              <p className="text-xs text-muted-foreground font-sans">
                * O e-mail não será publicado. Os comentários passam por moderação antes de aparecer.
              </p>
              <button
                type="submit"
                disabled={isPending}
                className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white font-semibold px-6 py-3 rounded-xl text-sm transition disabled:opacity-60 font-sans"
              >
                <Send size={16} />
                {isPending ? "Enviando…" : "Enviar comentário"}
              </button>
            </form>
          </div>
        )}
      </div>
    </section>
  );
}
