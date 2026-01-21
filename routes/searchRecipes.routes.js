import express from "express";
import { searchRecipes } from "../controllers/searchRecipes.controller.js";

const router = express.Router();

// /api/search/recipes?q=...
router.get("/", searchRecipes);

export default router;
