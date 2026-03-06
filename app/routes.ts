import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/Home.tsx"),
  route("about", "./routes/About.tsx"),
  route("collection", "./routes/Collection.tsx"),
  route("/checkout", "./routes/Checkout.tsx"),
  route("/contact", "./routes/Contact.tsx"),
  route("/shipping-policy", "./routes/Shipping.tsx"),
  route("/product/:id", "./routes/ProductDetails.tsx"),
] satisfies RouteConfig;
