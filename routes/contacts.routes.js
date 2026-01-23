// routes/contactRoutes.js
import express from "express";
import { sendContactMessage } from "../controllers/contacts.controller.js";

const router = express.Router();

router.post("/", sendContactMessage);

export default router;