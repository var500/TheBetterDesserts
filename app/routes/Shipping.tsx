import Shipping from "~/components/Support/Shipping";

export function meta() {
  return [
    { title: "The Better Desserts" },
    { name: "description", content: "Shipping Policy" },
    { icon: "/favicon.ico" },
  ];
}

export default function ShippingPolicy() {
  return <Shipping />;
}
