import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/hooks/useAuth";
import { Order, OrderItem } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils";
import { Package, Clock, CheckCircle2, Truck } from "lucide-react";
import { useLocation } from "wouter";

export default function Orders() {
  const { user } = useAuth();
  const [, setLocation] = useLocation();

  if (!user) {
    setLocation("/auth");
    return null;
  }

  const { data: orders, isLoading } = useQuery({
    queryKey: ['orders', user.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('orders')
        .select(`
          *,
          order_items (
            *,
            pizza:pizzas (*)
          )
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as (Order & { order_items: (OrderItem & { pizza: any })[] })[];
    },
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="h-4 w-4" />;
      case 'preparing': return <Package className="h-4 w-4" />;
      case 'out_for_delivery': return <Truck className="h-4 w-4" />;
      case 'delivered': return <CheckCircle2 className="h-4 w-4" />;
      default: return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'secondary';
      case 'preparing': return 'default';
      case 'out_for_delivery': return 'default';
      case 'delivered': return 'success';
      default: return 'secondary';
    }
  };

  return (
    <div className="container py-12">
      <h1 className="text-3xl font-bold mb-8">My Orders</h1>

      {isLoading ? (
        <div className="space-y-4">
          {Array(3).fill(0).map((_, i) => (
            <div key={i} className="h-40 rounded-xl bg-muted animate-pulse" />
          ))}
        </div>
      ) : orders?.length === 0 ? (
        <div className="text-center py-20">
          <h3 className="text-xl font-semibold mb-2">No orders yet</h3>
          <p className="text-muted-foreground">Your order history will appear here once you place an order.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {orders?.map((order) => (
            <Card key={order.id}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div className="space-y-1">
                  <CardTitle className="text-sm font-medium">
                    Order #{order.id.slice(0, 8)}
                  </CardTitle>
                  <p className="text-xs text-muted-foreground">
                    {new Date(order.created_at).toLocaleDateString()} at {new Date(order.created_at).toLocaleTimeString()}
                  </p>
                </div>
                <Badge variant={getStatusColor(order.status) as any} className="gap-1 capitalize">
                  {getStatusIcon(order.status)}
                  {order.status.replace(/_/g, ' ')}
                </Badge>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-sm">
                    {order.order_items.map((item) => (
                      <div key={item.id} className="flex justify-between py-1">
                        <span>{item.pizza?.name} x{item.quantity}</span>
                        <span>{formatCurrency(item.price_at_time * item.quantity)}</span>
                      </div>
                    ))}
                  </div>
                  <div className="border-t pt-4 flex justify-between font-bold">
                    <span>Total</span>
                    <span>{formatCurrency(order.total_amount)}</span>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    <p>Delivering to: {order.delivery_address}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
