import Welcome from "~/components/Welcome";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "The Better Desserts" },
    { name: "description", content: "Welcome to The Better Desserts!" },
    { icon: "/favicon.ico" },
  ];
}

export default function Home() {
  return <Welcome />;
}
