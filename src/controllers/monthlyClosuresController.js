import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const createMonthlyClosure = async (req, res) => {
  try {
    const { period, data } = req.body;

    const closure = await prisma.monthlyClosure.create({
      data: { period: new Date(period), data }
    });

    res.json(closure);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getMonthlyClosures = async (req, res) => {
  const closures = await prisma.monthlyClosure.findMany();
  res.json(closures);
};

export const getMonthlyClosure = async (req, res) => {
  const closure = await prisma.monthlyClosure.findUnique({
    where: { id: Number(req.params.id) }
  });

  res.json(closure);
};

export const deleteMonthlyClosure = async (req, res) => {
  await prisma.monthlyClosure.delete({
    where: { id: Number(req.params.id) }
  });

  res.json({ message: "Monthly closure deleted" });
};
