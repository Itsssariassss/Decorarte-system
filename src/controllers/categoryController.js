import prisma from "../../prisma/client.js";

export const createCategory = async (req, res) => {
  try {
    const { name } = req.body;

    const data = await prisma.category.create({
      data: { name }
    });

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getCategories = async (req, res) => {
  const data = await prisma.category.findMany();
  res.json(data);
};

export const getCategory = async (req, res) => {
  const data = await prisma.category.findUnique({
    where: { id: Number(req.params.id) }
  });
  res.json(data);
};

export const updateCategory = async (req, res) => {
  const data = await prisma.category.update({
    where: { id: Number(req.params.id) },
    data: req.body
  });
  res.json(data);
};

export const deleteCategory = async (req, res) => {
  await prisma.category.delete({
    where: { id: Number(req.params.id) }
  });
  res.json({ message: "Category deleted" });
};

