import express from 'express';
import {
  getCategories,
  getCategoriesEn
} from '../controllers/blogCategory.controller.js';

const router = express.Router();

// 🇫🇷
router.get('/', getCategories);

// 🇬🇧
router.get('/en', getCategoriesEn);

export default router;
