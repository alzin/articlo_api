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

app.get("/", (_, res) => {
  const today = new Date().toLocaleDateString();
  res.send(`Articlo SERVER is running ${today}`);
});

app.post("/api/login", (req, res) => {
  authController.login(req, res);
});

app.post("/api/signup", (req, res) => {
  log("signup");
  authController.signup(req, res);
});

app.post("/api/article", (req, res) => {
  articleController.getArticle(req, res);
});
