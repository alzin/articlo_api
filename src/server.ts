import "./main/config/loadEnv";
import { log } from "console";
import express from "express";
import setupMiddlewares from "./main/config/middlewares";
import { articleController } from "./DI/article-container";

const app = express();
setupMiddlewares(app);

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Articlo API server");
});

app.post("/article", (req, res) => {
  articleController.getArticle(req, res);
});

app.listen(PORT, () => {
  log(`Server running at http://localhost:${PORT}`);
});
