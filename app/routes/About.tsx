import Layout from "~/components/Layout/Layout";
import AboutUs from "~/components/About";

export function meta() {
  return [
    { title: "The Better Desserts" },
    { name: "description", content: "Our Story" },
    { icon: "/favicon.ico" },
  ];
}

export default function About() {
  return (
    <Layout>
      <AboutUs />
    </Layout>
  );
}
