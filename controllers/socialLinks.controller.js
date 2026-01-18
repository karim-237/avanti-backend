import pool from "../config/db.js";

export const getSocialLinks = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT id, platform, icon, url
       FROM social_links
       WHERE active = true
       ORDER BY id`
    );

    res.json(result.rows);
  } catch (error) {
    console.error("❌ DB ERROR in getSocialLinks:", error);
    res.status(500).json({ error: error.message });
  }
};
