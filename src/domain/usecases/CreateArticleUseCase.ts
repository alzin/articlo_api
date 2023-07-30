import { ArticleRepository } from "../interfaces/ArticleRepository";
import { Article } from "../entities/Article";

export class CreateArticleUseCase {
  constructor(private articleRepository: ArticleRepository) {}

  async execute(prompt: string): Promise<Article> {
    return await this.articleRepository.createArticle(prompt);
  }
}
