import express from "express";
import {
    getAboutSection,
    getAboutSectionEn
} from "../controllers/about.controller.js";

const router = express.Router();

/**
 * 🇫🇷
 */
router.get("/about-section", getAboutSection);

/**
 * 🇬🇧
 */
router.get("/en/about-section", getAboutSectionEn);

export default router; // ✅ OBLIGATOIRE
