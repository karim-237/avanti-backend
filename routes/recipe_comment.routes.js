import express from "express";
import {
  addRecipeComment,
  getRecipeComments
} from "../controllers/recipe_comment.controller.js";

const router = express.Router();

// Récupérer les commentaires d’un blog
router.get("/recipe/:recipeId", addRecipeComment);

// Ajouter un commentaire à un blog
router.post("/recipe", getRecipeComments);

export default router;
