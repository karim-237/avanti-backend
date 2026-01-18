import pool from "../config/db.js";

export const getChooseSection = async (req, res) => {
  try {
    const section = await pool.query(
      "SELECT subtitle, title, description FROM choose_section WHERE active = true LIMIT 1"
    );

    const benefits = await pool.query(
      "SELECT title, description FROM choose_benefits WHERE active = true ORDER BY position"
    );

    res.json({
      section: section.rows[0],
      benefits: benefits.rows
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
