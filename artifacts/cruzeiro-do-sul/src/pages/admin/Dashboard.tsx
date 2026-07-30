import { AdminLayout } from "@/components/layout/AdminLayout";
import { useGetDashboardStats } from "@workspace/api-client-react";
import { 
  FileText, BookOpen, ImageIcon, Library, MessageSquare, MessageCircle, AlertCircle 
} from "lucide-react";
import { Link } from "wouter";

export function Dashboard() {
  const { data: stats, isLoading } = useGetDashboardStats();

  if (isLoading || !stats) {
    return (
      <AdminLayout>
        <div className="animate-pulse space-y-6">
          <div className="h-10 bg-muted rounded w-1/4"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="h-32 bg-muted rounded-xl"></div>
            <div className="h-32 bg-muted rounded-xl"></div>
            <div className="h-32 bg-muted rounded-xl"></div>
          </div>
        </div>
      </AdminLayout>
    );
  }

  const statCards = [
    { label: "Posts no Blog", value: stats.totalPosts, icon: <FileText size={24} />, color: "text-blue-500", bg: "bg-blue-50", path: "/admin/posts" },
    { label: "Cursos", value: stats.totalCourses, icon: <BookOpen size={24} />, color: "text-green-500", bg: "bg-green-50", path: "/admin/courses" },
    { label: "Materiais", value: stats.totalLibraryItems, icon: <Library size={24} />, color: "text-purple-500", bg: "bg-purple-50", path: "/admin/library" },
    { label: "Álbuns", value: stats.totalAlbums, icon: <ImageIcon size={24} />, color: "text-orange-500", bg: "bg-orange-50", path: "/admin/gallery" },
  ];

  return (
    <AdminLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-serif font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-2">Visão geral do conteúdo do site.</p>
      </div>

      {(stats.pendingComments > 0 || stats.pendingTestimonials > 0) && (
        <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {stats.pendingComments > 0 && (
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 flex items-center justify-between">
              <div className="flex items-center gap-4 text-amber-800">
                <AlertCircle size={24} />
                <div>
                  <h3 className="font-bold">Comentários Pendentes</h3>
                  <p className="text-sm opacity-80">{stats.pendingComments} comentários aguardando moderação</p>
                </div>
              </div>
              <Link href="/admin/comments" className="bg-amber-600 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-amber-700 transition-colors">
                Revisar
              </Link>
            </div>
          )}
          
          {stats.pendingTestimonials > 0 && (
            <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-6 flex items-center justify-between">
              <div className="flex items-center gap-4 text-indigo-800">
                <AlertCircle size={24} />
                <div>
                  <h3 className="font-bold">Depoimentos Pendentes</h3>
                  <p className="text-sm opacity-80">{stats.pendingTestimonials} depoimentos aguardando aprovação</p>
                </div>
              </div>
              <Link href="/admin/testimonials" className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-indigo-700 transition-colors">
                Revisar
              </Link>
            </div>
          )}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card, i) => (
          <Link key={i} href={card.path} className="block">
            <div className="bg-white border border-border p-6 rounded-xl shadow-sm hover-elevate transition-all h-full">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${card.bg} ${card.color}`}>
                  {card.icon}
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{card.label}</p>
                  <p className="text-2xl font-bold">{card.value}</p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </AdminLayout>
  );
}
