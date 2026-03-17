import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ChevronRight, Star, Clock, Truck } from "lucide-react";
import PizzaCard from "@/components/PizzaCard";
import { usePizzas } from "@/hooks/usePizzas";

export default function Home() {
  const { data: pizzas, isLoading } = usePizzas();
  const featuredPizzas = pizzas?.slice(0, 3);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden hero-gradient">
        <div className="container relative z-10">
          <div className="max-w-2xl">
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
              Artisanal Pizza <br />
              <span className="text-primary">Perfectly Baked</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Experience the authentic taste of hand-tossed dough, premium mozzarella, 
              and our secret family sauce. Delivered fresh in 30 minutes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/menu">
                <Button size="lg" className="text-lg px-8" variant="premium">
                  Order Now <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/menu">
                <Button size="lg" variant="outline" className="text-lg px-8">
                  View Menu
                </Button>
              </Link>
            </div>
          </div>
        </div>
        
        {/* Decorative Image */}
        <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/4 hidden lg:block">
          <img 
            src="https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=1200" 
            alt="Delicious Pizza"
            className="rounded-full w-[800px] h-[800px] object-cover border-[20px] border-background shadow-2xl animate-spin-slow"
            style={{ animationDuration: '60s' }}
          />
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-secondary/10">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                <Star className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold">Premium Quality</h3>
              <p className="text-muted-foreground">We use only the finest imported ingredients and locally sourced produce.</p>
            </div>
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                <Clock className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold">Fast Delivery</h3>
              <p className="text-muted-foreground">Your pizza arrives hot and fresh within 30 minutes, or it's on us.</p>
            </div>
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                <Truck className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold">Free Shipping</h3>
              <p className="text-muted-foreground">No delivery fees on orders over $30. Straight from our oven to your door.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Menu */}
      <section className="py-20">
        <div className="container">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold mb-2">Popular Choices</h2>
              <p className="text-muted-foreground">Our customers' all-time favorites.</p>
            </div>
            <Link href="/menu">
              <Button variant="link" className="text-primary font-bold">
                View All Menu <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {isLoading ? (
              Array(3).fill(0).map((_, i) => (
                <div key={i} className="h-[400px] rounded-xl bg-muted animate-pulse" />
              ))
            ) : (
              featuredPizzas?.map((pizza) => (
                <PizzaCard key={pizza.id} pizza={pizza} />
              ))
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
