import pool from "../config/db.js";

// Récupérer tous les tags
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
