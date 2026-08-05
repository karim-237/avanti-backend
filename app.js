import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import socialLinksRoutes from "./routes/socialLinks.routes.js";
import siteSettingsRoutes from "./routes/siteSettings.routes.js";
import homeBannersRoutes from "./routes/homeBanners.routes.js";
import discountSectionsRoutes from "./routes/discountSections.routes.js";
import chooseSectionRoutes from "./routes/chooseSection.routes.js";
import productSectionRoutes from "./routes/productSection.routes.js";
import aboutSectionRoutes from "./routes/about.routes.js";
import blogRoutes from "./routes/blog.routes.js";
import newsletterRoutes from "./routes/newsletter.routes.js";
import footerRoutes from "./routes/footer.routes.js";
import contactMessagesRoutes from "./routes/contact_messages.routes.js";
import siteContactRoutes from "./routes/site_contact.routes.js";
import tagRoutes from "./routes/tag.routes.js";
import blogCategoryRoutes from "./routes/blogCategory.routes.js";
import productCategoriesRoutes from "./routes/productCategories.routes.js";
import recipeRoutes from "./routes/recipes.routes.js";
import searchRoutes from "./routes/search.routes.js";
import searchBlogsRoutes from "./routes/searchBlogs.routes.js";
import searchRecipesRoutes from "./routes/searchRecipes.routes.js";
import commentRoutes from "./routes/comment.routes.js";
import recipe_commentRoutes from "./routes/recipe_comment.routes.js";
import contactRoutes from "./routes/contacts.routes.js";
import getTranslatedSlug from "./routes/translation.routes.js";
import newsletter_sectionRoutes from "./routes/newsletter_section.routes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// toutes les routes...
app.use("/api/site-settings", siteSettingsRoutes);
app.use("/api/social-links", socialLinksRoutes);
// etc...

app.get("/health", (req, res) => {
  res.json({
    status: "OK",
    message: "Backend is running 🚀",
    time: new Date()
  });
});

export default app;