import { Link } from "react-router";
import type { ProductCardProps } from "~/common/types";
import { useCartStore } from "~/store/cartStore";

export const ProductCard = ({ product }: ProductCardProps) => {
  const addToCart = useCartStore((state) => state.addToCart);
  return (
    <div className="group flex flex-col">
      <div className="relative mb-3 aspect-square overflow-hidden rounded-lg bg-gray-100">
        <Link
          to={`/product/${product.id}`}
          className="h-full w-full cursor-pointer"
        >
          <img
            src={product.image[0]}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        </Link>
        <button
          onClick={(e) => {
            e.stopPropagation();
            addToCart(product, true);
          }}
          className="text-primary-dark absolute right-4 bottom-4 left-4 translate-y-4 cursor-pointer rounded-md bg-white/90 py-2 text-xs font-bold opacity-0 backdrop-blur-sm transition-all group-hover:translate-y-0 group-hover:opacity-100"
        >
          QUICK ADD
        </button>
      </div>
      <div className="mb-1 text-xs tracking-widest text-gray-400 uppercase">
        {product.category?.title}
      </div>
      <h3 className="mb-1 text-sm font-bold text-gray-800">{product.name}</h3>
      <div className="text-primary-dark text-sm font-semibold">
        RS. {product.base_price}
      </div>
    </div>
  );
};
