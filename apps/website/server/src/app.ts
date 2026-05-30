import express from "express";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";

import env from "./config/env";
import authRoutes from "./modules/auth/auth.routes";
import storeProductRoutes from "./modules/products/product.store.routes";
import adminProductRoutes from "./modules/products/product.admin.routes";
import cartRoutes from "./modules/cart/cart.routes";
import orderStoreRoutes from "./modules/orders/order.store.routes";
import orderAdminRoutes from "./modules/orders/order.admin.routes";
import userAdminRoutes from "./modules/users/user.admin.routes";

import { requireAuth } from "./middleware/auth";
import { requireRole } from "./middleware/requireRole";
import notFound from "./middleware/notFound";
import errorHandler from "./middleware/errorHandler";

const app = express();

app.use(helmet());
app.use(cors({ origin: env.CORS_ORIGIN, credentials: true }));
app.use(express.json());
app.use(morgan(env.NODE_ENV === "production" ? "combined" : "dev"));

app.get("/health", (_req, res) => {
  res.json({ ok: true });
});

app.use("/api/auth", authRoutes);

app.use("/api/store/products", storeProductRoutes);
app.use("/api/store/cart", requireAuth, cartRoutes);
app.use("/api/store/orders", requireAuth, orderStoreRoutes);

app.use("/api/admin/products", requireAuth, requireRole("admin"), adminProductRoutes);
app.use("/api/admin/orders", requireAuth, requireRole("admin"), orderAdminRoutes);
app.use("/api/admin/users", requireAuth, requireRole("admin"), userAdminRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;
