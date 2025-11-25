import { Router } from "express";
import {
  createAgreement,
  getAgreements,
  getAgreement,
  updateAgreement,
  deleteAgreement
} from "../controllers/agreementsController.js";

const router = Router();

router.post("/", createAgreement);
router.get("/", getAgreements);
router.get("/:id", getAgreement);
router.put("/:id", updateAgreement);
router.delete("/:id", deleteAgreement);

export default router;
