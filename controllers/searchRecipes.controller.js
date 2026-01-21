import pool from "../config/db.js";

/* =====================================
   Recherche spécifique aux recettes
   GET /api/search/recipes?q=...
===================================== */
export const searchRecipes = async (req, res) => {
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
      SELECT
        title,
        slug,
        image
      FROM recipes
      WHERE title ILIKE $1
      ORDER BY created_at DESC
      LIMIT 10
    `;

    const { rows } = await pool.query(query, [`%${q}%`]);

    res.status(200).json({
      success: true,
      data: rows
    });
  } catch (error) {
    console.error("Search recipes error:", error);
    res.status(500).json({
      success: false,
      message: "Erreur lors de la recherche des recettes"
    });
  }
};
