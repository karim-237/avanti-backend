import express from "express";
import {
  getAllRecipes,
  getRecipeBySlug,
  getRecipeCategories,
  getRecipesByCategory,
  getLatestRecipes,
  getAllRecipesEn,
  getRecipeBySlugEn,
  getLatestRecipesEn,
  getRecipeCategoriesEn
} from "../controllers/recipes.controller.js";

const router = express.Router();

// 🇫🇷
router.get("/", getAllRecipes);
router.get("/latest", getLatestRecipes);
router.get("/recipe-categories", getRecipeCategories);
router.get("/category/:slug", getRecipesByCategory);
router.get("/:slug", getRecipeBySlug);

// 🇬🇧
router.get("/en", getAllRecipesEn);
router.get("/en/latest", getLatestRecipesEn);
router.get("/en/recipe-categories", getRecipeCategoriesEn);
router.get("/en/:slug", getRecipeBySlugEn);

export default router;
