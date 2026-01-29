import express from "express";
import {
  getProducts,
  getProductsBySlug,
  getProductsEn,
  getProductsBySlugEn
} from "../controllers/products.controller.js";

const router = express.Router();

// 🇫🇷
router.get("/", getProducts);
router.get("/slug", getProductsBySlug);

// 🇬🇧
router.get("/en", getProductsEn);
router.get("/en/slug", getProductsBySlugEn);

export default router;
