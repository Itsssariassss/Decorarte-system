import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
const prisma = new PrismaClient();

async function main(){
  const pass = await bcrypt.hash("admin123", 10);
  await prisma.user.upsert({
    where: { email: "admin@decorarte.com" },
    update: {},
    create: { name: "Admin", email: "admin@decorarte.com", password: pass, role: "admin", code: "ADM01" }
  });

  await prisma.product.upsert({
    where: { sku: "SKU-001" },
    update: {},
    create: { sku: "SKU-001", name: "Cuadro moderno", price: 2500, cost: 1500, stock: 10 }
  });

  await prisma.product.upsert({
    where: { sku: "SKU-002" },
    update: {},
    create: { sku: "SKU-002", name: "Lámpara vintage", price: 1800, cost: 900, stock: 5 }
  });
}
main()
  .catch(e => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
