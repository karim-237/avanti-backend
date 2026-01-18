import express from "express";
import multer from "multer";
import { uploadLogoOrFavicon, updateLogoFavicon } from "../controllers/siteSettings.controller.js";
import {
  getSiteSettings,
  updateSiteSettings
} from "../controllers/siteSettings.controller.js";

const router = express.Router();
const upload = multer({ dest: "tmp/" }); // dossier temporaire


router.post("/upload", upload.single("file"), uploadLogoOrFavicon);
router.put("/update-logo-favicon", updateLogoFavicon);

router.get("/", getSiteSettings);
router.put("/", updateSiteSettings);

export default router;
