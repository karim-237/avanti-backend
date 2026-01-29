import express from "express";
import { getAllTags, getAllTagsEn } from "../controllers/tag.controller.js";

const router = express.Router();

// 🇫🇷
router.get("/", getAllTags);

// 🇬🇧
router.get("/en", getAllTagsEn);

export default router;
