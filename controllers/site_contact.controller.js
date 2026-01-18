// controllers/site_contact.controller.js
import db from "../config/db.js";

export const getSiteContactInfo = async (req, res) => {
  try {
    const { rows } = await db.query(`
      SELECT
        address_text,
        address_url,
        phone_numbers,
        emails,
        map_url
      FROM site_contact_info
      ORDER BY id DESC
      LIMIT 1
    `);

    if (!rows.length) {
      return res.json({ success: false, data: null });
    }

    res.json({
      success: true,
      data: rows[0],
    });
  } catch (err) {
    console.error("Contact info error:", err);
    res.status(500).json({ success: false });
  }
};
