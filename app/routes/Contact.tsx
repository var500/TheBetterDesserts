import Layout from "~/components/Layout/Layout";

import ContactUs from "~/components/Support/Contact";

export function meta() {
  return [
    { title: "The Better Desserts" },
    { name: "description", content: "Contact" },
    { icon: "/favicon.ico" },
  ];
}

export default function Contact() {
  return (
    <Layout>
      <ContactUs />
    </Layout>
  );
}
