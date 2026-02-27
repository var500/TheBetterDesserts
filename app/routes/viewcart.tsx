import Welcome from "~/components/Welcome";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "The Better Desserts" },
    { name: "description", content: "View your cart" },
    { icon: "/favicon.ico" },
  ];
}

export default function Home() {
  return <Welcome />;
}
