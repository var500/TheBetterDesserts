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
  user_id: string;
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

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  quantity: number;
  price_at_purchase: string;
  product: Product;
}

export interface OrderDetailsResponse {
  id: string;
  user_id: string;
  address_id: string | null;
  total_items_cost: string;
  delivery_fee: string;
  total_amount: string;
  razorpayOrderId: string | null;
  order_status: string;
  delivery_date: string;
  slot_start_time: string;
  slot_end_time: string;
  payment_status: string;
  awb_number: string | null;
  client_wa_status: string;
  admin_wa_status: string;
  created_at: string;
  updated_at: string;
  items: OrderItem[];
  address: Address | null;
}

export type AddAddressInput = Omit<Address, "id">;

export interface OtpVerifyResponse {
  accessToken: string;
  user: {
    uid: string;
    email: string;
    role: string;
  };
  message: string;
}

export const Role = {
  CUSTOMER: "CUSTOMER",
  ADMIN: "ADMIN",
} as const;

export type Role = "CUSTOMER" | "ADMIN";

export interface UpdateProfilePayload {
  fname?: string;
  lname?: string;
  phone_number?: string;
  dob_date?: string;
  wa_opt_in?: boolean;
}
export interface CreateCouponPayload {
  code: string;
  discount_percentage: number;
  max_discount_amount?: number | null;
  min_order_value?: number | null;
  usage_limit?: number | null;
  valid_until?: string | null;
}
export interface VerifyCouponResponse {
  success: boolean;
  code: string;
  discountPercentage: number;
  discountAmount: number;
}
export interface Coupon {
  id: string;
  code: string;
  discount_percentage: number;
  max_discount_amount: number | null;
  min_order_value: number | null;
  usage_limit: number | null;
  usage_count: number;
  valid_until: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}
