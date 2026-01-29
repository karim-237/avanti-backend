import pool from "../config/db.js";

// Récupérer tous les blogs
export const getAllBlogs = async (req, res) => {
  try {
    const { category, tag, featured } = req.query;

    let query = `
      SELECT DISTINCT
        b.id,
        b.title,
        b.short_description,
        b.slug,
        b.image_url,
        b.single_image,
        b.single_image_xl,
        b.author,
        b.publish_date,
        b.featured,                     -- 🔥 on récupère aussi le champ
        c.name  AS category_name,
        c.slug  AS category_slug
      FROM blogs b
      LEFT JOIN blog_categories c ON b.category_id = c.id
      LEFT JOIN blog_tags bt ON bt.blog_id = b.id
      LEFT JOIN tags t ON bt.tag_id = t.id
      WHERE b.status = 'published'
    `;

    const params = [];

    // 🔹 Filtre catégorie
    if (category) {
      params.push(category);
      query += ` AND c.slug = $${params.length}`;
    }

    // 🔹 Filtre tag
    if (tag) {
      params.push(tag);
      query += ` AND t.slug = $${params.length}`;
    }

    // 🔹 Filtre featured
    if (featured !== undefined) {
      const isFeatured =
        featured === 'true' ||
        featured === '1' ||
        featured === true;

      params.push(isFeatured);
      query += ` AND b.featured = $${params.length}`;
    }

    query += ` ORDER BY b.publish_date DESC`;

    const { rows } = await pool.query(query, params);

    res.status(200).json({
      success: true,
      data: rows
    });
  } catch (error) {
    console.error("Get all blogs error:", error);
    res.status(500).json({
      success: false,
      message: "Erreur lors de la récupération des blogs"
    });
  }
};





// Récupérer un blog par slug avec tags, commentaires, auteur, et à la une
export const getBlogBySlug = async (req, res) => {
  let { slug } = req.params;

  try {
    let blogRows;

    if (slug) {
      // Si slug fourni, chercher le blog correspondant
      const result = await pool.query(
        `SELECT b.id, b.title, b.slug, b.short_description, b.full_content, b.image_url,b.single_image,
                b.single_image_xl, b.image_secondary, b.paragraph_1, b.paragraph_2, b.author_bio,
                b.publish_date, b.quote, b.featured,
                a.name AS author_name, a.photo_url AS author_photo, a.position AS author_position
         FROM blogs b
         LEFT JOIN authors a ON b.author_id = a.id
         WHERE b.slug = $1 AND b.status = 'published'`,
        [slug]
      );
      blogRows = result.rows;
    } else {
      // Sinon, prendre le dernier blog publié
      const result = await pool.query(
        `SELECT b.id, b.title, b.slug, b.short_description, b.full_content, b.image_url, b.single_image,
                b.single_image_xl, b.image_secondary, b.paragraph_1, b.paragraph_2, b.author_bio,
                b.publish_date, b.quote, b.featured,
                a.name AS author_name, a.photo_url AS author_photo, a.position AS author_position
         FROM blogs b
         LEFT JOIN authors a ON b.author_id = a.id
         WHERE b.status = 'published'
         ORDER BY b.publish_date DESC
         LIMIT 1`
      );
      blogRows = result.rows;
    }

    if (blogRows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Blog non trouvé"
      });
    }

    const blog = blogRows[0];

    // 2️⃣ Tags associés
    const { rows: tags } = await pool.query(
      `SELECT t.id, t.name, t.slug
       FROM tags t
       JOIN blog_tags bt ON bt.tag_id = t.id
       WHERE bt.blog_id = $1`,
      [blog.id]
    );

    // 3️⃣ Commentaires
    const { rows: comments } = await pool.query(
      `SELECT id, author_name, email, message, created_at
       FROM comments
       WHERE blog_id = $1
       ORDER BY created_at ASC`,
      [blog.id]
    );

    // 4️⃣ Articles à la une (autres que celui-ci)
    const { rows: featured } = await pool.query(
      `SELECT id, title, slug, image_url
       FROM blogs
       WHERE featured = TRUE AND status = 'published' AND id != $1
       ORDER BY publish_date DESC
       LIMIT 4`,
      [blog.id]
    );

    res.status(200).json({
      success: true,
      data: {
        blog,       // contient maintenant image_secondary, paragraph_1..3, author_bio
        tags,
        comments,
        featured
      }
    });

  } catch (error) {
    console.error("Get blog by slug error:", error);
    res.status(500).json({
      success: false,
      message: "Erreur lors de la récupération du blog"
    });
  }
};



// Récupérer les 5 derniers blogs publiés
export const getLatestBlogs = async (req, res) => {
  try {
    const { rows } = await pool.query(
      `
      SELECT 
        id,
        title,
        slug,
        short_description,
        image_url,
        publish_date
      FROM blogs
      WHERE status = 'published'
      ORDER BY publish_date DESC
      LIMIT 5
      `
    );

    res.status(200).json({
      success: true,
      data: rows
    });
  } catch (error) {
    console.error("Get latest blogs error:", error);
    res.status(500).json({
      success: false,
      message: "Erreur lors de la récupération des derniers blogs"
    });
  }
};




// 🇬🇧 Récupérer tous les blogs (EN)
export const getAllBlogsEn = async (req, res) => {
  try {
    const { category, tag, featured } = req.query;

    let query = `
      SELECT DISTINCT
        bt.id,
        bt.title,
        bt.short_description,
        bt.slug,                         -- Slug anglais (depuis bt)
        b.image_url,
        b.publish_date,
        b.featured,
        ct.name AS category_name,        -- Nom anglais
        ct.slug AS category_slug         -- Slug anglais
      FROM blog_translations bt
      INNER JOIN blogs b ON bt.blog_id = b.id
      -- Jointure avec les traductions de catégories
      LEFT JOIN blog_category_translations ct ON b.category_id = ct.category_id AND ct.lang = 'en'
      LEFT JOIN blog_tags btt ON btt.blog_id = b.id
      LEFT JOIN tags t ON btt.tag_id = t.id
      WHERE b.status = 'published'
        AND bt.lang = 'en'
    `;

    const params = [];

    if (category) {
      params.push(category);
      query += ` AND ct.slug = $${params.length}`;
    }

    if (tag) {
      params.push(tag);
      query += ` AND t.slug = $${params.length}`;
    }

    if (featured !== undefined) {
      const isFeatured = (featured === 'true' || featured === '1' || featured === true);
      params.push(isFeatured);
      query += ` AND b.featured = $${params.length}`;
    }

    query += ` ORDER BY b.publish_date DESC`;

    const { rows } = await pool.query(query, params);

    res.status(200).json({
      success: true,
      data: rows
    });
  } catch (error) {
    // Affiche l'erreur précise dans tes logs Render pour le debug
    console.error("Détail de l'erreur SQL :", error.message);
    res.status(500).json({
      success: false,
      message: "Erreur lors de la récupération des blogs (EN)",
      debug: error.message // À retirer en production pour la sécurité
    });
  }
};


//

// 🇬🇧 Récupérer un blog par slug (EN)
export const getBlogBySlugEn = async (req, res) => {
  const { slug } = req.params;

  try {
    // 1️⃣ Récupération du contenu du blog (Traductions + Data structurelle)
    const result = await pool.query(
      `
      SELECT 
        bt.id, 
        bt.blog_id, 
        bt.title, 
        bt.slug, 
        bt.short_description,
        bt.full_content, 
        b.image_url, 
        b.single_image,
        b.single_image_xl, 
        b.image_secondary,
        bt.paragraph_1, 
        bt.paragraph_2, 
        bt.author_bio,
        bt.quote, 
        b.publish_date,    -- Table parente
        b.featured,        -- Table parente
        a.name AS author_name, 
        a.photo_url AS author_photo, 
        a.position AS author_position
      FROM blog_translations bt
      INNER JOIN blogs b ON bt.blog_id = b.id
      LEFT JOIN authors a ON b.author_id = a.id
      WHERE bt.slug = $1 
        AND b.status = 'published'
        AND bt.lang = 'en'
      `,
      [slug]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Blog not found (EN)",
        debug: `No record found for slug: ${slug}`
      });
    }

    const blog = result.rows[0];

    // 2️⃣ Tags associés (Lien via blog_id parent)
    const { rows: tags } = await pool.query(
      `SELECT t.id, t.name, t.slug
       FROM tags t
       JOIN blog_tags bt_tag ON bt_tag.tag_id = t.id
       WHERE bt_tag.blog_id = $1`,
      [blog.blog_id]
    );

    // 3️⃣ Commentaires (Lien via blog_id parent)
    const { rows: comments } = await pool.query(
      `SELECT id, author_name, email, message, created_at
       FROM comments
       WHERE blog_id = $1
       ORDER BY created_at ASC`,
      [blog.blog_id]
    );

    // 4️⃣ Articles à la une (EN)
    const { rows: featured } = await pool.query(
      `SELECT bt.id, bt.title, bt.slug, b.image_url
       FROM blog_translations bt
       INNER JOIN blogs b ON bt.blog_id = b.id
       WHERE b.featured = TRUE 
         AND b.status = 'published' 
         AND bt.lang = 'en'
         AND bt.blog_id != $1
       ORDER BY b.publish_date DESC
       LIMIT 4`,
      [blog.blog_id]
    );

    res.status(200).json({
      success: true,
      data: { blog, tags, comments, featured }
    });

  } catch (error) {
    console.error("Get blog by slug EN error:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching single blog (EN)",
      debug: error.message // 🔥 Ton message d'erreur SQL apparaîtra ici
    });
  }
};


// 🇬🇧 Récupérer les 5 derniers blogs (EN)
export const getLatestBlogsEn = async (req, res) => {
  try {
    const { rows } = await pool.query(
      `
      SELECT 
        id,
        title,
        slug,
        short_description,
        image_url,
        publish_date
      FROM blog_translations
      WHERE status = 'published'
        AND lang = 'en'
      ORDER BY publish_date DESC
      LIMIT 5
      `
    );

    res.status(200).json({
      success: true,
      data: rows 
    });
  } catch (error) {
    console.error("Get latest blogs EN error:", error);
    res.status(500).json({
      success: false,
      message: "Error while fetching latest blogs"
    });
  }
};
