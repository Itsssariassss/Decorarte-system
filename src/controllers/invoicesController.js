import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();


export async function getInvoices(req, res){
  const invoices = await prisma.invoice.findMany({ include: { items: true, payments: true }});
  res.json(invoices);
}

export async function createInvoice(req, res){
  /**
   body: {
     customerId,
     sellerId,
     dueDate,
     items: [{ productId, qty, price, discount }]
   }
  */
  const { customerId, sellerId, dueDate, items } = req.body;

  // calcula total
  let total = 0;
  for(const it of items){
    const line = (Number(it.price) - Number(it.discount || 0)) * Number(it.qty);
    total += line;
  }

  // transacción
  const invoice = await prisma.$transaction(async (tx) => {
    const inv = await tx.invoice.create({
      data: {
        customerId: customerId || null,
        sellerId: sellerId || null,
        total: total.toFixed(2),
        dueDate: dueDate ? new Date(dueDate) : null
      }
    });

    for(const it of items){
      await tx.invoiceItem.create({
        data: {
          invoiceId: inv.id,
          productId: it.productId,
          qty: it.qty,
          price: it.price,
          discount: it.discount || 0
        }
      });
      // actualizar stock
      await tx.product.update({
        where: { id: it.productId },
        data: { stock: { decrement: Number(it.qty) } }
      });
    }

    return inv;
  });

  res.status(201).json(invoice);
}
