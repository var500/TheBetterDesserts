import Collection from "~/components/shop";

export function meta() {
  return [
    { title: "The Better Desserts" },
    { name: "description", content: "Shop" },
    { icon: "/favicon.ico" },
  ];
}

export default function Store() {
  return <Collection />;
}
