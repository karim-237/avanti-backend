import express from "express";
import { getSocialLinks } from "../controllers/socialLinks.controller.js";

const router = express.Router();

router.get("/", getSocialLinks);

export default router;
