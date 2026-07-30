import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { Route, Switch, Router as WouterRouter } from 'wouter';

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
import { Dashboard } from '@/pages/admin/Dashboard';
import { Posts } from '@/pages/admin/Posts';
import { Settings } from '@/pages/admin/Settings';
import { Testimonials } from '@/pages/admin/Testimonials';

const queryClient = new QueryClient();

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
      
      {/* Admin Routes */}
      <Route path="/admin" component={Dashboard} />
      <Route path="/admin/posts" component={Posts} />
      <Route path="/admin/settings" component={Settings} />
      <Route path="/admin/testimonials" component={Testimonials} />
      
      {/* 
      Additional admin routes to be fully implemented:
      <Route path="/admin/courses" component={AdminCourses} />
      <Route path="/admin/library" component={AdminLibrary} />
      <Route path="/admin/gallery" component={AdminGallery} />
      <Route path="/admin/timeline" component={AdminTimeline} />
      <Route path="/admin/comments" component={AdminComments} />
      <Route path="/admin/faq" component={AdminFaq} />
      */}

      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
