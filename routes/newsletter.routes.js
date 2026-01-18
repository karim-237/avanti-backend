import express from "express";
import { addNewsletterEmail, getNewsletterSection } from "../controllers/newsletter.controller.js";

const router = express.Router();

// POST /api/newsletter
router.post("/", addNewsletterEmail);

// Récupérer les infos dynamiques de la section newsletter
router.get("/section", getNewsletterSection);

export default router;
