import { PublicLayout } from "@/components/layout/PublicLayout";
import { useListPosts } from "@workspace/api-client-react";
import { Calendar, User, ArrowRight, BookOpen } from "lucide-react";
import { Link } from "wouter";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { DEFAULT_POSTS } from "@/data/defaultPosts";
import { useSeo } from "@/hooks/useSeo";

export function Blog() {
  useSeo({
    title: "Blog — Mensagens e Reflexões",
    description: "Artigos, mensagens edificantes e estudos bioenergéticos sobre Apometria para alimentar o seu espírito.",
    canonicalPath: "/blog",
  });

  const { data: posts, isLoading } = useListPosts({ status: "published" });

  const postsToDisplay = (Array.isArray(posts) && posts.length > 0) ? posts : DEFAULT_POSTS;

  return (
    <PublicLayout>
      <section className="bg-muted pt-14 pb-12 md:pt-20 md:pb-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center space-y-4 md:space-y-6">
            <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center mx-auto shadow-sm text-primary mb-3">
              <BookOpen size={28} />
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-semibold tracking-tight text-foreground">
              Mensagens e Reflexões
            </h1>
            <p className="text-base sm:text-lg md:text-xl font-serif font-medium text-foreground/85 leading-relaxed">
              Artigos, mensagens edificantes e estudos bioenergéticos para alimentar o seu espírito.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-20 bg-white min-h-[50vh]">
        <div className="container mx-auto px-4 md:px-6">
          {isLoading ? (
            <div className="flex justify-center py-20">
              <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full"></div>
            </div>
          ) : postsToDisplay.length === 0 ? (
            <div className="text-center py-16 bg-muted/50 rounded-sm border border-border">
              <h3 className="text-xl font-serif font-medium mb-2">Nenhum artigo encontrado</h3>
              <p className="text-muted-foreground font-sans">Em breve teremos novos conteúdos.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {postsToDisplay.map((post) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="group flex flex-col bg-card rounded-sm border border-border shadow-sm hover:shadow-md transition-all active:scale-[0.99] overflow-hidden"
                >
                  <div className="aspect-[16/9] sm:aspect-[4/3] bg-muted relative overflow-hidden">
                    {post.coverUrl ? (
                      <img
                        src={post.coverUrl}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full bg-accent flex items-center justify-center text-primary font-serif text-4xl font-semibold opacity-20">
                        FCS
                      </div>
                    )}
                    {post.category && (
                      <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full text-xs font-sans font-semibold text-primary">
                        {post.category}
                      </div>
                    )}
                  </div>

                  <div className="pt-5 pb-4 px-1 flex-1 flex flex-col">
                    <div className="flex items-center flex-wrap gap-3 text-xs text-muted-foreground mb-3 font-sans">
                      <div className="flex items-center gap-1.5">
                        <Calendar size={13} />
                        <time>{format(new Date(post.createdAt), "dd 'de' MMMM, yyyy", { locale: ptBR })}</time>
                      </div>
                      {post.authorName && (
                        <div className="flex items-center gap-1.5">
                          <User size={13} />
                          <span>{post.authorName}</span>
                        </div>
                      )}
                    </div>

                    <h2 className="text-xl md:text-2xl font-serif font-semibold tracking-tight mb-2 group-hover:text-primary transition-colors leading-tight">
                      {post.title}
                    </h2>

                    {post.subtitle && (
                      <p className="text-foreground/75 mb-5 flex-1 line-clamp-2 leading-relaxed text-sm md:text-base font-sans font-normal">
                        {post.subtitle}
                      </p>
                    )}

                    <div className="mt-auto flex items-center text-primary font-sans font-semibold text-sm">
                      Ler artigo completo{" "}
                      <ArrowRight size={15} className="ml-2 group-hover:translate-x-1 transition-transform" />
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
