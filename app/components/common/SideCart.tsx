import { ArrowRight, Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import type { cartItem, CartSidebarProps } from "./types";

export const CartSidebar = ({
  isOpen,
  onClose,
  cart,
  updateQuantity,
  removeFromCart,
  user,
}: CartSidebarProps) => {
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-100 flex justify-end">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative w-full max-w-md bg-white h-full flex flex-col shadow-2xl animate-in slide-in-from-right duration-300">
        <div className="p-6 border-b flex items-center justify-between">
          <h2 className="text-xl font-bold flex items-center gap-2 text-[#1A243F]">
            YOUR BAG{" "}
            <span className="text-gray-500 text-sm">({cart.length})</span>
          </h2>
          <X className="w-6 h-6 cursor-pointer" onClick={onClose} />
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-gray-400 space-y-4">
              <ShoppingBag className="w-12 h-12 opacity-20" />
              <p className="font-serif italic text-[#1A243F]">
                Your bag is empty
              </p>
              <button
                onClick={onClose}
                className="text-[#1A243F] text-sm font-bold border-b border-[#1A243F]"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            cart.map((item: cartItem) => (
              <div key={item.id} className="flex gap-4">
                <img
                  src={item.image}
                  className="w-20 h-20 object-cover rounded"
                  alt={item.name}
                />
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="text-sm font-bold text-gray-800">
                      {item.name}
                    </h4>
                    <Trash2
                      className="w-4 h-4 text-gray-300 cursor-pointer hover:text-red-500"
                      onClick={() => removeFromCart(item.id)}
                    />
                  </div>
                  <p className="text-[#1A243F] text-xs font-semibold mb-3">
                    RS. {item.price.toLocaleString()}
                  </p>
                  <div className="flex items-center border border-gray-100 rounded-md w-max">
                    <button
                      className="p-1 hover:bg-gray-50"
                      onClick={() => updateQuantity(item.id, -1)}
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="px-3 py-1 text-xs font-bold">
                      {item.quantity}
                    </span>
                    <button
                      className="p-1 hover:bg-gray-50"
                      onClick={() => updateQuantity(item.id, 1)}
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="p-6 border-t bg-gray-50">
            <div className="flex justify-between mb-4 font-bold text-lg text-[#1A243F]">
              <span>Total</span>
              <span>RS. {total.toLocaleString()}</span>
            </div>
            <p className="text-[10px] text-gray-400 mb-6 uppercase tracking-wider text-center">
              Shipping & taxes calculated at checkout
            </p>
            <button className="w-full bg-[#1A243F] text-[#F5F0E6] py-4 rounded-full font-bold hover:bg-opacity-90 transition-colors flex items-center justify-center gap-2">
              CHECKOUT <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
