import express from "express";
import { getChooseSection } from "../controllers/chooseSection.controller.js";

const router = express.Router();

router.get("/", getChooseSection);

export default router;
