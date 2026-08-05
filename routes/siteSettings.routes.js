import express from "express";
import multer from "multer";
import {
  uploadLogoOrFavicon,
  updateLogoFavicon,
  getSiteSettings,
  updateSiteSettings
} from "../controllers/siteSettings.controller.js";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/upload", upload.single("file"), uploadLogoOrFavicon);
router.put("/update-logo-favicon", updateLogoFavicon);

router.get("/", getSiteSettings);
router.put("/", updateSiteSettings);

export default router;