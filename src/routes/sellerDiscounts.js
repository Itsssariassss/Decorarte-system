import { Router } from "express";
import {
  createSellerDiscount,
  getSellerDiscounts,
  getSellerDiscount,
  updateSellerDiscount,
  deleteSellerDiscount
} from "../controllers/sellerDiscountsController.js";

const router = Router();

router.post("/", createSellerDiscount);
router.get("/", getSellerDiscounts);
router.get("/:id", getSellerDiscount);
router.put("/:id", updateSellerDiscount);
router.delete("/:id", deleteSellerDiscount);

export default router;
