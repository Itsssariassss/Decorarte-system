import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const invoiceService = {
  calculateTotal(items) {
    let total = 0;
    for (const it of items) {
      total += (Number(it.price) - Number(it.discount || 0)) * Number(it.qty);
    }
    return total;
  },

  async createInvoice(data) {
    const total = this.calculateTotal(data.items);

    return prisma.$transaction(async (tx) => {
      const invoice = await tx.invoice.create({
        data: {
          customerId: data.customerId,
          sellerId: data.sellerId,
          total,
          dueDate: data.dueDate ? new Date(data.dueDate) : null,
          status: "issued"
        }
      });

      for (const it of data.items) {
        await tx.invoiceItem.create({
          data: {
            invoiceId: invoice.id,
            productId: it.productId,
            qty: it.qty,
            price: it.price,
            discount: it.discount || 0
          }
        });

        await tx.product.update({
          where: { id: it.productId },
          data: { stock: { decrement: it.qty } }
        });
      }

      return invoice;
    });
  }
};
