import "./main/config/loadEnv";
import { log } from "console";
import express from "express";
import setupMiddlewares from "./main/config/middlewares";
import { articleController, authController } from "./DI/article-container";
import DbConnection from "./infra/DB/helper/db-connection";

const app = express();
setupMiddlewares(app);

const PORT = process.env.PORT || 5000;

DbConnection.connect()
  .then(() => {
    app.listen(PORT, () => {
      log(`Server running at http://localhost:${PORT}`);
    });
  })
  .catch(console.log);

app.get("/", (req, res) => {
  res.send("Articlo API server");
});

app.post("/article", (req, res) => {
  articleController.getArticle(req, res);
});

app.post("/api/login", (req, res) => {
  authController.login(req, res);
});
