import express from "express";
import { getSiteContacts, getSocialLinks } from "../controllers/footer.controller.js";

const router = express.Router();

router.get("/contacts", getSiteContacts);
router.get("/social-links", getSocialLinks);

export default router;
