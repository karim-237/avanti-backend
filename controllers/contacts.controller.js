// controllers/contactController.js
import nodemailer from "nodemailer";

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

    // 🔐 Transport Gmail
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER, // ex: avanticameroun@gmail.com
        pass: process.env.GMAIL_APP_PASSWORD // mot de passe d'application
      }
    });

    const mailOptions = {
      from: `"Formulaire Contact AVANTI" <${process.env.GMAIL_USER}>`,
      to: "avanticameroun@gmail.com", // 🎯 destination finale
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
    console.error("❌ Contact email error:", error);

    res.status(500).json({
      success: false,
      message: "Erreur lors de l’envoi du message"
    });
  }
};
