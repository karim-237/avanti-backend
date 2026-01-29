import pool from "../config/db.js";

/**
 * 🇫🇷 Choose section
 */
export const getChooseSection = async (req, res) => {
  try {
    const section = await pool.query(
      `
      SELECT subtitle, title, description
      FROM choose_section
      WHERE active = true
      LIMIT 1
      `
    );

    const benefits = await pool.query(
      `
      SELECT title, description
      FROM choose_benefits
      WHERE active = true
      ORDER BY position
      `
    );

    res.json({
      section: section.rows[0],
      benefits: benefits.rows
    });
  } catch (error) {
    console.error("Get choose section error:", error);
    res.status(500).json({ error: error.message });
  }
};

/**
 * 🇬🇧 Choose section (translations)
 */
export const getChooseSectionEn = async (req, res) => {
  try {
    const section = await pool.query(
      `
      SELECT subtitle, title, description
      FROM choose_section_translations
      WHERE active = true
        AND lang = 'en'
      LIMIT 1
      `
    );

    const benefits = await pool.query(
      `
      SELECT title, description
      FROM choose_benefits_translations
      WHERE active = true
        AND lang = 'en'
      ORDER BY position
      `
    );

    res.json({
      section: section.rows[0],
      benefits: benefits.rows
    });
  } catch (error) {
    console.error("Get choose section EN error:", error);
    res.status(500).json({ error: error.message });
  }
};
