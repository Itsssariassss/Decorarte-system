import { PrismaClient } from "@prisma/client";
import PDFDocument from "pdfkit";
import fs from "fs";

const prisma = new PrismaClient();

export const generateMonthlyReport = async () => {
  const now = new Date();
  const month = now.getMonth() + 1;
  const year = now.getFullYear();

  const filePath = `./reports/monthly_report_${year}_${month}.pdf`;

  const doc = new PDFDocument();
  doc.pipe(fs.createWriteStream(filePath));

  doc.fontSize(22).text("Reporte Mensual", { align: "center" });
  doc.moveDown();

  doc.fontSize(14).text(`Mes: ${month}/${year}`);
  doc.moveDown(2);

  const invoices = await prisma.invoice.findMany({
    where: {
      createdAt: {
        gte: new Date(year, month - 1, 1),
        lt: new Date(year, month, 1)
      }
    },
    include: {
      items: {
        include: { product: true }
      }
    }
  });

  let totalIncome = 0;
  invoices.forEach(inv => totalIncome += inv.total);

  doc.fontSize(16).text("Resumen de ventas:");
  doc.moveDown();

  invoices.forEach(inv => {
    doc.fontSize(12).text(
      `Factura #${inv.id} - RD$${inv.total} - ${inv.createdAt.toISOString().split("T")[0]}`
    );
  });

  doc.moveDown(2);
  doc.fontSize(18).text(`Total generado: RD$${totalIncome}`, { align: "right" });

  doc.end();

  return filePath;
};
