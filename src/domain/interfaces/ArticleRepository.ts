import { Article } from "../entities/Article";

export interface ArticleRepository {
  createArticle(prompt: String): Promise<Article>;
  createImage(prompt: string): Promise<string>;
}
