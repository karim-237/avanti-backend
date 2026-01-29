import pool from "../config/db.js";

export const getTranslatedSlug = async (req, res) => {
  const { slug, type, targetLang } = req.query;

  if (!slug || !type || !targetLang) {
    return res.status(400).json({ error: "Paramètres manquants" });
  }

  let tableName = "";
  let idColumn = "";

  // Mappage complet des types possibles
  const mapping = {
    // Détails
    'blog': { table: "blog_translations", id: "blog_id" },
    'recipe': { table: "recipe_translations", id: "recipe_id" },
    'product': { table: "product_translations", id: "product_id" },
    // Filtres / Catégories
    'blog_cat': { table: "blog_category_translations", id: "category_id" },
    'recipe_cat': { table: "recipe_category_translations", id: "category_id" },
    'product_cat': { table: "product_category_translations", id: "category_id" },
    // Tags
    'tag': { table: "tag_translations", id: "tag_id" }
  };

  const config = mapping[type];

  if (!config) {
    return res.status(400).json({ error: "Type de contenu invalide" });
  }

  try {
    const sql = `
      SELECT t2.slug 
      FROM ${config.table} t1
      JOIN ${config.table} t2 ON t1.${config.id} = t2.${config.id}
      WHERE t1.slug = $1 
      AND t2.lang = $2
    `;

    const result = await pool.query(sql, [slug, targetLang]);

    if (result.rows.length > 0) {
      res.json({ translatedSlug: result.rows[0].slug });
    } else {
      // Si on ne trouve pas de traduction, on renvoie le slug original par sécurité
      res.json({ translatedSlug: slug });
    }
  } catch (error) {
    console.error("Translation Error:", error);
    res.status(500).json({ error: error.message });
  }
};
