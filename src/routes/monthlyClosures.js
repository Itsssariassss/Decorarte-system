import { Router } from "express";
import {
  createMonthlyClosure,
  getMonthlyClosures,
  getMonthlyClosure,
  deleteMonthlyClosure
} from "../controllers/monthlyClosuresController.js";

const router = Router();

router.post("/", createMonthlyClosure);
router.get("/", getMonthlyClosures);
router.get("/:id", getMonthlyClosure);
router.delete("/:id", deleteMonthlyClosure);

export default router;
