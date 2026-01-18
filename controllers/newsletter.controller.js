import pool from "../config/db.js";

export const addNewsletterEmail = async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ success: false, message: "L'email est requis" });
    }

    try {
        const query = `
            INSERT INTO newsletter_emails (email)
            VALUES ($1)
            RETURNING *
        `;
        const { rows } = await pool.query(query, [email]);

        res.status(201).json({
            success: true,
            message: "Email ajouté avec succès",
            data: rows[0]
        });
    } catch (error) {
        console.error("Erreur ajout email newsletter :", error);
        if (error.code === "23505") { // doublon
            return res.status(400).json({ success: false, message: "Cet email est déjà inscrit" });
        }
        res.status(500).json({ success: false, message: "Erreur serveur" });
    }
};


// Récupérer les infos de la section newsletter (GET)
export const getNewsletterSection = async (req, res) => {
    try {
        const { rows } = await pool.query(
            "SELECT * FROM newsletter_section ORDER BY id DESC LIMIT 1"
        );

        res.status(200).json({
            success: true,
            data: rows[0] || {}
        });
    } catch (error) {
        console.error("Erreur récupération section newsletter :", error);
        res.status(500).json({ success: false, message: "Erreur serveur" });
    }
};