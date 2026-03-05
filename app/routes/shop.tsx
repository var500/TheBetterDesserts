import type { Route } from "./+types/home";
import Layout from "~/components/Layout/Layout";

import Shop from "~/components/shop";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "The Better Desserts" },
    { name: "description", content: "Shop" },
    { icon: "/favicon.ico" },
  ];
}

export default function Store() {
  return (
    <Layout>
      <Shop />
    </Layout>
  );
}
