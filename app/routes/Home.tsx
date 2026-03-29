import Welcome from "~/components/welcome";

export function meta() {
  return [
    { title: "The Better Desserts" },
    { name: "description", content: "Welcome to The Better Desserts!" },
    { icon: "/favicon.ico" },
  ];
}

export default function Home() {
  return <Welcome />;
}
