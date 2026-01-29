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

// 🇫🇷
router.get("/", getAllBlogs);
router.get("/latest", getLatestBlogs);
router.get("/:slug", getBlogBySlug);

// 🇬🇧
router.get("/en", getAllBlogsEn);
router.get("/en/latest", getLatestBlogsEn);
router.get("/en/:slug", getBlogBySlugEn);

export default router;
