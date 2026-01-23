// controllers/contacts.controller.js
import pool from "../config/db.js"; // Assure-toi d'avoir ton pool PostgreSQL configuré

// =======================================================
// 📥 Enregistrer un message de contact dans la DB
// =======================================================
export const sendContactMessage = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // 🔹 Vérification des champs obligatoires
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "Nom, email et message sont requis"
      });
    }

    // 🔹 Insertion dans la table contact_messages
    const query = `
      INSERT INTO contact_messages (name, email, subject, message)
      VALUES ($1, $2, $3, $4)
      RETURNING id, name, email, subject, message, created_at
    `;

    const values = [name, email, subject || "", message];

    const { rows } = await pool.query(query, values);

    res.status(201).json({
      success: true,
      message: "Message enregistré avec succès ✅",
      data: rows[0]
    });

  } catch (error) {
    console.error("❌ Contact DB error:", error);
    res.status(500).json({
      success: false,
      message: "Erreur lors de l’enregistrement du message"
    });
  }
};
