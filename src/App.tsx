import { Route, Switch, useLocation } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Home from "@/pages/Home";
import Programs from "@/pages/Programs";
import ProgramDetail from "@/pages/ProgramDetail";
import Gallery from "@/pages/Gallery";
import Contact from "@/pages/Contact";
import Register from "@/pages/Register";
import Profile from "@/pages/Profile";
import { useEffect } from "react";
import Lenis from "lenis";

const queryClient = new QueryClient();

function ScrollToTop() {
  const [location] = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  return null;
}

export default function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // https://www.desmos.com/calculator/brs54l4xou
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen flex flex-col">
        <ScrollToTop />
        <Navbar />
        <main className="flex-grow">
          <Switch>
            <Route path="/" component={Home} />
            <Route path="/programs" component={Programs} />
            <Route path="/programs/:id" component={ProgramDetail} />
            <Route path="/gallery" component={Gallery} />
            <Route path="/contact" component={Contact} />
            <Route path="/register" component={Register} />
            <Route path="/profile/:id" component={Profile} />
            <Route>
              <div className="pt-40 text-center">
                <h1 className="text-4xl font-bold">404 - Page Not Found</h1>
                <p className="mt-4">The page you are looking for does not exist.</p>
              </div>
            </Route>
          </Switch>
        </main>
        <Footer />
      </div>
    </QueryClientProvider>
  );
}
