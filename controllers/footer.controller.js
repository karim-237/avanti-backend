import pool from "../config/db.js";

// Récupérer les contacts du footer
export const getSiteContacts = async (req, res) => {
    try {
        const { rows } = await pool.query(
            "SELECT * FROM site_contacts ORDER BY id DESC LIMIT 1"
        );
        res.status(200).json({
            success: true,
            data: rows[0] || {}
        });
    } catch (error) {
        console.error("Erreur récupération contacts :", error);
        res.status(500).json({ success: false, message: "Erreur serveur" });
    }
};

// Récupérer les réseaux sociaux actifs
export const getSocialLinks = async (req, res) => {
    try {
        const { rows } = await pool.query(
            "SELECT * FROM social_links WHERE active = TRUE ORDER BY id ASC"
        );
        res.status(200).json({
            success: true,
            data: rows || []
        });
    } catch (error) {
        console.error("Erreur récupération social links :", error);
        res.status(500).json({ success: false, message: "Erreur serveur" });
    }
};
