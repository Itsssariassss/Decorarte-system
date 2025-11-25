import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function getInvoices(req, res) {
  try {
    const invoices = await prisma.invoice.findMany({
      include: {
        customer: true,
        seller: true,
        items: true,
        payments: true,
        shares: true
      }
    });
    res.json(invoices);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function getInvoiceById(req, res) {
  try {
    const { id } = req.params;

    const invoice = await prisma.invoice.findUnique({
      where: { id: Number(id) },
      include: {
        customer: true,
        seller: true,
        items: true,
        payments: true,
        shares: true
      }
    });

    if (!invoice)
      return res.status(404).json({ msg: "Invoice not found" });

    res.json(invoice);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function createInvoice(req, res) {
  try {
    const { customerId, sellerId, dueDate, items, shares } = req.body;

    // calcula total
    let total = 0;
    for (const it of items) {
      const price = Number(it.price) || 0;
      const discount = Number(it.discount) || 0;
      const qty = Number(it.qty) || 0;

      total += (price - discount) * qty;
    }

    const invoice = await prisma.$transaction(async (tx) => {
      const inv = await tx.invoice.create({
        data: {
          customerId: customerId || null,
          sellerId: sellerId || null,
          total: total.toFixed(2),
          dueDate: dueDate ? new Date(dueDate) : null,
          status: "issued",
          legacy: false
        }
      });

      // agregar items
      for (const it of items) {
        await tx.invoiceItem.create({
          data: {
            invoiceId: inv.id,
            productId: it.productId,
            qty: Number(it.qty),
            price: it.price,
            discount: it.discount || 0
          }
        });

        // descontar stock
        await tx.product.update({
          where: { id: it.productId },
          data: { stock: { decrement: Number(it.qty) } }
        });
      }

      // shares opcionales
      if (shares && Array.isArray(shares)) {
        for (const sh of shares) {
          await tx.invoiceShare.create({
            data: {
              invoiceId: inv.id,
              userId: sh.userId,
              amount: sh.amount
            }
          });
        }
      }

      return inv;
    });

    res.status(201).json(invoice);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function updateInvoice(req, res) {
  try {
    const { id } = req.params;
    const { customerId, sellerId, dueDate, status } = req.body;

    const invoice = await prisma.invoice.update({
      where: { id: Number(id) },
      data: {
        customerId: customerId ?? undefined,
        sellerId: sellerId ?? undefined,
        dueDate: dueDate ? new Date(dueDate) : undefined,
        status: status ?? undefined
      }
    });

    res.json(invoice);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function deleteInvoice(req, res) {
  try {
    const { id } = req.params;

    const invoice = await prisma.invoice.findUnique({
      where: { id: Number(id) },
      include: { items: true }
    });

    if (!invoice)
      return res.status(404).json({ msg: "Invoice not found" });

    await prisma.$transaction(async (tx) => {
      // devolver stock
      for (const it of invoice.items) {
        await tx.product.update({
          where: { id: it.productId },
          data: { stock: { increment: it.qty } }
        });
      }

      // eliminar relacionados
      await tx.invoiceShare.deleteMany({ where: { invoiceId: invoice.id } });
      await tx.invoiceItem.deleteMany({ where: { invoiceId: invoice.id } });
      await tx.payment.deleteMany({ where: { invoiceId: invoice.id } });

      // eliminar factura
      await tx.invoice.delete({ where: { id: invoice.id } });
    });

    res.json({ msg: "Invoice deleted" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
