export type Zone = "GURGAON" | "DELHI_NCR" | "PAN_INDIA";
export interface Product {
  id: string;
  name: string;
  price: number;
  image: string[];
  unitDescription: string;
  isAvailable: boolean;
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

export const STATUS_OPTIONS = [
  "PENDING",
  "CONFIRMED",
  "BAKING",
  "OUT_FOR_DELIVERY",
  "DELIVERED",
  "CANCELLED",
];

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
  discount_amount: string;
  items: OrderItem[];
  address: Address | null;
  user: UserSnippet | null;
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

// Add to your common/types file

export interface UserSnippet {
  id: string;
  role: string;
  phone_number: string | null;
  email: string | null;
  fname: string | null;
  lname: string | null;
  wa_opt_in: boolean;
  created_at: string;
  updated_at: string;
  dob_date: string | null;
  dob_month: number | null;
  dob_day: number | null;
}

export interface AdminOrder {
  id: string;
  user_id: string;
  address_id: string | null;
  created_at: string;
  updated_at: string;
  total_items_cost: string;
  delivery_fee: string;
  total_amount: string;
  applied_coupon_id: string | null;
  razorpayOrderId: string | null;
  discount_amount: string | null;
  order_status: string;
  delivery_date: string;
  slot_start_time: string;
  slot_end_time: string;
  payment_status: string;
  awb_number: string | null;
  client_wa_status: string;
  admin_wa_status: string;
  coupon_id: string | null;
  user: UserSnippet;
}

export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface PaginatedAdminOrdersResponse {
  data: AdminOrder[];
  meta: PaginationMeta;
}

// Add to your common/types.ts file

// 1. Availability Input (Used for setting stock per zone)
export interface ProductAvailabilityInput {
  zone: "GURGAON" | "DELHI_NCR" | "PAN_INDIA";
  stock_count: number;
}

// 2. Create Payload
export interface CreateProductPayload {
  name: string;
  description?: string | null;
  price: number;
  image_url: string[];
  category: string; // The category_id string
  weight_grams?: number | null;
  unitDescription?: string | null;
  is_active?: boolean;
  is_bestseller?: boolean;
  max_per_user?: number;
  availability: ProductAvailabilityInput[];
}

// 3. Update Payload (Everything is optional)
export type UpdateProductPayload = Partial<CreateProductPayload>;

// 4. Detailed Admin Product (What you'll likely need to render the table/edit form)
export interface AdminProduct {
  id: string;
  name: string;
  price: number | string; // Decimal from Prisma sometimes serializes as string
  image: string[];
  unitDescription: string | null;
  description: string | null;
  stockAvailable: number;
  weight_grams: number | null;
  max_per_user: number;
  is_active: boolean;
  is_bestseller: boolean;
  category: {
    id: string;
    title: string;
    description: string;
  };
  availability: {
    id: string;
    product_id: string;
    zone: "GURGAON" | "DELHI_NCR" | "PAN_INDIA";
    stock_count: number | null;
  }[];
}
