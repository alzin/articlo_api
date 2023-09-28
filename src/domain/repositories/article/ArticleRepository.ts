import { ArticleEntity } from "../../entities/ArticleEntity";

export interface ArticleRepository {
  createArticle(prompt: string): Promise<ArticleEntity>;
  createImage(prompt: string): Promise<string>;
  saveArticle(userId: number, article: ArticleEntity): Promise<boolean>;
  getArticlesByUserId(userId: number): Promise<ArticleEntity[]>;
}
