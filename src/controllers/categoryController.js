import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const createCategory = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name || name.trim() === "") {
      return res.status(400).json({ error: "El nombre es obligatorio." });
    }

    const exists = await prisma.category.findUnique({
      where: { name }
    });

    if (exists) {
      return res.status(409).json({ error: "Esta categoría ya existe." });
    }

    const data = await prisma.category.create({
      data: { name }
    });

    res.status(201).json(data);

  } catch (err) {
    console.error("Error creando categoría:", err);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const getCategories = async (req, res) => {
  try {
    const data = await prisma.category.findMany({
      orderBy: { id: "asc" }
    });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Error obteniendo categorías" });
  }
};

export const getCategory = async (req, res) => {
  try {
    const id = Number(req.params.id);

    const data = await prisma.category.findUnique({ where: { id } });

    if (!data) {
      return res.status(404).json({ error: "Categoría no encontrada" });
    }

    res.json(data);

  } catch (err) {
    res.status(500).json({ error: "Error obteniendo categoría" });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { name } = req.body;

    if (!name || name.trim() === "") {
      return res.status(400).json({ error: "El nombre es obligatorio." });
    }

    const updated = await prisma.category.update({
      where: { id },
      data: { name }
    });

    res.json(updated);

  } catch (err) {
    if (err.code === "P2025") {
      return res.status(404).json({ error: "Categoría no encontrada" });
    }
    res.status(500).json({ error: "Error actualizando categoría" });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const id = Number(req.params.id);

    await prisma.category.delete({ where: { id } });

    res.json({ message: "Categoría eliminada" });

  } catch (err) {
    if (err.code === "P2025") {
      return res.status(404).json({ error: "Categoría no encontrada" });
    }
    res.status(500).json({ error: "Error eliminando categoría" });
  }
};
