import express from "express";
import {
  addBlogComment,
  getBlogComments
} from "../controllers/comment.controller.js";

const router = express.Router();

// Récupérer les commentaires d’un blog
router.get("/blog/:blogId", getBlogComments);

// Ajouter un commentaire à un blog
router.post("/blog", addBlogComment);

export default router;
