import pool from "../config/db.js";

// =======================================================
// ➕ Ajouter un commentaire à un blog
// =======================================================
export const addRecipeComment = async (req, res) => {
  try {
    const { recipe_id, name, email, comment  } = req.body;

    if (!recipe_id || !name || !email || !comment ) {
      return res.status(400).json({
        success: false,
        comment : "Champs requis manquants"
      });
    }

    const { rows } = await pool.query(
      `
      INSERT INTO recipe_comments (recipe_id, name, email, comment )
      VALUES ($1, $2, $3, $4)
      RETURNING id, recipe_id, name, email, comment , created_at
      `,
      [recipe_id, name, email, comment ]
    );

    res.status(201).json({
      success: true,
      comment : "Commentaire ajouté avec succès",
      data: rows[0]
    });

  } catch (error) {
    console.error("Add recipe comment error:", error);
    res.status(500).json({
      success: false,
      comment : "Erreur lors de l'ajout du commentaire"
    });
  }
};


// =======================================================
// 📥 Récupérer les commentaires d’un blog + compteur
// =======================================================
export const getRecipeComments = async (req, res) => {
  try {
    const { recipeId } = req.params;

    if (!recipeId) {
      return res.status(400).json({
        success: false,
        message: "recipeId manquant"
      });
    }

    const { rows: comments } = await pool.query(
      `
      SELECT id, name, email, comment , created_at
      FROM recipe_comments
      WHERE recipe_id = $1
      ORDER BY created_at ASC
      `,
      [recipeId]
    );

    const { rows: countRows } = await pool.query(
      `
      SELECT COUNT(*)::int AS total
      FROM recipe_comments
      WHERE recipe_id = $1
      `,
      [recipeId]
    );

    res.status(200).json({
      success: true,
      data: {
        total: countRows[0].total,
        comments
      }
    });

  } catch (error) {
    console.error("Get recipe comments error:", error);
    res.status(500).json({
      success: false,
      comment : "Erreur lors de la récupération des commentaires"
    });
  }
};
