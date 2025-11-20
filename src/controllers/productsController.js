import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


export async function getProducts(req, res){
  const products = await prisma.product.findMany();
  res.json(products);
}

export async function createProduct(req, res){
  const { name, price, cost, sku, stock } = req.body;
  const p = await prisma.product.create({
    data: { name, price: Number(price), cost: Number(cost), sku, stock: Number(stock || 0) }
  });
  res.status(201).json(p);
}
