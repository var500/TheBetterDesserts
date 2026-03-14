import { useNavigate } from "react-router";
import { Icons } from "../icons";
import { Text } from "../ui/text";
import type { CartItem } from "~/common/types";
import { useCartStore } from "~/store/cartStore"; // Adjust path as needed
import { Button } from "../ui/button";

// No more props!
export const CartSidebar = () => {
  // Pull everything directly from global state
  const navigate = useNavigate();
  const { cart, isCartOpen, setIsCartOpen, updateQuantity, removeFromCart } =
    useCartStore();

  const total = cart.reduce(
    (sum, item) => sum + item.base_price * item.quantity,
    0,
  );

  // Use the global state flag instead of the old isOpen prop
  if (!isCartOpen) return null;

  const onClose = () => setIsCartOpen(false);

  const handleShopNow = () => {
    onClose();
    navigate("/collection");
  };

  const handleCheckout = () => {
    onClose();
    navigate("/checkout");
  };

  return (
    <div className="fixed inset-0 z-100 flex justify-end">
      {/* Backdrop */}
      <div
        className="bg-primary-dark/40 absolute inset-0 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Sidebar Drawer */}
      <div className="animate-in slide-in-from-right relative flex h-full w-full max-w-md flex-col bg-[#F5F0E6] shadow-2xl duration-300">
        {/* Header */}
        <div className="border-primary-dark/10 flex items-center justify-between border-b bg-white p-6">
          <Text
            as="h2"
            variant="primary"
            className="text-primary-dark flex items-center gap-2 text-lg font-bold tracking-widest uppercase"
          >
            Your Bag
            <span className="text-sm font-normal text-gray-400">
              ({cart.length})
            </span>
          </Text>
          <Icons.X
            className="text-primary-dark h-6 w-6 cursor-pointer transition-colors hover:text-gray-500"
            onClick={onClose}
          />
        </div>

        {/* Cart Items Area */}
        <div className="flex-1 overflow-y-auto bg-white p-6">
          {cart.length === 0 ? (
            // Empty State
            <div className="flex h-full flex-col items-center justify-center space-y-6 pt-20 text-gray-400">
              <Icons.ShoppingBag className="text-primary-dark h-16 w-16 opacity-20" />
              <Text
                as="p"
                variant="secondary"
                className="text-primary-dark text-2xl"
              >
                Your bag is empty
              </Text>
              <button
                onClick={handleShopNow}
                className="text-primary-dark border-primary-dark cursor-pointer border-b pb-1 text-xs font-bold tracking-widest uppercase transition-colors hover:border-gray-500 hover:text-gray-500"
              >
                <Text as="span" variant="primary">
                  Start Shopping
                </Text>
              </button>
            </div>
          ) : (
            // Filled State
            <div className="space-y-6">
              {cart.map((item: CartItem) => (
                <div key={item.id} className="group flex gap-4">
                  <div className="h-24 w-24 shrink-0 overflow-hidden rounded-lg border border-gray-100">
                    <img
                      src={item.image[0]}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      alt={item.name}
                    />
                  </div>

                  <div className="flex flex-1 flex-col justify-center">
                    <div className="mb-1 flex items-start justify-between">
                      <Text
                        as="h4"
                        variant="primary"
                        className="text-primary-dark pr-4 text-sm font-bold"
                      >
                        {item.name}
                      </Text>
                      <Icons.Trash2
                        className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer text-gray-300 transition-colors hover:text-red-500"
                        onClick={() => removeFromCart(item.id)} // Now uses global action
                      />
                    </div>

                    <Text
                      as="p"
                      variant="primary"
                      className="text-primary-dark/70 mb-4 text-sm"
                    >
                      Rs. {item.base_price.toLocaleString()}
                    </Text>

                    <div className="border-primary-dark/20 flex w-max items-center overflow-hidden rounded-full border">
                      <button
                        className="text-primary-dark px-3 py-1 transition-colors hover:bg-[#F5F0E6]"
                        onClick={() => updateQuantity(item.id, -1)}
                      >
                        <Icons.Minus className="h-3 w-3" />
                      </button>
                      <Text
                        as="span"
                        variant="primary"
                        className="text-primary-dark w-6 px-2 py-1 text-center text-xs font-bold"
                      >
                        {item.quantity}
                      </Text>

                      <button
                        className="text-primary-dark px-3 py-1 transition-colors hover:bg-[#F5F0E6] disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-transparent"
                        onClick={() => updateQuantity(item.id, 1)}
                        disabled={item.quantity >= (item.maxPerUser ?? 5)}
                        title={
                          item.quantity >= (item.maxPerUser ?? 5)
                            ? `Limit of ${item.maxPerUser ?? 5} reached`
                            : undefined
                        }
                      >
                        <Icons.Plus className="h-3 w-3" />
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
          <div className="border-primary-dark/10 border-t bg-[#F5F0E6] p-6">
            <div className="text-primary-dark mb-4 flex justify-between text-lg font-bold">
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
              className="text-primary-dark/60 mb-6 text-center text-[10px] tracking-wider uppercase"
            >
              Shipping & taxes calculated at checkout
            </Text>

            <Button variant={"checkout"} onClick={handleCheckout}>
              <Text
                as="span"
                variant="primary"
                className="text-xs tracking-widest uppercase"
              >
                Checkout
              </Text>
              <Icons.ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
