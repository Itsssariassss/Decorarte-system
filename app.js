import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import authRoutes from "./src/routes/auth.js";
import usersRoutes from "./src/routes/users.js";
import categoryRoutes from "./src/routes/category.js";
import productsRoutes from "./src/routes/products.js";
import customersRoutes from "./src/routes/customers.js";
import invoicesRoutes from "./src/routes/invoices.js";
import paymentsRoutes from "./src/routes/payments.js"; 

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/auth", authRoutes);
app.use("/users", usersRoutes);
app.use("/categories", categoryRoutes);
app.use("/products", productsRoutes);
app.use("/customers", customersRoutes);
app.use("/invoices", invoicesRoutes);
app.use("/payments", paymentsRoutes);

app.get("/", (req, res) => res.send("API funcionando 🚀"));

export default app;
