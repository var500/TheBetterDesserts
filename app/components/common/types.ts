export interface cartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

export interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  cart: cartItem[];
  updateQuantity: (id: string, delta: number) => void;
  removeFromCart: (id: string) => void;
  user: any;
}
