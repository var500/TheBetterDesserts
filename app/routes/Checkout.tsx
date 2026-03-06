import type { Route } from "./+types/home";
import Layout from "~/components/Layout/Layout";

import Checkout from "~/components/shop/checkout";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "The Better Desserts" },
    { name: "description", content: "Checkout" },
    { icon: "/favicon.ico" },
  ];
}

export default function CheckoutOrder() {
  return (
    <Layout>
      <Checkout />
    </Layout>
  );
}
