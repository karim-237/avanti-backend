import express from "express";
import {
  addRecipeComment,
  getRecipeComments
} from "../controllers/recipe_comment.controller.js";

const router = express.Router();

// Récupérer les commentaires d’une recette
router.get("/recipe/:recipeId", getRecipeComments);

// Ajouter un commentaire à une recette
router.post("/recipe", addRecipeComment);

export default router;
