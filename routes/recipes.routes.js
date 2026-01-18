import express from "express";
import {
  getAllRecipes,
  getRecipeBySlug,
  getRecipeCategories,
  getRecipesByCategory
} from "../controllers/recipes.controller.js";

const router = express.Router();

// Récupérer les catégories
router.get("/recipe-categories", getRecipeCategories);

// Récupérer les recettes par catégorie (slug)
router.get("/category/:slug", getRecipesByCategory);  // j'ai retiré "recipes" car c'est déjà sous "/api/recipes"

// Liste des recettes
router.get("/", getAllRecipes);

// Détail d'une recette
router.get("/:slug", getRecipeBySlug);


export default router;
