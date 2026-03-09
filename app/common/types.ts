export type Zone = "GURGAON" | "DELHI_NCR" | "PAN_INDIA";
export interface Product {
  id: string;
  name: string;
  price: number;
  image: string[];
  unitDescription: string;
  stockAvailable: number;
  availableIn: Zone[];
  maxPerUser: number;
  category: {
    title: string;
    description: string;
  };
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
  first_name: string;
  last_name: string;
  phone_number: string;
  house_no: string;
  street_address: string;
  city: string;
  state: string;
  pin_code: string;
  is_default?: boolean;
}

export type AddAddressInput = Omit<Address, "id">;
