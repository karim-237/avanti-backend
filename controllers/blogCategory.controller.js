import pool from "../config/db.js";

export const getCategories = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT id, name, slug FROM blog_categories ORDER BY id LIMIT 6"
    );
    res.json({ success: true, data: result.rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Erreur serveur" });
  }
};
