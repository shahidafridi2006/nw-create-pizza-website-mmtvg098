import { Switch, Route } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Home from "@/pages/Home";
import Menu from "@/pages/Menu";
import Auth from "@/pages/Auth";
import Checkout from "@/pages/Checkout";
import Orders from "@/pages/Orders";
import { useAuth } from "@/hooks/useAuth";

function App() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navbar />
      <main className="flex-grow">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/menu" component={Menu} />
          <Route path="/auth" component={Auth} />
          <Route path="/checkout" component={Checkout} />
          <Route path="/orders" component={Orders} />
          <Route>404 Page Not Found</Route>
        </Switch>
      </main>
      <Footer />
      <Toaster />
    </div>
  );
}

export default App;
