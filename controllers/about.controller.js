import pool from "../config/db.js";

/**
 * 🇫🇷 ABOUT - Français
 */
export const getAboutSection = async (req, res) => {
    try {
        const { rows } = await pool.query(
            "SELECT * FROM about_section ORDER BY id DESC LIMIT 1"
        );

        res.status(200).json({
            success: true,
            data: rows[0]
        });
    } catch (error) {
        console.error("About section error:", error);
        res.status(500).json({
            success: false,
            message: "Erreur lors de la récupération de la section À propos"
        });
    }
};

/**
 * 🇬🇧 ABOUT - English (translations)
 */
export const getAboutSectionEn = async (req, res) => {
    try {
        const { rows } = await pool.query(
            `
            SELECT *
            FROM about_section_translations
            WHERE lang = 'en'
            ORDER BY id DESC
            LIMIT 1
            `
        );

        res.status(200).json({
            success: true,
            data: rows[0]
        });
    } catch (error) {
        console.error("About section EN error:", error);
        res.status(500).json({
            success: false,
            message: "Error while fetching About section"
        });
    }
};
