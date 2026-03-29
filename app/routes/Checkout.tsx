import Checkout from "~/components/Checkout";

export function meta() {
  return [
    { title: "The Better Desserts" },
    { name: "description", content: "Checkout" },
    { icon: "/favicon.ico" },
  ];
}

export default function CheckoutOrder() {
  return <Checkout />;
}
