import "./main/config/loadEnv";
import { log } from "console";
import express, { Request, Response } from "express";
import setupMiddlewares from "./main/config/middlewares";
import { articleController } from "./DI/article/article-container";
import { authController } from "./DI/auth/auth-container";
import DbConnection from "./infra/DB/helper/db-connection";
import { authenticateToken } from "./main/middlewares/auth";

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
  const today = new Date().toLocaleDateString();
  res.send(`Articlo SERVER is running ${today}`);
});

app.get("/api/articles", authenticateToken, (req: Request, res: Response) => {
  articleController.getArticlesByUserId(req, res);
});

app.post("/api/login", (req, res) => {
  authController.login(req, res);
});

app.post("/api/signup", (req, res) => {
  authController.signup(req, res);
});

app.post("/api/article", authenticateToken, (req: Request, res: Response) => {
  articleController.generateArticle(req, res);
});
