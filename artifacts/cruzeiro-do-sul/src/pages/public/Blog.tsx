import { PublicLayout } from "@/components/layout/PublicLayout";
import { useListPosts } from "@workspace/api-client-react";
import { Calendar, User, ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export function Blog() {
  const { data: posts, isLoading } = useListPosts({ status: "published" });

  return (
    <PublicLayout>
      <section className="bg-muted pt-20 pb-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground">
              Mensagens e Reflexões
            </h1>
            <p className="text-xl text-foreground/80 leading-relaxed">
              Artigos, mensagens edificantes e estudos para alimentar o seu espírito.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white min-h-[50vh]">
        <div className="container mx-auto px-4 md:px-6">
          {isLoading ? (
            <div className="flex justify-center py-20">
              <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full"></div>
            </div>
          ) : !posts || posts.length === 0 ? (
            <div className="text-center py-20 bg-muted/50 rounded-3xl border border-border">
              <h3 className="text-xl font-serif font-bold mb-2">Nenhum artigo encontrado</h3>
              <p className="text-muted-foreground">Em breve teremos novos conteúdos.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {posts.map((post) => (
                <Link key={post.id} href={`/blog/${post.slug}`} className="group flex flex-col bg-white rounded-3xl overflow-hidden hover-elevate transition-all">
                  <div className="aspect-[4/3] bg-muted relative overflow-hidden rounded-3xl">
                    {post.coverUrl ? (
                      <img 
                        src={post.coverUrl} 
                        alt={post.title} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full bg-accent flex items-center justify-center text-primary font-serif text-4xl font-bold opacity-20">
                        FCS
                      </div>
                    )}
                    {post.category && (
                      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-primary">
                        {post.category}
                      </div>
                    )}
                  </div>
                  
                  <div className="pt-6 pb-4 flex-1 flex flex-col">
                    <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                      <div className="flex items-center gap-1.5">
                        <Calendar size={14} />
                        <time>{format(new Date(post.createdAt), "dd 'de' MMMM, yyyy", { locale: ptBR })}</time>
                      </div>
                      {post.authorName && (
                        <div className="flex items-center gap-1.5">
                          <User size={14} />
                          <span>{post.authorName}</span>
                        </div>
                      )}
                    </div>
                    
                    <h2 className="text-2xl font-serif font-bold mb-3 group-hover:text-primary transition-colors leading-tight">
                      {post.title}
                    </h2>
                    
                    {post.subtitle && (
                      <p className="text-foreground/70 mb-6 flex-1 line-clamp-2 leading-relaxed">
                        {post.subtitle}
                      </p>
                    )}
                    
                    <div className="mt-auto flex items-center text-primary font-bold text-sm">
                      Ler artigo completo <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </PublicLayout>
  );
}
