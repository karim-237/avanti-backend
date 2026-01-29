import pool from "../config/db.js";

/**
 * 🇫🇷 Product categories
 */
export const getProductCategories = async (req, res) => {
  try {
    const { limit = 5 } = req.query;

    const result = await pool.query(
      `
      SELECT id, name, slug, image_path
      FROM product_categories
      WHERE is_active = true
      ORDER BY id ASC
      LIMIT $1
      `,
      [limit]
    );

    res.status(200).json({
      success: true,
      data: result.rows
    });
  } catch (error) {
    console.error("Get product categories error:", error);
    res.status(500).json({
      success: false,
      message: "Erreur lors de la récupération des catégories produits"
    });
  }
};

/**
 * 🇬🇧 Product categories (translations)
 */
export const getProductCategoriesEn = async (req, res) => {
  try {
    const { limit = 5 } = req.query;

    const result = await pool.query(
      `
      SELECT
        pct.id,
        pct.category_id,
        pct.name,
        pct.slug,
        pc.image_path
      FROM product_category_translations pct
      JOIN product_categories pc ON pc.id = pct.category_id
      WHERE pc.is_active = true
        AND pct.lang = 'en'
      ORDER BY pc.id ASC
      LIMIT $1
      `,
      [limit]
    );

    res.status(200).json({
      success: true,
      data: result.rows
    });
  } catch (error) {
    console.error("Get product categories EN error:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching product categories"
    });
  }
};
