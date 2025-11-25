import { Router } from "express";
import {
  createAgreementPayment,
  getAgreementPayments,
  getAgreementPayment,
  deleteAgreementPayment
} from "../controllers/agreementPaymentsController.js";

const router = Router();

router.post("/", createAgreementPayment);
router.get("/", getAgreementPayments);
router.get("/:id", getAgreementPayment);
router.delete("/:id", deleteAgreementPayment);

export default router;
