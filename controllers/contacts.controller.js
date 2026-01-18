import pool from "../config/db.js";

export const getContacts = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM site_contacts ORDER BY id"
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
