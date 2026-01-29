import express from "express";
import {
  getChooseSection,
  getChooseSectionEn
} from "../controllers/chooseSection.controller.js";

const router = express.Router();

// 🇫🇷
router.get("/", getChooseSection);

// 🇬🇧
router.get("/en", getChooseSectionEn);

export default router;
