import express from "express";
import { searchBlogs } from "../controllers/searchBlogs.controller.js";

const router = express.Router();

router.get("/", searchBlogs); // /api/search/blogs

export default router;
