import express from "express";
import { getProducts, getProductsBySlug } from "../controllers/products.controller.js";

const router = express.Router();

router.get("/", getProducts);
router.get("/slug", getProductsBySlug);

export default router;
