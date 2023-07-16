import { Request, Response } from "express";
import Article from "../models/Article";
import User from "../models/User";

class ArticleController {
  public async create(req: Request, res: Response): Promise<void> {
    try {
      const { title, image, body } = req.body;

      const _user = await User.findById("");
      if (!_user) {
        res.status(404).json({ message: "User not found" });
        return;
      }

      const newArticle = new Article({
        article_title: title,
        article_img_url: image,
        article_text: body,
        user: _user._id,
      });

      const savedArticle = await newArticle.save();

      user.articles.push(savedArticle._id);
      await user.save();

      res.status(201).json({
        message: "Article added successfully",
        article: savedArticle,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  public async getBlogs(req: Request, res: Response): Promise<void> {
    try {
      const user = await User.findById(userId).populate("articles");
      if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
      }

      const articles = await Article.find({ _id: { $in: user.articles } });

      const formattedArticles = articles.map((article) => ({
        id: article._id,
        title: article.article_title,
        image: article.article_img_url,
        text: article.article_text,
      }));

      res.json(formattedArticles);
    } catch (error) {
      console.error(error);
      res.status(500).send("Server Error");
    }
  }
}

export default ArticleController;
