// routes/contacts.routes.js
import express from "express";
import { sendContactMessage } from "../controllers/contacts.controller.js";

const router = express.Router();

// POST /api/contact
router.post("/", sendContactMessage);

export default router;
