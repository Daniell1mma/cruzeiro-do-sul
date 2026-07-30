import { Link, useLocation } from "wouter";
import { 
  LayoutDashboard, 
  FileText, 
  BookOpen, 
  Image as ImageIcon, 
  Library as LibraryIcon, 
  Settings, 
  MessageSquare, 
  MessageCircle,
  HelpCircle,
  Clock,
  LogOut
} from "lucide-react";

export function AdminSidebar() {
  const [location] = useLocation();

  const links = [
    { name: "Dashboard", path: "/admin", icon: <LayoutDashboard size={20} /> },
    { name: "Blog Posts", path: "/admin/posts", icon: <FileText size={20} /> },
    { name: "Cursos", path: "/admin/courses", icon: <BookOpen size={20} /> },
    { name: "Biblioteca", path: "/admin/library", icon: <LibraryIcon size={20} /> },
    { name: "Galeria", path: "/admin/gallery", icon: <ImageIcon size={20} /> },
    { name: "Nossa História", path: "/admin/timeline", icon: <Clock size={20} /> },
    { name: "Depoimentos", path: "/admin/testimonials", icon: <MessageSquare size={20} /> },
    { name: "Comentários", path: "/admin/comments", icon: <MessageCircle size={20} /> },
    { name: "FAQ", path: "/admin/faq", icon: <HelpCircle size={20} /> },
    { name: "Configurações", path: "/admin/settings", icon: <Settings size={20} /> },
  ];

  return (
    <aside className="w-64 bg-sidebar border-r border-sidebar-border min-h-screen flex flex-col sticky top-0 h-screen overflow-y-auto">
      <div className="p-6">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-serif font-bold text-xl">
            F
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-sidebar-foreground leading-none">Admin Panel</span>
            <span className="text-xs text-sidebar-foreground/60">Cruzeiro do Sul</span>
          </div>
        </div>

        <nav className="space-y-1">
          {links.map((link) => {
            const isActive = location === link.path;
            return (
              <Link
                key={link.path}
                href={link.path}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive 
                    ? "bg-sidebar-accent text-sidebar-accent-foreground" 
                    : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
                }`}
              >
                {link.icon}
                {link.name}
              </Link>
            )
          })}
        </nav>
      </div>

      <div className="mt-auto p-6 border-t border-sidebar-border">
        <Link 
          href="/" 
          className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-sidebar-foreground/70 hover:text-sidebar-foreground"
        >
          <LogOut size={20} />
          Voltar ao Site
        </Link>
      </div>
    </aside>
  );
}
