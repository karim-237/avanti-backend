import pool from "../config/db.js";

export const getDiscountSections = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT image_path, title, description, button_text, button_url
       FROM discount_sections
       WHERE active = true
       ORDER BY position`
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
