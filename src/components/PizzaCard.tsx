import { Pizza } from "@/types";
import { Card, CardContent, CardFooter } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { formatCurrency } from "@/lib/utils";
import { useCart } from "@/hooks/useCart";
import { Leaf, Flame, Plus } from "lucide-react";
import { useToast } from "./ui/use-toast";

interface PizzaCardProps {
  pizza: Pizza;
}

export default function PizzaCard({ pizza }: PizzaCardProps) {
  const { addToCart } = useCart();
  const { toast } = useToast();

  const handleAddToCart = () => {
    addToCart(pizza);
    toast({
      title: "Added to cart",
      description: `${pizza.name} has been added to your cart.`,
    });
  };

  return (
    <Card className="overflow-hidden group transition-all duration-300 hover:shadow-xl border-none bg-secondary/30">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={pizza.image_url}
          alt={pizza.name}
          className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute top-2 right-2 flex gap-2">
          {pizza.is_vegetarian && (
            <Badge variant="success" className="gap-1">
              <Leaf className="h-3 w-3" /> Veg
            </Badge>
          )}
          {pizza.is_spicy && (
            <Badge variant="destructive" className="gap-1">
              <Flame className="h-3 w-3" /> Spicy
            </Badge>
          )}
        </div>
      </div>
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-lg">{pizza.name}</h3>
          <span className="font-bold text-primary">{formatCurrency(pizza.price)}</span>
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2 min-h-[40px]">
          {pizza.description}
        </p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button 
          onClick={handleAddToCart} 
          className="w-full gap-2"
          variant="secondary"
        >
          <Plus className="h-4 w-4" /> Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}
