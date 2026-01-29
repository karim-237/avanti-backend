import express from "express";
import { getTranslatedSlug } from "../controllers/translation.controller.js";

const router = express.Router();

router.get("/translate-slug", getTranslatedSlug);

export default router;
