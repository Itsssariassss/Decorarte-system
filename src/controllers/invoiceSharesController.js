import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getInvoiceShares = async (req, res) => {
  try {
    const data = await prisma.invoiceShare.findMany({
      include: { invoice: true, user: true }
    });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createInvoiceShare = async (req, res) => {
  try {
    const { invoiceId, userId, percentage, fixedAmount } = req.body;

    const data = await prisma.invoiceShare.create({
      data: {
        invoiceId,
        userId,
        percentage: percentage || 0,
        fixedAmount: fixedAmount || 0
      }
    });

    res.status(201).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getInvoiceShare = async (req, res) => {
  try {
    const data = await prisma.invoiceShare.findUnique({
      where: { id: Number(req.params.id) },
      include: { invoice: true, user: true }
    });

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateInvoiceShare = async (req, res) => {
  try {
    const data = await prisma.invoiceShare.update({
      where: { id: Number(req.params.id) },
      data: req.body
    });

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteInvoiceShare = async (req, res) => {
  try {
    await prisma.invoiceShare.delete({
      where: { id: Number(req.params.id) }
    });

    res.json({ message: "Invoice share deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
