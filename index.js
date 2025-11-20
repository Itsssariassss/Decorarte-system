import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import customersRoutes from "./src/routes/customers.js";
import invoicesRoutes from "./src/routes/invoices.js";
import paymentsRoutes from "./src/routes/payments.js";
import productsRoutes from "./src/routes/products.js";
import usersRoutes from "./src/routes/users.js";
import authRoutes from "./src/routes/auth.js"; 
import categoryRoutes from "./src/routes/category.js";
import productsRoutesRoutes from "./src/routes/products.js";


const app = express();  
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());
app.use('/auth', authRoutes);
app.use('/customers', customersRoutes);
app.use('/invoices', invoicesRoutes);
app.use('/payments', paymentsRoutes);
app.use('/products', productsRoutes);
app.use('/users', usersRoutes);
app.use('/categories', categoryRoutes);
app.use('/products', productsRoutesRoutes);

app.get("/", (req, res) => {
  res.send("Servidor funcionando!");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
