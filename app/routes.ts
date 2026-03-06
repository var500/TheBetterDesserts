import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("about", "./routes/about.tsx"),
  route("collection", "./routes/collection.tsx"),
  route("/checkout", "./routes/checkout.tsx"),
  route("/product/:id", "./routes/productDetails.tsx"),
] satisfies RouteConfig;
