import { Router } from "express";
import {
  createCategory,
  getCategories,
  getCategory,
  updateCategory,
  deleteCategory
} from "../controllers/categoryController.js";

const router = Router();

router.post("/", (req, res, next) => {
  console.log("BODY RECIBIDO:", req.body);
  next();
});

router.post("/", createCategory);
router.get("/", getCategories);
router.get("/:id", getCategory);
router.put("/:id", updateCategory);
router.delete("/:id", deleteCategory);

export default router;
