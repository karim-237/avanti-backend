// controllers/contactController.js
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

// =======================================================
// 📩 Envoyer message de contact par email
// =======================================================
export const sendContactMessage = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "Nom, email et message sont requis"
      });
    }

    // 🔐 Vérification de la configuration Gmail
    if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
      console.error("❌ Gmail non configuré correctement. Vérifie GMAIL_USER et GMAIL_APP_PASSWORD dans le .env");
      return res.status(500).json({
        success: false,
        message: "Erreur de configuration du serveur mail"
      });
    } else(console.log(process.env.GMAIL_USER, process.env.GMAIL_APP_PASSWORD))

    // 🔐 Transport Gmail
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // Utilisez true pour le port 465
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    // Test de connexion SMTP avant envoi
    await transporter.verify().catch(err => {
      console.error("❌ Erreur de connexion SMTP :", err);
      throw new Error("Impossible de se connecter au serveur SMTP. Vérifie ton mot de passe Gmail d’application.");
    });

    const mailOptions = {
      from: `"Formulaire Contact AVANTI" <${process.env.GMAIL_USER}>`,
      to: "karimduval20@gmail.com", // 🎯 destination finale
      replyTo: email,
      subject: subject || "Nouveau message depuis le site AVANTI",
      html: `
        <h2>Nouveau message de contact</h2>
        <p><strong>Nom :</strong> ${name}</p>
        <p><strong>Email :</strong> ${email}</p>
        <p><strong>Sujet :</strong> ${subject || "(non renseigné)"}</p>
        <hr />
        <p>${message.replace(/\n/g, "<br>")}</p>
      `
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({
      success: true,
      message: "Message envoyé avec succès 📩"
    });

  } catch (error) {
    console.error("❌ Contact email error:", error.message);

    res.status(500).json({
      success: false,
      message: `Erreur lors de l’envoi du message : ${error.message}`
    });
  }
};
