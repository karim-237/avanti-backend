import pool from "../config/db.js";

/**
 * 🇫🇷 Home banners
 */
export const getHomeBanners = async (req, res) => {
  try {
    const result = await pool.query(
      `
      SELECT *
      FROM home_banners
      WHERE active = true
      ORDER BY position
      `
    );

    res.json(result.rows);
  } catch (error) {
    console.error("Get home banners error:", error);
    res.status(500).json({ error: error.message });
  }
};

/**
 * 🇬🇧 Home banners (translations)
 */
export const getHomeBannersEn = async (req, res) => {
  try {
    const result = await pool.query(
      `
      SELECT
        hbt.id,
        hbt.banner_id,
        hbt.title,
        hbt.subtitle,
        hbt.description,
        hb.image_path,
        hb.position,
        hb.active
      FROM home_banner_translations hbt
      JOIN home_banners hb ON hb.id = hbt.banner_id
      WHERE hb.active = true
        AND hbt.lang = 'en'
      ORDER BY hb.position
      `
    );

    res.json(result.rows);
  } catch (error) {
    console.error("Get home banners EN error:", error);
    res.status(500).json({ error: error.message });
  }
};
