import { log } from "console";
import express from "express";
import dotenv from "dotenv";
import setupMiddlewares from "./main/config/middlewares";
import { articleController } from "./DI/article-container";

dotenv.config();

const app = express();
setupMiddlewares(app);

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Hello to articlo backend app!!!");
});

app.get("/article", (req, res) => {
  articleController.getArticle(req, res);
});

app.listen(PORT, () => {
  log(`Server running at http://localhost:${PORT}`);
});
