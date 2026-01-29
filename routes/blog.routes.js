import express from "express";
import {
  getAllBlogs,
  getBlogBySlug,
  getLatestBlogs,
  getAllBlogsEn,
  getBlogBySlugEn,
  getLatestBlogsEn
} from "../controllers/blog.controller.js";

const router = express.Router();

// 1. Routes statiques / spécifiques d'abord
router.get("/latest", getLatestBlogs);
router.get("/en", getAllBlogsEn);
router.get("/en/latest", getLatestBlogsEn);

// 2. Routes avec paramètres dynamiques ensuite
router.get("/en/:slug", getBlogBySlugEn);
router.get("/:slug", getBlogBySlug);

// 3. La racine en dernier (ou avant les slugs)
router.get("/", getAllBlogs);

export default router;
