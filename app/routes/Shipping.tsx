import type { Route } from "./+types/home";
import Layout from "~/components/Layout/Layout";

import ContactUs from "~/components/Support/contact";
import Shipping from "~/components/Support/Shipping";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "The Better Desserts" },
    { name: "description", content: "Shipping Policy" },
    { icon: "/favicon.ico" },
  ];
}

export default function ShippingPolicy() {
  return (
    <Layout>
      <Shipping />
    </Layout>
  );
}
