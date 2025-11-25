import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";

// Rutas
import authRoutes from "./routes/auth.js";
import usersRoutes from "./routes/users.js";
import categoryRoutes from "./routes/category.js";
import productsRoutes from "./routes/products.js";
import customersRoutes from "./routes/customers.js";
import invoicesRoutes from "./routes/invoices.js";
import paymentsRoutes from "./routes/payments.js";
import suppliersRoutes from "./routes/suppliers.js";
import invoiceSharesRoutes from "./routes/invoiceShares.js";
import sellerDiscountsRoutes from "./routes/sellerDiscounts.js";
import agreementsRoutes from "./routes/agreements.js";
import agreementPaymentsRoutes from "./routes/agreementPayments.js";
import monthlyClosuresRoutes from "./routes/monthlyClosures.js";

import { startJobs } from "./jobs/index.js";

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Registrar rutas
app.use("/auth", authRoutes);
app.use("/users", usersRoutes);
app.use("/categories", categoryRoutes);
app.use("/products", productsRoutes);
app.use("/customers", customersRoutes);
app.use("/invoices", invoicesRoutes);
app.use("/payments", paymentsRoutes);
app.use("/suppliers", suppliersRoutes);
app.use("/invoice-shares", invoiceSharesRoutes);
app.use("/seller-discounts", sellerDiscountsRoutes);
app.use("/agreements", agreementsRoutes);
app.use("/agreement-payments", agreementPaymentsRoutes);
app.use("/monthly-closures", monthlyClosuresRoutes);

app.get("/", (req, res) => res.send("API funcionando 🚀"));

startJobs();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`)
);
