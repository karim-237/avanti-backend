import pool from "../config/db.js";

// 🇫🇷 Tags (déjà existant)
export const getAllTags = async (req, res) => {
  try {
    const { rows } = await pool.query(
      `SELECT id, name, slug
       FROM tags
       ORDER BY name ASC`
    );

    res.status(200).json({
      success: true,
      data: rows
    });
  } catch (error) {
    console.error("Get all tags error:", error);
    res.status(500).json({
      success: false,
      message: "Erreur lors de la récupération des tags"
    });
  }
};

// 🇬🇧 Tags (translations)
export const getAllTagsEn = async (req, res) => {
  try {
    const { rows } = await pool.query(
      `SELECT id, tag_id, name, slug
       FROM tag_translations
       WHERE lang = 'en'
       ORDER BY name ASC`
    ); 

    res.status(200).json({
      success: true,
      data: rows
    });
  } catch (error) {
    console.error("Get all tags EN error:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching tags"
    });
  }
};
