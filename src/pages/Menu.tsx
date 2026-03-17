import { useState } from "react";
import { usePizzas } from "@/hooks/usePizzas";
import PizzaCard from "@/components/PizzaCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export default function Menu() {
  const { data: pizzas, isLoading } = usePizzas();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");

  const categories = ["all", "classic", "vegetarian", "spicy", "premium"];

  const filteredPizzas = pizzas?.filter((pizza) => {
    const matchesSearch = pizza.name.toLowerCase().includes(search.toLowerCase()) ||
                         pizza.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === "all" || pizza.category === category;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="container py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
        <div>
          <h1 className="text-4xl font-bold mb-2">Our Menu</h1>
          <p className="text-muted-foreground">Choose from our wide variety of artisanal pizzas.</p>
        </div>

        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search pizzas..."
            className="pl-10"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-12">
        {categories.map((cat) => (
          <Button
            key={cat}
            variant={category === cat ? "default" : "outline"}
            onClick={() => setCategory(cat)}
            className="capitalize"
          >
            {cat}
          </Button>
        ))}
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {Array(8).fill(0).map((_, i) => (
            <div key={i} className="h-[350px] rounded-xl bg-muted animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredPizzas?.map((pizza) => (
            <PizzaCard key={pizza.id} pizza={pizza} />
          ))}
        </div>
      )}

      {!isLoading && filteredPizzas?.length === 0 && (
        <div className="text-center py-20">
          <h3 className="text-xl font-semibold mb-2">No pizzas found</h3>
          <p className="text-muted-foreground">Try adjusting your search or category filter.</p>
        </div>
      )}
    </div>
  );
}
