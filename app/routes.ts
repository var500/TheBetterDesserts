import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  index("routes/Home.tsx"),
  route("about", "./routes/About.tsx"),
  route("profile", "./routes/Profile.tsx"),
  route("collection", "./routes/Collection.tsx"),
  route("/checkout", "./routes/Checkout.tsx"),
  route("/contact", "./routes/Contact.tsx"),
  route("/gifting", "./routes/Gifting.tsx"),
  route("/policies/shipping-policy", "./routes/Shipping.tsx"),
  route("/order-confirmation", "./routes/order-confirmation.tsx"),
  route("/product/:id", "./routes/ProductDetails.tsx"),
  route("/admin/login", "./routes/AdminLogin.tsx"),
  route("/policies/refund-policy", "./routes/Refund.tsx"),
  route("/policies/privacy-policy", "./routes/Privacy.tsx"),

  layout("./routes/AdminGuard.tsx", [
    route("/admin/dashboard", "./routes/AdminDashboard.tsx"),
    route("/admin/coupons", "./routes/AdminCoupons.tsx"),
    route("/admin/products", "./routes/Products.tsx"),
    route("/admin/orders/:id", "./routes/OrderDetails.tsx"),
  ]),
] satisfies RouteConfig;
