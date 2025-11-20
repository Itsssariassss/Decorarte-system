import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function getCustomers(req, res){
  const customers = await prisma.customer.findMany();
  res.json(customers);
}

export async function createCustomer(req, res){
  const { name, phone, email, address } = req.body;
  const c = await prisma.customer.create({ data: { name, phone, email, address }});
  res.status(201).json(c);
}
