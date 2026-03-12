import type { ProductCardProps } from "~/common/types";
import { useCartStore } from "~/store/cartStore";

export const ProductCard = ({ product }: ProductCardProps) => {
  const addToCart = useCartStore((state) => state.addToCart);
  return (
    <div className="group flex flex-col ">
      <div className="relative overflow-hidden aspect-square mb-3 rounded-lg bg-gray-100">
        <img
          src={product.image[0]}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <button
          onClick={(e) => {
            e.stopPropagation();
            addToCart(product, true);
          }}
          className="cursor-pointer absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-sm text-primary-dark py-2 rounded-md font-bold text-xs opacity-0 translate-y-4 transition-all group-hover:opacity-100 group-hover:translate-y-0"
        >
          QUICK ADD
        </button>
      </div>
      <div className="text-xs text-gray-400 uppercase tracking-widest mb-1">
        {product.category?.title}
      </div>
      <h3 className="text-sm font-bold text-gray-800 mb-1">{product.name}</h3>
      <div className="text-sm font-semibold text-primary-dark">
        RS. {product.base_price}
      </div>
    </div>
  );
};
