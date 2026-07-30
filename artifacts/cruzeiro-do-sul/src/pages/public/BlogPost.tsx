import { PublicLayout } from "@/components/layout/PublicLayout";
import { useGetPostBySlug } from "@workspace/api-client-react";
import { useParams, Link } from "wouter";
import { Calendar, User, ArrowLeft } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export function BlogPost() {
  const { slug } = useParams();
  const { data: post, isLoading, error } = useGetPostBySlug(slug as string);

  if (isLoading) {
    return (
      <PublicLayout>
        <div className="min-h-[70vh] flex items-center justify-center">
          <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full"></div>
        </div>
      </PublicLayout>
    );
  }

  if (error || !post) {
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

  return (
    <PublicLayout>
      <article className="pb-24">
        {/* Header */}
        <header className="pt-24 pb-16 bg-muted px-4">
          <div className="container mx-auto max-w-4xl">
            <Link href="/blog" className="inline-flex items-center text-sm font-bold text-muted-foreground hover:text-primary mb-8 transition-colors">
              <ArrowLeft size={16} className="mr-2" /> Voltar para o Blog
            </Link>
            
            {post.category && (
              <div className="inline-block bg-accent text-primary px-3 py-1 rounded-full text-xs font-bold mb-6">
                {post.category}
              </div>
            )}
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-foreground leading-tight mb-6">
              {post.title}
            </h1>
            
            {post.subtitle && (
              <p className="text-xl md:text-2xl text-foreground/70 mb-8 font-serif italic">
                {post.subtitle}
              </p>
            )}
            
            <div className="flex items-center gap-6 text-sm text-foreground/60 border-t border-border/50 pt-6">
              <div className="flex items-center gap-2">
                <Calendar size={16} />
                <time>{format(new Date(post.createdAt), "dd 'de' MMMM, yyyy", { locale: ptBR })}</time>
              </div>
              {post.authorName && (
                <div className="flex items-center gap-2">
                  <User size={16} />
                  <span>Por <strong>{post.authorName}</strong></span>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Cover */}
        {post.coverUrl && (
          <div className="container mx-auto px-4 max-w-5xl -mt-10 mb-16 relative z-10">
            <img 
              src={post.coverUrl} 
              alt={post.title} 
              className="w-full aspect-[21/9] object-cover rounded-3xl shadow-xl"
            />
          </div>
        )}

        {/* Content */}
        <div className="container mx-auto px-4 max-w-3xl mt-16">
          <div 
            className="prose prose-lg prose-headings:font-serif prose-headings:text-foreground prose-a:text-primary max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content || '' }}
          />
          
          {post.tags && (
            <div className="mt-12 pt-8 border-t border-border flex gap-2 flex-wrap">
              {post.tags.split(',').map(tag => (
                <span key={tag.trim()} className="bg-muted text-muted-foreground px-3 py-1 rounded-full text-xs">
                  #{tag.trim()}
                </span>
              ))}
            </div>
          )}
        </div>
      </article>
    </PublicLayout>
  );
}
