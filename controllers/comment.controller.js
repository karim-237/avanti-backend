import pool from "../config/db.js";

// =======================================================
// ➕ Ajouter un commentaire à un blog
// =======================================================
export const addBlogComment = async (req, res) => {
  try {
    const { blog_id, author_name, email, message } = req.body;

    if (!blog_id || !author_name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "Champs requis manquants"
      });
    }

    const { rows } = await pool.query(
      `
      INSERT INTO comments (blog_id, author_name, email, message)
      VALUES ($1, $2, $3, $4)
      RETURNING id, blog_id, author_name, email, message, created_at
      `,
      [blog_id, author_name, email, message]
    );

    res.status(201).json({
      success: true,
      message: "Commentaire ajouté avec succès",
      data: rows[0]
    });

  } catch (error) {
    console.error("Add blog comment error:", error);
    res.status(500).json({
      success: false,
      message: "Erreur lors de l'ajout du commentaire"
    });
  }
};


// =======================================================
// 📥 Récupérer les commentaires d’un blog + compteur
// =======================================================
export const getBlogComments = async (req, res) => {
  try {
    const { blogId } = req.params;

    if (!blogId) {
      return res.status(400).json({
        success: false,
        message: "blogId manquant"
      });
    }

    const { rows: comments } = await pool.query(
      `
      SELECT id, author_name, email, message, created_at
      FROM comments
      WHERE blog_id = $1
      ORDER BY created_at ASC
      `,
      [blogId]
    );

    const { rows: countRows } = await pool.query(
      `
      SELECT COUNT(*)::int AS total
      FROM comments
      WHERE blog_id = $1
      `,
      [blogId]
    );

    res.status(200).json({
      success: true,
      data: {
        total: countRows[0].total,
        comments
      }
    });

  } catch (error) {
    console.error("Get blog comments error:", error);
    res.status(500).json({
      success: false,
      message: "Erreur lors de la récupération des commentaires"
    });
  }
};
