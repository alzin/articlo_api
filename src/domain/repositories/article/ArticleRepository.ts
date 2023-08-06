import { Article } from "../../entities/Article";

export interface ArticleRepository {
  createArticle(prompt: string): Promise<Article>;
  createImage(prompt: string): Promise<string>;
}
