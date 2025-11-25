import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const productService = {
  getAll: () => prisma.product.findMany({
    include: { category: true, supplier: true, user: true }
  }),

  create: (data) => prisma.product.create({
    data: {
      name: data.name,
      sku: data.sku,
      price: data.price,
      cost: data.cost,
      stock: data.stock || 0,
      categoryId: data.categoryId,
      supplierId: data.supplierId,
      userId: data.userId
    }
  }),

  updateStock: (productId, amount) =>
    prisma.product.update({
      where: { id: productId },
      data: { stock: amount }
    })
};
