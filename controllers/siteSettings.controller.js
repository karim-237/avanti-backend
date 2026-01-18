import pool from "../config/db.js";
import cloudinary from "../config/cloudinary.js";
import fs from "fs";

export const getSiteSettings = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM site_settings LIMIT 1");
    if (!result.rows[0]) {
      return res.status(404).json({ message: "No site settings found" });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error("❌ DB ERROR in getSiteSettings:", error); // log complet
    res.status(500).json({
      error: error.message || "Unknown database error",
      stack: error.stack // montre la stack pour debug
    });
  }
};

export const updateSiteSettings = async (req, res) => {
  const { site_name, site_description, maintenance_mode, maintenance_message } = req.body;

  try {
    const result = await pool.query(
      `UPDATE site_settings
       SET site_name=$1, site_description=$2,
           maintenance_mode=$3, maintenance_message=$4,
           updated_at=NOW()
       WHERE id=1`,
      [site_name, site_description, maintenance_mode, maintenance_message]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "No site settings to update" });
    }

    res.json({ message: "Site settings updated successfully" });
  } catch (error) {
    console.error("❌ DB ERROR in updateSiteSettings:", error);
    res.status(500).json({
      error: error.message || "Unknown database error",
      stack: error.stack
    });
  }
};

// Upload logo/favicon
export const uploadLogoOrFavicon = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "No file uploaded" });

    // Upload sur Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "avanti/site_settings"
    });

    // Supprimer le fichier local après upload
    fs.unlinkSync(req.file.path);

    res.json({
      message: "File uploaded successfully",
      url: result.secure_url
    });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ error: error.message });
  }
};


//  Update logo and favicon

export const updateLogoFavicon = async (req, res) => {
  const { logo_path, favicon_path } = req.body;

  try {
    const result = await pool.query(
      `UPDATE site_settings
       SET logo_path=$1, favicon_path=$2
       WHERE id=1`,
      [logo_path, favicon_path]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "No site settings to update" });
    }

    res.json({ message: "Logo & Favicon updated successfully" });
  } catch (error) {
    console.error("❌ DB ERROR in updateLogoFavicon:", error);
    res.status(500).json({ error: error.message });
  }
};
