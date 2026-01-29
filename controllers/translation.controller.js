import pool from "../config/db.js";

export const getTranslatedSlug = async (req, res) => {
  const { slug, type, targetLang } = req.query;

  // Mapping exhaustif : Parent (FR) vs Traduction (EN)
  const mapping = {
    // Contenus
    'blog': { parent: "blogs", trans: "blog_translations", id: "blog_id" },
    'recipe': { parent: "recipes", trans: "recipe_translations", id: "recipe_id" },
    'product': { parent: "products", trans: "product_translations", id: "product_id" },
    // Catégories
    'blog_cat': { parent: "blog_categories", trans: "blog_category_translations", id: "category_id" },
    'recipe_cat': { parent: "recipe_categories", trans: "recipe_category_translations", id: "category_id" },
    'product_cat': { parent: "product_categories", trans: "product_category_translations", id: "category_id" },
    // Tags
    'tag': { parent: "tags", trans: "tag_translations", id: "tag_id" }
  };

  const conf = mapping[type];
  if (!conf) return res.status(400).json({ error: "Type invalide" });

  try {
    let finalSlug = null;

    if (targetLang === 'en') {
      // 🇫🇷 -> 🇬🇧 : On cherche dans la table de traduction
      const sql = `
        SELECT trans.slug 
        FROM ${conf.trans} trans
        JOIN ${conf.parent} p ON trans.${conf.id} = p.id
        WHERE p.slug = $1 AND trans.lang = 'en'
      `;
      const result = await pool.query(sql, [slug]);
      finalSlug = result.rows[0]?.slug;

    } else {
      // 🇬🇧 -> 🇫🇷 : On cherche dans la table parente
      const sql = `
        SELECT p.slug 
        FROM ${conf.parent} p
        JOIN ${conf.trans} trans ON trans.${conf.id} = p.id
        WHERE trans.slug = $1 AND trans.lang = 'en'
      `;
      const result = await pool.query(sql, [slug]);
      finalSlug = result.rows[0]?.slug;
    }

    // On renvoie le slug trouvé, ou le slug d'origine si aucun match (évite les liens cassés)
    res.json({ translatedSlug: finalSlug || slug });

  } catch (error) {
    console.error("Translation Error:", error.message);
    res.status(500).json({ error: error.message });
  }
};

