import { monthlyClosureJob } from "./monthlyClosureJob.js";
import { lowStockJob } from "./lowStockJob.js";
import { dailyBackupJob } from "./dailyBackupJob.js";

export const startJobs = () => {
  console.log("⏱️ Iniciando cron jobs...");

  monthlyClosureJob.start();
  lowStockJob.start();
  dailyBackupJob.start();

  console.log("✅ Cron jobs iniciados correctamente");
};
