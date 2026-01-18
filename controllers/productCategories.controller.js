import pool from "../config/db.js";

export const getProductCategories = async (req, res) => {
  try {
    const { limit = 5 } = req.query;

    const result = await pool.query(
      `
      SELECT id, name, slug
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
