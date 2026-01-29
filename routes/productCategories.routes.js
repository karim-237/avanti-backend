import express from "express";
import {
  getProductCategories,
  getProductCategoriesEn
} from "../controllers/productCategories.controller.js";

const router = express.Router();

// 🇫🇷
router.get("/", getProductCategories);

// 🇬🇧
router.get("/en", getProductCategoriesEn);

export default router;
