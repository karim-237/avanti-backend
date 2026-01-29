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

// 1. ROUTES ANGLAISES (D'abord les spécifiques, puis le slug EN)
router.get("/en/latest", getLatestRecipesEn);
router.get("/en/recipe-categories", getRecipeCategoriesEn);
router.get("/en", getAllRecipesEn);
router.get("/en/:slug", getRecipeBySlugEn);

// 2. ROUTES FRANÇAISES SPÉCIFIQUES
router.get("/latest", getLatestRecipes);
router.get("/recipe-categories", getRecipeCategories);
router.get("/category/:slug", getRecipesByCategory);

// 3. SLUG FRANÇAIS (En dernier pour ne pas intercepter /en ou /latest)
router.get("/:slug", getRecipeBySlug);
router.get("/", getAllRecipes);

export default router;
