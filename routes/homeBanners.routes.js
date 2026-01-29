import express from "express";
import {
  getHomeBanners,
  getHomeBannersEn
} from "../controllers/homeBanners.controller.js";

const router = express.Router();

// 🇫🇷
router.get("/", getHomeBanners);

// 🇬🇧
router.get("/en", getHomeBannersEn);

export default router;
