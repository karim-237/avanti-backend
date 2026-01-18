import express from "express";
import { getAboutSection } from "../controllers/about.controller.js";

const router = express.Router();

router.get("/about-section", getAboutSection);

export default router; // ✅ OBLIGATOIRE
