import cron from "node-cron";
import { PrismaClient } from "@prisma/client";
import logger from "../utils/logger.js";

const prisma = new PrismaClient();

export const lowStockJob = cron.schedule("0 8 * * *", async () => {
  try {
    logger("🔍 Revisando inventario bajo…");

    const lowProducts = await prisma.product.findMany({
      where: { stock: { lt: 5 } },
      select: { id: true, name: true, stock: true }
    });

    if (lowProducts.length > 0) {
      logger("⚠️ Productos con inventario bajo encontrados:");
      logger(lowProducts);
    } else {
      logger("👌 No hay productos con inventario bajo hoy.");
    }

    logger("✅ Revisión de inventario completada");
  } catch (error) {
    logger("❌ Error revisando inventario");
    logger(error);
  }
});
