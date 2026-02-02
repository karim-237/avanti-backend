import pool from "../config/db.js";

// =======================================================
// 📺 Récupérer la section newsletter (dont la vidéo)
// =======================================================
export const getNewsletterSection = async (req, res) => {
  try {
    const { rows } = await pool.query(`
      SELECT 
        id,
        title,
        subtitle,
        video
      FROM newsletter_section
      LIMIT 1
    `);

    if (!rows.length) {
      return res.status(404).json({
        success: false,
        message: "Aucune section newsletter trouvée"
      });
    }

    const section = rows[0];

    res.json({
      success: true,
      data: {
        title: section.title || null,
        subtitle: section.subtitle || null,
        video_url: section.video || null
      }
    });

  } catch (error) {
    console.error("getNewsletterSection error:", error);
    res.status(500).json({
      success: false,
      message: "Erreur lors de la récupération de la section newsletter"
    });
  }
};
