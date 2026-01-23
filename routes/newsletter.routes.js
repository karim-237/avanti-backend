import express from "express";
import { addNewsletterEmail } from "../controllers/newsletter.controller.js";

const router = express.Router();

// Ajouter un email à la newsletter
router.post("/", addNewsletterEmail);

export default router;
