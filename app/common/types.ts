export interface cartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  quantity: number;
  stockAvailable: number;
  maxPerUser?: number;
}

export interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  cart: cartItem[];
  updateQuantity: (id: string, delta: number) => void;
  removeFromCart: (id: string) => void;
  user: any;
}

export interface ProductCardProps {
  product: {
    id: string;
    name: string;
    category: string;
    price: number;
    image: string;
    stockAvailable: number;
    maxPerUser?: number;
  };
}
