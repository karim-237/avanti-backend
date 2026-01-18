import pool from "../config/db.js";

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
