import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const createSellerDiscount = async (req, res) => {
  try {
    const { userId, description, amount } = req.body;

    const discount = await prisma.sellerDiscount.create({
      data: { userId, description, amount }
    });

    res.json(discount);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getSellerDiscounts = async (req, res) => {
  try {
    const discounts = await prisma.sellerDiscount.findMany({
      include: { user: true }
    });
    res.json(discounts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getSellerDiscount = async (req, res) => {
  try {
    const { id } = req.params;

    const discount = await prisma.sellerDiscount.findUnique({
      where: { id: Number(id) },
      include: { user: true }
    });

    res.json(discount);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateSellerDiscount = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    const updated = await prisma.sellerDiscount.update({
      where: { id: Number(id) },
      data
    });

    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteSellerDiscount = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.sellerDiscount.delete({
      where: { id: Number(id) }
    });

    res.json({ message: "Seller Discount deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
