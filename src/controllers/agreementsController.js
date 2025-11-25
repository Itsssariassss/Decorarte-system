import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const createAgreement = async (req, res) => {
  try {
    const { customerId, initialAmount, totalAmount, remainingAmount, terms } = req.body;

    const data = await prisma.agreement.create({
      data: { customerId, initialAmount, totalAmount, remainingAmount, terms }
    });

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getAgreements = async (req, res) => {
  const data = await prisma.agreement.findMany({
    include: { customer: true, payments: true }
  });
  res.json(data);
};

export const getAgreement = async (req, res) => {
  const data = await prisma.agreement.findUnique({
    where: { id: Number(req.params.id) },
    include: { customer: true, payments: true }
  });
  res.json(data);
};

export const updateAgreement = async (req, res) => {
  const data = await prisma.agreement.update({
    where: { id: Number(req.params.id) },
    data: req.body
  });
  res.json(data);
};

export const deleteAgreement = async (req, res) => {
  await prisma.agreement.delete({
    where: { id: Number(req.params.id) }
  });
  res.json({ message: "Agreement deleted" });
};
