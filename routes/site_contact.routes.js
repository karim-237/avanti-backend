// routes/site_contact.routes.js
import express from "express";
import { getSiteContactInfo } from "../controllers/site_contact.controller.js";

const router = express.Router();
router.get("/", getSiteContactInfo);

export default router;
