import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { Route, Switch, Router as WouterRouter } from 'wouter';
import { AuthProvider } from '@/contexts/AuthContext';
import { ProtectedRoute } from '@/components/ProtectedRoute';

// Public Pages
import { Home } from '@/pages/public/Home';
import { About } from '@/pages/public/About';
import { History } from '@/pages/public/History';
import { Apometria } from '@/pages/public/Apometria';
import { Courses } from '@/pages/public/Courses';
import { Library } from '@/pages/public/Library';
import { Blog } from '@/pages/public/Blog';
import { BlogPost } from '@/pages/public/BlogPost';
import { Gallery } from '@/pages/public/Gallery';
import { Attendance } from '@/pages/public/Attendance';
import { Faq } from '@/pages/public/Faq';
import { Contact } from '@/pages/public/Contact';

// Admin Pages
import { AdminLogin } from '@/pages/admin/Login';
import { Dashboard } from '@/pages/admin/Dashboard';
import { Posts } from '@/pages/admin/Posts';
import { Courses as AdminCourses } from '@/pages/admin/Courses';
import { Library as AdminLibrary } from '@/pages/admin/Library';
import { Gallery as AdminGallery } from '@/pages/admin/Gallery';
import { Timeline } from '@/pages/admin/Timeline';
import { Testimonials } from '@/pages/admin/Testimonials';
import { Comments } from '@/pages/admin/Comments';
import { Faq as AdminFaq } from '@/pages/admin/Faq';
import { Settings } from '@/pages/admin/Settings';

const queryClient = new QueryClient();

function AdminRoute({ component }: { component: React.ComponentType }) {
  return <ProtectedRoute component={component} />;
}

function Router() {
  return (
    <Switch>
      {/* Public Routes */}
      <Route path="/" component={Home} />
      <Route path="/quem-somos" component={About} />
      <Route path="/nossa-historia" component={History} />
      <Route path="/apometria" component={Apometria} />
      <Route path="/cursos" component={Courses} />
      <Route path="/biblioteca" component={Library} />
      <Route path="/blog" component={Blog} />
      <Route path="/blog/:slug" component={BlogPost} />
      <Route path="/galeria" component={Gallery} />
      <Route path="/atendimento" component={Attendance} />
      <Route path="/faq" component={Faq} />
      <Route path="/contato" component={Contact} />

      {/* Admin Login (unprotected) */}
      <Route path="/admin/login" component={AdminLogin} />

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
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
            <Router />
          </WouterRouter>
        </AuthProvider>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
