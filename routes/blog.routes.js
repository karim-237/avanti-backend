import express from "express";
import { getAllBlogs, getBlogBySlug, getLatestBlogs  } from "../controllers/blog.controller.js";

const router = express.Router();

router.get("/", getAllBlogs);
router.get("/latest", getLatestBlogs);
router.get("/:slug", getBlogBySlug);

export default router;
