import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const createSupplier = async (req, res) => {
  try {
    const data = await prisma.supplier.create({
      data: req.body
    });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getSuppliers = async (req, res) => {
  try {
    const data = await prisma.supplier.findMany();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getSupplier = async (req, res) => {
  try {
    const data = await prisma.supplier.findUnique({
      where: { id: Number(req.params.id) }
    });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateSupplier = async (req, res) => {
  try {
    const data = await prisma.supplier.update({
      where: { id: Number(req.params.id) },
      data: req.body
    });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteSupplier = async (req, res) => {
  try {
    await prisma.supplier.delete({
      where: { id: Number(req.params.id) }
    });
    res.json({ message: "Supplier deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
