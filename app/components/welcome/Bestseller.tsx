import { Button } from "../ui/button";
import { ProductCard } from "./ProductCard";

const PRODUCTS = [
  {
    id: 1,
    name: "Caszel",
    category: "Dessert",
    price: 350,
    image:
      "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=400",
  },
  {
    id: 2,
    name: "Heart of hazelnut",
    category: "Cake Tubs",
    price: 429,
    image:
      "https://plus.unsplash.com/premium_photo-1713447395823-2e0b40b75a89?q=80&w=982&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?auto=format&fit=crop&q=80&w=400",
  },
  {
    id: 3,
    name: "Miss Matilda",
    category: "Cake Tubs",
    price: 499,
    image:
      "https://images.unsplash.com/photo-1621303837174-89787a7d4729?q=80&w=1336&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?auto=format&fit=crop&q=80&w=400",
  },
  {
    id: 4,
    name: "Brookies",
    category: "Dessert",
    price: 299,
    image:
      "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&q=80&w=400",
  },
];

export default function Bestseller({
  addToCart,
}: {
  addToCart: (product: any) => void;
}) {
  return (
    <div className=" py-32 px-4 md:px-8 flex flex-col items-center gap-12">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-primary-dark font-serif italic text-2xl md:text-3xl mb-2">
            Our
          </h2>
          <h3 className="text-primary-dark font-black text-3xl tracking-widest uppercase">
            Bestsellers
          </h3>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-10 md:gap-x-8 md:gap-y-12">
          {PRODUCTS.slice(0, 4).map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={addToCart}
            />
          ))}
        </div>
      </div>
      <Button>View More</Button>
    </div>
  );
}
