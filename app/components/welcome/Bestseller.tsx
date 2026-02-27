import { ProductCard } from "./ProductCard";

const PRODUCTS = [
  {
    id: 1,
    name: "Chocolate Mud Pie",
    category: "Strawberry Menu",
    price: 1700,
    image:
      "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=400",
  },
  {
    id: 2,
    name: "Small Strawberry Box",
    category: "Strawberry Menu",
    price: 1150,
    image:
      "https://plus.unsplash.com/premium_photo-1713447395823-2e0b40b75a89?q=80&w=982&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?auto=format&fit=crop&q=80&w=400",
  },
  {
    id: 3,
    name: "Small Brownie Box",
    category: "Strawberry Menu",
    price: 1289,
    image:
      "https://images.unsplash.com/photo-1621303837174-89787a7d4729?q=80&w=1336&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?auto=format&fit=crop&q=80&w=400",
  },
  {
    id: 4,
    name: "Brownie Box",
    category: "Strawberry Menu",
    price: 1999,
    image:
      "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&q=80&w=400",
  },
  {
    id: 5,
    name: "Nutella + Puddle",
    category: "Strawberry Menu",
    price: 1050,
    image:
      "https://images.unsplash.com/photo-1579372781878-662497650396?auto=format&fit=crop&q=80&w=400",
  },
  {
    id: 6,
    name: "Dubai Surprise",
    category: "Strawberry Menu",
    price: 1850,
    image:
      "https://images.unsplash.com/photo-1511018556340-d16986a1c194?auto=format&fit=crop&q=80&w=400",
  },
  {
    id: 7,
    name: "Only Strawberry Box",
    category: "Strawberry Menu",
    price: 1950,
    image:
      "https://images.unsplash.com/photo-1464960726309-198270f274a4?auto=format&fit=crop&q=80&w=400",
  },
  {
    id: 8,
    name: "Cereal Box",
    category: "Strawberry Menu",
    price: 1950,
    image:
      "https://images.unsplash.com/photo-1519340241574-2dec39624824?auto=format&fit=crop&q=80&w=400",
  },
];

export default function Bestseller({ addToCart }) {
  return (
    <div className="bg-white py-24 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-[#1A243F] font-serif italic text-2xl md:text-3xl mb-2">
            Our
          </h2>
          <h3 className="text-[#1A243F] font-black text-3xl tracking-widest uppercase">
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
    </div>
  );
}
