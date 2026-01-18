import express from "express";
import { getProductCategories } from "../controllers/productCategories.controller.js";

const router = express.Router();

router.get("/", getProductCategories);

export default router;
