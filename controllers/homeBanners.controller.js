import pool from "../config/db.js";

export const getHomeBanners = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM home_banners WHERE active=true ORDER BY position"
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
