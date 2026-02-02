import express from "express";
import { getNewsletterSection } from "../controllers/newsletter_section.controller.js";

const router = express.Router();

// Endpoint pour récupérer la vidéo newsletter
router.get("/homepage/video", getNewsletterSection);

export default router;
