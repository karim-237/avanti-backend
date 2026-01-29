import pool from "../config/db.js";

/**
 * 🇫🇷 Blog categories
 */
export const getCategories = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT id, name, slug FROM blog_categories ORDER BY id LIMIT 6"
    );

    res.json({
      success: true,
      data: result.rows
    });
  } catch (err) {
    console.error("Get categories error:", err);
    res.status(500).json({
      success: false,
      message: "Erreur serveur"
    });
  }
};

/**
 * 🇬🇧 Blog categories (translations)
 */
export const getCategoriesEn = async (req, res) => {
  try {
    const result = await pool.query(
      `
      SELECT 
        id,
        category_id,
        name,
        slug
      FROM blog_category_translations
      WHERE lang = 'en'
      ORDER BY id
      LIMIT 6
      `
    );

    res.json({
      success: true,
      data: result.rows
    });
  } catch (err) {
    console.error("Get categories EN error:", err);
    res.status(500).json({
      success: false,
      message: "Error fetching categories"
    });
  }
};
