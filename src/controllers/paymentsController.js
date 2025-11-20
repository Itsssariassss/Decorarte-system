import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();


export async function createPayment(req, res){
  const { invoiceId, amount, method, createdBy } = req.body;
  const pay = await prisma.payment.create({
    data: {
      invoiceId,
      amount: Number(amount),
      method,
      createdById: createdBy || null
    }
  });

  // actualizar status invoice
  const agg = await prisma.payment.aggregate({ where: { invoiceId }, _sum: { amount: true }});
  const totalPaid = Number(agg._sum.amount || 0);

  const invoice = await prisma.invoice.findUnique({ where: { id: invoiceId }});
  let newStatus = invoice.status;
  if(totalPaid >= Number(invoice.total)) newStatus = "paid";
  else if(totalPaid > 0) newStatus = "partial";

  await prisma.invoice.update({ where: { id: invoiceId }, data: { status: newStatus }});

  res.status(201).json(pay);
}
