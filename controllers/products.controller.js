import pool from "../config/db.js";

export const getProducts = async (req, res) => {
  try {
    const { category, limit = 6 } = req.query;

    let query = `
      SELECT 
        p.id,
        p.name,
        p.slug,
        p.description,
        p.image_path,
        c.slug AS category_slug
      FROM products p
      JOIN product_categories c ON c.id = p.category_id
      WHERE p.active = true 
    `;

    const params = [];

    // Filtre par catégorie (slug)
    if (category) {
      params.push(category);
      query += ` AND c.slug = $${params.length}`;
    }

    // Limite
    params.push(limit);
    query += ` ORDER BY p.id ASC LIMIT $${params.length}`;

    const result = await pool.query(query, params);

    res.status(200).json({
      success: true,
      data: result.rows
    });
  } catch (error) {
    console.error("Get products error:", error);
    res.status(500).json({
      success: false,
      message: "Erreur lors de la récupération des produits"
    });
  }
};


// Récupérer un produit via son slug avec toutes les images
export const getProductsBySlug = async (req, res) => {
  try {
    const { slug } = req.query;

    if (!slug) {
      return res.status(400).json({
        success: false,
        message: "Le paramètre 'slug' est requis"
      });
    }

    const query = `
      SELECT 
        p.id,
        p.name,
        p.slug,
        p.description,
        p.image_path,
        p.image_2,
        p.image_3,
        p.image_4,
        c.slug AS category_slug
      FROM products p
      JOIN product_categories c ON c.id = p.category_id
      WHERE p.active = true AND p.slug = $1
    `;

    const result = await pool.query(query, [slug]);

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Produit non trouvé"
      });
    }

    res.status(200).json({
      success: true,
      data: result.rows
    });
  } catch (error) {
    console.error("Get product by slug error:", error);
    res.status(500).json({
      success: false,
      message: "Erreur lors de la récupération du produit"
    });
  }
};


// 🇬🇧 Get products (EN)
export const getProductsEn = async (req, res) => {
  try {
    const { category, limit = 6 } = req.query;

    let query = `
      SELECT 
        pt.id,
        pt.product_id,
        pt.name,
        pt.slug,
        pt.description,
        p.image_path,
        c.slug AS category_slug
      FROM product_translations pt
      JOIN products p ON p.id = pt.product_id
      JOIN product_categories c ON c.id = p.category_id
      WHERE p.active = true
        AND pt.lang = 'en'
    `;

    const params = [];

    // Filtre catégorie (slug traduit)
    if (category) {
      params.push(category);
      query += ` AND c.slug = $${params.length}`;
    }

    params.push(limit);
    query += ` ORDER BY p.id ASC LIMIT $${params.length}`;

    const result = await pool.query(query, params);

    res.status(200).json({
      success: true,
      data: result.rows
    });
  } catch (error) {
    console.error("Get products EN error:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching products"
    });
  }
};


// 🇬🇧 Get product by slug (EN)
export const getProductsBySlugEn = async (req, res) => {
  try {
    const { slug } = req.query;

    if (!slug) {
      return res.status(400).json({
        success: false,
        message: "The 'slug' parameter is required"
      });
    }

    const query = `
      SELECT 
        pt.id,
        pt.product_id,
        pt.name,
        pt.slug,
        pt.description,
        p.image_path,
        p.image_2,
        p.image_3,
        p.image_4,
        c.slug AS category_slug
      FROM product_translations pt
      JOIN products p ON p.id = pt.product_id
      JOIN product_categories c ON c.id = p.category_id
      WHERE p.active = true
        AND pt.slug = $1
        AND pt.lang = 'en'
    `;

    const result = await pool.query(query, [slug]);

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }

    res.status(200).json({
      success: true,
      data: result.rows
    });
  } catch (error) {
    console.error("Get product by slug EN error:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching product"
    });
  }
};
