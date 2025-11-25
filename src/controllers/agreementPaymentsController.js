import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const createAgreementPayment = async (req, res) => {
  try {
    const { agreementId, amount, createdById } = req.body;

    const data = await prisma.agreementPayment.create({
      data: { agreementId, amount, createdById }
    });

    await prisma.agreement.update({
      where: { id: agreementId },
      data: { remainingAmount: { decrement: Number(amount) } }
    });

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const getAgreementPayments = async (req, res) => {
  const data = await prisma.agreementPayment.findMany({
    include: { agreement: true, createdBy: true }
  });
  res.json(data);
};


export const getAgreementPayment = async (req, res) => {
  const data = await prisma.agreementPayment.findUnique({
    where: { id: Number(req.params.id) },
    include: { agreement: true, createdBy: true }
  });
  res.json(data);
};


export const deleteAgreementPayment = async (req, res) => {
  await prisma.agreementPayment.delete({
    where: { id: Number(req.params.id) }
  });
  res.json({ message: "Agreement payment deleted" });
};
