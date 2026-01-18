// controllers/contact_messages.controller.js
import db from '../config/db.js'; // instance pg.Pool

export const submitContactMessage = async (req, res) => {
  try {
    const { name, phone, email, message } = req.body;

    if (!name || !phone || !email || !message) {
      return res.status(400).json({ success: false, message: "Tous les champs sont requis" });
    }

    const query = `
      INSERT INTO contact_messages (name, phone, email, message, created_at)
      VALUES ($1, $2, $3, $4, NOW())
    `;

    await db.query(query, [name, phone, email, message]);

    return res.json({ success: true, message: "Merci, votre message a été envoyé avec succès !" });
  } catch (err) {
    console.error("Erreur insertion contact message :", err);
    return res.status(500).json({ success: false, message: "Erreur serveur, veuillez réessayer" });
  }
};
