import { Icons } from "../icons";
import { Text } from "../ui/text";
import type { cartItem } from "~/common/types";
import { useCartStore } from "~/store/cartStore"; // Adjust path as needed

// No more props!
export const CartSidebar = () => {
  // Pull everything directly from global state
  const { cart, isCartOpen, setIsCartOpen, updateQuantity, removeFromCart } =
    useCartStore();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Use the global state flag instead of the old isOpen prop
  if (!isCartOpen) return null;

  const onClose = () => setIsCartOpen(false);

  return (
    <div className="fixed inset-0 z-100 flex justify-end">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-primary-dark/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Sidebar Drawer */}
      <div className="relative w-full max-w-md bg-[#F5F0E6] h-full flex flex-col shadow-2xl animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="p-6 border-b border-primary-dark/10 flex items-center justify-between bg-white">
          <Text
            as="h2"
            variant="primary"
            className="text-lg font-bold flex items-center gap-2 text-primary-dark tracking-widest uppercase"
          >
            Your Bag
            <span className="text-gray-400 text-sm font-normal">
              ({cart.length})
            </span>
          </Text>
          <Icons.X
            className="w-6 h-6 text-primary-dark cursor-pointer hover:text-gray-500 transition-colors"
            onClick={onClose}
          />
        </div>

        {/* Cart Items Area */}
        <div className="flex-1 overflow-y-auto p-6 bg-white">
          {cart.length === 0 ? (
            // Empty State
            <div className="h-full flex flex-col items-center justify-center text-gray-400 space-y-6 pt-20">
              <Icons.ShoppingBag className="w-16 h-16 opacity-20 text-primary-dark" />
              <Text
                as="p"
                variant="secondary"
                className="text-2xl text-primary-dark"
              >
                Your bag is empty
              </Text>
              <button
                onClick={onClose}
                className="text-primary-dark text-xs uppercase tracking-widest font-bold border-b border-primary-dark pb-1 hover:text-gray-500 hover:border-gray-500 transition-colors"
              >
                <Text as="span" variant="primary">
                  Start Shopping
                </Text>
              </button>
            </div>
          ) : (
            // Filled State
            <div className="space-y-6">
              {cart.map((item: cartItem) => (
                <div key={item.id} className="flex gap-4 group">
                  <div className="w-24 h-24 rounded-lg overflow-hidden border border-gray-100 shrink-0">
                    <img
                      src={item.image}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      alt={item.name}
                    />
                  </div>

                  <div className="flex-1 flex flex-col justify-center">
                    <div className="flex justify-between items-start mb-1">
                      <Text
                        as="h4"
                        variant="primary"
                        className="text-sm font-bold text-primary-dark pr-4"
                      >
                        {item.name}
                      </Text>
                      <Icons.Trash2
                        className="w-4 h-4 text-gray-300 cursor-pointer hover:text-red-500 transition-colors shrink-0 mt-0.5"
                        onClick={() => removeFromCart(item.id)} // Now uses global action
                      />
                    </div>

                    <Text
                      as="p"
                      variant="primary"
                      className="text-primary-dark/70 text-sm mb-4"
                    >
                      Rs. {item.price.toLocaleString()}
                    </Text>

                    {/* Quantity Selector */}
                    <div className="flex items-center border border-primary-dark/20 rounded-full w-max overflow-hidden">
                      <button
                        className="px-3 py-1 text-primary-dark hover:bg-[#F5F0E6] transition-colors"
                        onClick={() => updateQuantity(item.id, -1)} // Now uses global action
                      >
                        <Icons.Minus className="w-3 h-3" />
                      </button>
                      <Text
                        as="span"
                        variant="primary"
                        className="px-2 py-1 text-xs font-bold text-primary-dark w-6 text-center"
                      >
                        {item.quantity}
                      </Text>
                      <button
                        className="px-3 py-1 text-primary-dark hover:bg-[#F5F0E6] transition-colors"
                        onClick={() => updateQuantity(item.id, 1)}
                      >
                        <Icons.Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer / Checkout Section */}
        {cart.length > 0 && (
          <div className="p-6 border-t border-primary-dark/10 bg-[#F5F0E6]">
            <div className="flex justify-between mb-4 font-bold text-lg text-primary-dark">
              <Text as="span" variant="primary">
                Total
              </Text>
              <Text as="span" variant="primary">
                Rs. {total.toLocaleString()}
              </Text>
            </div>

            <Text
              as="p"
              variant="primary"
              className="text-[10px] text-primary-dark/60 mb-6 uppercase tracking-wider text-center"
            >
              Shipping & taxes calculated at checkout
            </Text>

            <button className="group w-full bg-primary-dark text-[#F5F0E6] py-4 rounded-full font-bold hover:bg-black transition-all duration-300 flex items-center justify-center gap-3 shadow-lg hover:-translate-y-1">
              <Text
                as="span"
                variant="primary"
                className="text-xs tracking-widest uppercase"
              >
                Checkout
              </Text>
              <Icons.ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
