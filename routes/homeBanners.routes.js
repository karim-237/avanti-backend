import express from "express";
import { getHomeBanners } from "../controllers/homeBanners.controller.js";

const router = express.Router();

router.get("/", getHomeBanners);

export default router;
