import pool from "../config/db.js";

// =======================================================
// ➕ Ajouter un email à la newsletter
// =======================================================
export const addNewsletterEmail = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email requis"
      });
    }

    // Vérifier si l’email existe déjà
    const { rows: existing } = await pool.query(
      `SELECT id FROM newsletter_emails WHERE email = $1`,
      [email]
    );

    if (existing.length > 0) {
      return res.status(409).json({
        success: false,
        message: "Cet email est déjà inscrit à la newsletter"
      });
    }

    const { rows } = await pool.query(
      `
      INSERT INTO newsletter_emails (email)
      VALUES ($1)
      RETURNING id, email, created_at
      `,
      [email]
    );

    res.status(201).json({
      success: true,
      message: "Inscription à la newsletter réussie 🎉",
      data: rows[0]
    });

  } catch (error) {
    console.error("Add newsletter email error:", error);
    res.status(500).json({
      success: false,
      message: "Erreur lors de l’inscription à la newsletter"
    });
  }
};
