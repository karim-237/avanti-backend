import pool from "../config/db.js";

/* ===============================
   Récupérer toutes les recettes
   =============================== */
export const getAllRecipes = async (req, res) => {
  try {
    const { category, tag } = req.query; // on récupère les filtres
    const params = [];
    let whereClauses = [`status = 'published'`];

    // Filtre par catégorie
    if (category) {
      whereClauses.push(`category_id = (
        SELECT id FROM recipe_categories WHERE slug = $${params.length + 1} AND is_active = true
      )`);
      params.push(category);
    }

    // Filtre par tag
    if (tag) {
      whereClauses.push(`id IN (
        SELECT recipe_id FROM recipes_post_tags rt
        INNER JOIN tags t ON t.id = rt.tag_id
        WHERE t.slug = $${params.length + 1}
      )`);
      params.push(tag);
    }

    const query = `
      SELECT
        id,
        title,
        slug,
        short_description,
        image,
        image_url,
        created_at
      FROM recipes
      WHERE ${whereClauses.join(' AND ')}
      ORDER BY created_at DESC
    `;

    const { rows } = await pool.query(query, params);

    res.status(200).json({
      success: true,
      data: rows
    });
  } catch (error) {
    console.error("Get all recipes error:", error);
    res.status(500).json({
      success: false,
      message: "Erreur lors de la récupération des recettes"
    });
  }
};



/* ===============================
   Récupérer une recette par slug
   =============================== */
export const getRecipeBySlug = async (req, res) => {
  const { slug } = req.params;

  try {
    // 1️⃣ Recette principale
    const recipeResult = await pool.query(
      `
      SELECT
        id,
        title,
        slug,
        short_description,
        paragraph_1,
        paragraph_2,
        content,
        image,
        created_at
      FROM recipes
      WHERE slug = $1 AND status = 'published'
      `,
      [slug]
    );

    if (recipeResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Recette non trouvée"
      });
    }

    const recipe = recipeResult.rows[0];

    // 2️⃣ Tags associés à la recette
    const { rows: tags } = await pool.query(
      `
      SELECT t.id, t.name, t.slug
      FROM tags t
      INNER JOIN recipes_post_tags rt ON rt.tag_id = t.id
      WHERE rt.recipe_id = $1
      ORDER BY t.name ASC
      `,
      [recipe.id]
    );

    // 3️⃣ Commentaires
    const { rows: comments } = await pool.query(
      `
      SELECT
        id,
        name,
        email,
        comment,
        created_at
      FROM recipe_comments
      WHERE recipe_id = $1 AND status = 'approved'
      ORDER BY created_at ASC
      `,
      [recipe.id]
    );

    // 4️⃣ Autres recettes
    const { rows: related } = await pool.query(
      `
      SELECT id, title, slug, image
      FROM recipes
      WHERE status = 'published' AND id != $1
      ORDER BY created_at DESC
      LIMIT 4
      `,
      [recipe.id]
    );

    res.status(200).json({
      success: true,
      data: {
        recipe,
        tags,       // 👈 ajouté ici
        comments,
        related
      }
    });

  } catch (error) {
    console.error("Get recipe by slug error:", error);
    res.status(500).json({
      success: false,
      message: "Erreur lors de la récupération de la recette"
    });
  }
};


// Récupérer toutes les catégories de recettes
export const getRecipeCategories = async (req, res) => {
  try {
    const { limit = 5 } = req.query;

    const result = await pool.query(
      `
      SELECT id, name, slug
      FROM recipe_categories
      WHERE is_active = true
      ORDER BY id ASC
      LIMIT $1
      `,
      [limit]
    );

    res.status(200).json({
      success: true,
      data: result.rows
    });
  } catch (error) {
    console.error("Get recipe categories error:", error);
    res.status(500).json({
      success: false,
      message: "Erreur lors de la récupération des catégories de recettes"
    });
  }
};


// controllers/recipe.controller.js

// Récupérer toutes les recettes d'une catégorie via le slug
export const getRecipesByCategory = async (req, res) => {
  try {
    const { slug } = req.params;

    // Vérifie si la catégorie existe
    const categoryResult = await pool.query(
      `
      SELECT id, name
      FROM recipe_categories
      WHERE slug = $1 AND is_active = true
      `,
      [slug]
    );

    if (categoryResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Catégorie introuvable"
      });
    }

    const categoryId = categoryResult.rows[0].id;

    // Récupère les recettes de cette catégorie
    const recipesResult = await pool.query(
      `
      SELECT id, title, slug, short_description, image_url, created_at
      FROM recipes
      WHERE category_id = $1 AND is_active = true
      ORDER BY created_at DESC
      `,
      [categoryId]
    );

    res.status(200).json({
      success: true,
      data: {
        category: categoryResult.rows[0],
        recipes: recipesResult.rows
      }
    });
  } catch (error) {
    console.error("Get recipes by category error:", error);
    res.status(500).json({
      success: false,
      message: "Erreur lors de la récupération des recettes par catégorie"
    });
  }
};


// Récupérer les 5 dernières recettes publiées
export const getLatestRecipes = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 5;

    const { rows } = await pool.query(
      `
      SELECT id, title, slug, short_description, image, image_url, created_at
      FROM recipes
      WHERE status = 'published'
      ORDER BY created_at DESC
      LIMIT $1
      `,
      [limit]
    );

    res.status(200).json({
      success: true,
      data: rows
    });
  } catch (error) {
    console.error("Get latest recipes error:", error);
    res.status(500).json({
      success: false,
      message: "Erreur lors de la récupération des dernières recettes"
    });
  }
};
