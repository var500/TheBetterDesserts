import type { LucideProps } from "lucide-react";
import {
  ArrowRight,
  ChevronRight,
  LogOut,
  User,
  X,
  Menu,
  Search,
  ShoppingBag,
  Minus,
  Plus,
  Trash2,
  WheatOff,
  Heart,
  Package,
  Star,
  Truck,
  Clock,
  Gift,
  Sparkles,
  Egg,
  Palmtree,
  Ban,
  Box,
  MapPin,
  ChevronDown,
  Check,
  Cookie,
  MessageSquare,
  Loader,
} from "lucide-react";

import type { JSX } from "react";

export type icon = (props: LucideProps) => JSX.Element;

export const Icons = {
  ArrowRight: ArrowRight,
  Cookie: Cookie,
  Loader: Loader,
  Menu: Menu,
  Search: Search,
  ShoppingBag: ShoppingBag,
  ChevronRight: ChevronRight,
  LogOut: LogOut,
  User: User,
  X: X,
  Minus: Minus,
  Plus: Plus,
  Trash2: Trash2,
  Heart: Heart,
  Package: Package,
  Star: Star,
  Truck: Truck,
  Clock: Clock,
  Gift: Gift,
  Sparkles: Sparkles,
  Egg: Egg,
  PalmTree: Palmtree,
  Ban: Ban,
  Box: Box,
  wheatOff: WheatOff,
  MapPin: MapPin,
  ChevronDown: ChevronDown,
  Check: Check,
  MessageSquare: MessageSquare,
  instagram: ({ ...props }: LucideProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="-3.2 -3.2 38.40 38.40"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M23,31H9c-4.4,0-8-3.6-8-8V9c0-4.4,3.6-8,8-8h14c4.4,0,8,3.6,8,8v14C31,27.4,27.4,31,23,31z" />

      <circle cx="16" cy="16" r="7" />

      <circle cx="24" cy="7" r="1" />
    </svg>
  ),
};
