import cron from "node-cron";
import { exec } from "child_process";
import logger from "../utils/logger.js";
import path from "path";

export const dailyBackupJob = cron.schedule("0 3 * * *", () => {
  try {
    logger("Ejecutando backup diario…");

    const backupDir = path.join(process.cwd(), "backup");
    const fileName = `decorarte_backup_${new Date().toISOString().split("T")[0]}.sql`;
    const filePath = path.join(backupDir, fileName);

    // Comando pg_dump para PostgreSQL
    const command = `pg_dump "${process.env.DATABASE_URL}" > "${filePath}"`;

    exec(command, (error) => {
      if (error) {
        logger("Error en backup diario", error);
        return;
      }

      logger("Backup diario completado");
    });
  } catch (error) {
    logger("Error en backup diario", error);
  }
});
