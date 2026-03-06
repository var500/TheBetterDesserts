export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category?: string;
  unitDescription?: string;
  stockAvailable?: number;
  maxPerUser?: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface ShopCategory {
  id: string;
  title: string;
  description: string;
  availableIn: Locations[];
  itemIds: string[];
}

export interface ProductCardProps {
  product: Product;
}

export enum Locations {
  GURGAON = "GURGAON",
  DELHI_NCR = "DELHI_NCR",
  PAN_INDIA = "PAN_INDIA",
}

export interface Address {
  id: string;
  name: string;
  street: string;
  city: string;
  pincode: string;
  phone: string;
}
