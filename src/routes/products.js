import express from "express";
import { getProducts, createProduct } from "../controllers/productsController.js";
const router = express.Router();

router.get("/get", getProducts);
router.post("/create", createProduct);

export default router;