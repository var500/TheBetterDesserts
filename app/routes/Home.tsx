import Welcome from "~/components/welcome";
import Layout from "~/components/Layout/Layout";

export function meta() {
  return [
    { title: "The Better Desserts" },
    { name: "description", content: "Welcome to The Better Desserts!" },
    { icon: "/favicon.ico" },
  ];
}

export default function Home() {
  return (
    <Layout>
      <Welcome />
    </Layout>
  );
}
