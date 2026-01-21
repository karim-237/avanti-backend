import pool from "../config/db.js";

/* =====================================
   Recherche spécifique aux blogs
   GET /api/search/blogs?q=...
===================================== */
export const searchBlogs = async (req, res) => {
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
        single_image_xl AS image
      FROM blogs
      WHERE title ILIKE $1
      LIMIT 10
    `;

    const { rows } = await pool.query(query, [`%${q}%`]);

    res.status(200).json({
      success: true,
      data: rows
    });
  } catch (error) {
    console.error("Search blogs error:", error);
    res.status(500).json({
      success: false,
      message: "Erreur lors de la recherche des blogs"
    });
  }
};
