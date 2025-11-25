import cron from "node-cron";
import { generateMonthlyReport } from "../services/reportService.js";
import logger from "../utils/logger.js";

export const monthlyClosureJob = cron.schedule("0 0 1 * *", async () => {
  try {
    logger("Iniciando cierre mensual…");

    const pdfPath = await generateMonthlyReport();

    logger(`Reporte mensual generado: ${pdfPath}`);
  } catch (err) {
    logger("Error en el cierre mensual", err);
  }
});
