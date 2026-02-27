interface ProductCardProps {
  product: {
    id: number;
    name: string;
    category: string;
    price: number;
    image: string;
  };
  onAddToCart: (product: ProductCardProps["product"]) => void;
}

export const ProductCard = ({ product, onAddToCart }: ProductCardProps) => (
  <div className="group flex flex-col ">
    <div className="relative overflow-hidden aspect-square mb-3 rounded-lg bg-gray-100">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
      <button
        onClick={(e) => {
          e.stopPropagation();
          onAddToCart(product);
        }}
        className="cursor-pointer absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-sm text-[#1A243F] py-2 rounded-md font-bold text-xs opacity-0 translate-y-4 transition-all group-hover:opacity-100 group-hover:translate-y-0"
      >
        QUICK ADD
      </button>
    </div>
    <div className="text-xs text-gray-400 uppercase tracking-widest mb-1">
      {product.category}
    </div>
    <h3 className="text-sm font-bold text-gray-800 mb-1">{product.name}</h3>
    <div className="text-sm font-semibold text-[#1A243F]">
      RS. {product.price.toLocaleString()}
    </div>
  </div>
);
