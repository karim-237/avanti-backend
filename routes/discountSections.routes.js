import express from "express";
import { getDiscountSections } from "../controllers/discountSections.controller.js";

const router = express.Router();

router.get("/", getDiscountSections);

export default router;
