import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { Route, Switch, Router as WouterRouter, Redirect } from 'wouter';
import { AuthProvider } from '@/contexts/AuthContext';
import { ProtectedRoute } from '@/components/ProtectedRoute';

import { Component, type ErrorInfo, type ReactNode, lazy, Suspense } from 'react';

// Eagerly loaded for instant First Contentful Paint
import { Home } from '@/pages/public/Home';

// Public Pages (Code-split para navegação modular e leve)
const Fraternidade = lazy(() => import('@/pages/public/Fraternidade').then(m => ({ default: m.Fraternidade })));
const History = lazy(() => import('@/pages/public/History').then(m => ({ default: m.History })));
const Apometria = lazy(() => import('@/pages/public/Apometria').then(m => ({ default: m.Apometria })));
const Courses = lazy(() => import('@/pages/public/Courses').then(m => ({ default: m.Courses })));
const Library = lazy(() => import('@/pages/public/Library').then(m => ({ default: m.Library })));
const Blog = lazy(() => import('@/pages/public/Blog').then(m => ({ default: m.Blog })));
const BlogPost = lazy(() => import('@/pages/public/BlogPost').then(m => ({ default: m.BlogPost })));
const Gallery = lazy(() => import('@/pages/public/Gallery').then(m => ({ default: m.Gallery })));
const Attendance = lazy(() => import('@/pages/public/Attendance').then(m => ({ default: m.Attendance })));
const Faq = lazy(() => import('@/pages/public/Faq').then(m => ({ default: m.Faq })));
const Contact = lazy(() => import('@/pages/public/Contact').then(m => ({ default: m.Contact })));
const PublicTestimonials = lazy(() => import('@/pages/public/Testimonials').then(m => ({ default: m.Testimonials })));

// Admin Pages (Code-split para isolar 100% da área administrativa)
const AdminLogin = lazy(() => import('@/pages/admin/Login').then(m => ({ default: m.AdminLogin })));
const Dashboard = lazy(() => import('@/pages/admin/Dashboard').then(m => ({ default: m.Dashboard })));
const Posts = lazy(() => import('@/pages/admin/Posts').then(m => ({ default: m.Posts })));
const AdminCourses = lazy(() => import('@/pages/admin/Courses').then(m => ({ default: m.Courses })));
const AdminLibrary = lazy(() => import('@/pages/admin/Library').then(m => ({ default: m.Library })));
const AdminGallery = lazy(() => import('@/pages/admin/Gallery').then(m => ({ default: m.Gallery })));
const Timeline = lazy(() => import('@/pages/admin/Timeline').then(m => ({ default: m.Timeline })));
const Testimonials = lazy(() => import('@/pages/admin/Testimonials').then(m => ({ default: m.Testimonials })));
const Comments = lazy(() => import('@/pages/admin/Comments').then(m => ({ default: m.Comments })));
const AdminFaq = lazy(() => import('@/pages/admin/Faq').then(m => ({ default: m.Faq })));
const Settings = lazy(() => import('@/pages/admin/Settings').then(m => ({ default: m.Settings })));

class ErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean; error: Error | null }> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6 text-center">
          <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
            <h1 className="text-2xl font-serif font-bold text-gray-900 mb-2">Fraternidade Cruzeiro do Sul</h1>
            <p className="text-gray-600 text-sm mb-6">Ocorreu uma instabilidade inesperada ao carregar a página.</p>
            <button
              onClick={() => { this.setState({ hasError: false, error: null }); window.location.href = '/'; }}
              className="bg-primary text-white font-medium px-6 py-2.5 rounded-full text-sm hover:opacity-90 transition"
            >
              Recarregar página
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function AdminRoute({ component: Component }: { component: React.ComponentType }) {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-muted/30">
          <div className="w-8 h-8 rounded-full border-4 border-primary border-t-transparent animate-spin" />
        </div>
      }
    >
      <ProtectedRoute component={Component} />
    </Suspense>
  );
}

function PageLoader() {
  return (
    <div className="min-h-[50vh] flex items-center justify-center">
      <div className="w-8 h-8 rounded-full border-4 border-primary border-t-transparent animate-spin" />
    </div>
  );
}

function Router() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Switch>
        {/* Public Routes */}
        <Route path="/" component={Home} />
        <Route path="/a-fraternidade" component={Fraternidade} />
        <Route path="/historia" component={History} />
        {/* Legacy redirects */}
        <Route path="/quem-somos">{() => <Redirect to="/a-fraternidade" replace />}</Route>
        <Route path="/nossa-historia">{() => <Redirect to="/historia" replace />}</Route>
        <Route path="/apometria" component={Apometria} />
        <Route path="/cursos" component={Courses} />
        <Route path="/depoimentos" component={PublicTestimonials} />
        <Route path="/biblioteca" component={Library} />
        <Route path="/blog" component={Blog} />
        <Route path="/blog/:slug" component={BlogPost} />
        <Route path="/galeria" component={Gallery} />
        <Route path="/atendimento" component={Attendance} />
        <Route path="/agendamentos" component={Attendance} />
        <Route path="/faq" component={Faq} />
        <Route path="/contato" component={Contact} />

        {/* Admin Login (unprotected, lazy) */}
        <Route path="/admin/login">{() => <AdminLogin />}</Route>

        {/* Admin Routes (protected) */}
        <Route path="/admin">{() => <AdminRoute component={Dashboard} />}</Route>
        <Route path="/admin/posts">{() => <AdminRoute component={Posts} />}</Route>
        <Route path="/admin/courses">{() => <AdminRoute component={AdminCourses} />}</Route>
        <Route path="/admin/library">{() => <AdminRoute component={AdminLibrary} />}</Route>
        <Route path="/admin/gallery">{() => <AdminRoute component={AdminGallery} />}</Route>
        <Route path="/admin/timeline">{() => <AdminRoute component={Timeline} />}</Route>
        <Route path="/admin/testimonials">{() => <AdminRoute component={Testimonials} />}</Route>
        <Route path="/admin/comments">{() => <AdminRoute component={Comments} />}</Route>
        <Route path="/admin/faq">{() => <AdminRoute component={AdminFaq} />}</Route>
        <Route path="/admin/settings">{() => <AdminRoute component={Settings} />}</Route>

        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

function App() {
  const routerBase = import.meta.env.BASE_URL?.replace(/\/$/, '') || undefined;
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <AuthProvider>
            <WouterRouter base={routerBase}>
              <Router />
            </WouterRouter>
          </AuthProvider>
          <Toaster />
        </TooltipProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
