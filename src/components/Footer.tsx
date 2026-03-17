import { Link } from "wouter";

export default function Footer() {
  return (
    <footer className="border-t bg-secondary/20">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="text-2xl font-bold text-primary tracking-tighter">
              NOVA PIZZA
            </Link>
            <p className="mt-4 text-muted-foreground max-w-xs">
              Crafting the finest artisanal pizzas with fresh, locally sourced ingredients. 
              Delivered hot and fresh to your doorstep.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/menu" className="hover:text-primary">Menu</Link></li>
              <li><Link href="/orders" className="hover:text-primary">My Orders</Link></li>
              <li><Link href="/auth" className="hover:text-primary">Account</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Contact</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>123 Pizza Street</li>
              <li>Dough City, PC 12345</li>
              <li>(555) 123-4567</li>
              <li>hello@novapizza.com</li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Nova Pizza. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
