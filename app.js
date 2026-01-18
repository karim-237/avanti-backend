import express from "express";
import cors from "cors";

import siteSettingsRoutes from "./routes/siteSettings.routes.js";
import contactsRoutes from "./routes/contacts.routes.js";
import homeBannersRoutes from "./routes/homeBanners.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/site-settings", siteSettingsRoutes);
app.use("/api/contacts", contactsRoutes);
app.use("/api/home-banners", homeBannersRoutes);

export default app;
