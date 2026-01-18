import express from "express";
import { submitContactMessage } from "../controllers/contact_messages.controller.js";

const router = express.Router();

// On ajoute le POST pour envoyer un message
router.post("/", submitContactMessage);

export default router;
