import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import socialLinksRoutes from "./routes/socialLinks.routes.js";
import siteSettingsRoutes from "./routes/siteSettings.routes.js";
import homeBannersRoutes from "./routes/homeBanners.routes.js";
import discountSectionsRoutes from "./routes/discountSections.routes.js";
import chooseSectionRoutes from "./routes/chooseSection.routes.js";
import productSectionRoutes from "./routes/productSection.routes.js"
import aboutSectionRoutes from "./routes/about.routes.js";
import blogRoutes from "./routes/blog.routes.js";
import newsletterRoutes from "./routes/newsletter.routes.js";
import footerRoutes from "./routes/footer.routes.js";
import contactMessagesRoutes from './routes/contact_messages.routes.js';
import siteContactRoutes from './routes/site_contact.routes.js'
import tagRoutes from "./routes/tag.routes.js";
import blogCategoryRoutes from './routes/blogCategory.routes.js';
import productCategoriesRoutes from "./routes/productCategories.routes.js";
import recipeRoutes from "./routes/recipes.routes.js";
 
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// Routes API
app.use("/api/site-settings", siteSettingsRoutes);
app.use("/api/social-links", socialLinksRoutes);
app.use("/api/home-banners", homeBannersRoutes);
app.use("/api/discount-sections", discountSectionsRoutes);
app.use("/api/choose-section", chooseSectionRoutes);
app.use("/api/products", productSectionRoutes);
app.use("/api/about", aboutSectionRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/newsletter", newsletterRoutes);
app.use("/api/footer", footerRoutes);
app.use("/api/contact-messages", contactMessagesRoutes);
app.use("/api/site-contact", siteContactRoutes);
app.use("/api/tags", tagRoutes);
app.use('/api/blog-categories', blogCategoryRoutes);
app.use("/api/product-categories", productCategoriesRoutes);
app.use("/api/recipes", recipeRoutes);




// Health

app.get("/health", (req, res) => {
  res.json({
    status: "OK",
    message: "Backend is running 🚀",
    time: new Date()
  });
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Backend running on port ${PORT}`);
});
