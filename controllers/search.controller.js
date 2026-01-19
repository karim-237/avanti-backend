import pool from "../config/db.js";

/* =====================================
   Recherche globale (products, blogs, recipes)
   GET /api/search?q=...
===================================== */
export const globalSearch = async (req, res) => {
  const q = req.query.q?.trim();

  // Protection + performance
  if (!q || q.length < 2) {
    return res.status(200).json({
      success: true,
      data: []
    });
  }

  try {
    const query = `
      (
        SELECT
          'product' AS type,
          name AS title,
          slug,
          image_path AS image
        FROM products
        WHERE name ILIKE $1
           OR description ILIKE $1
        LIMIT 5
      )
      UNION ALL
      (
        SELECT
          'blog' AS type,
          title,
          slug,
          NULL AS image
        FROM blogs
        WHERE title ILIKE $1
        LIMIT 5
      )
      UNION ALL
      (
        SELECT
          'recipe' AS type,
          title,
          slug,
          NULL AS image
        FROM recipes
        WHERE title ILIKE $1
        LIMIT 5
      )
    `;

    const { rows } = await pool.query(query, [`%${q}%`]);

    res.status(200).json({
      success: true,
      data: rows
    });
  } catch (error) {
    console.error("Global search error:", error);
    res.status(500).json({
      success: false,
      message: "Erreur lors de la recherche"
    });
  }
};
