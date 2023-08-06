import { ArticleRepository } from "@domain/repositories/article/ArticleRepository";
import { Article } from "@domain/entities/Article";

export class CreateArticleUseCase {
  constructor(private readonly articleRepository: ArticleRepository) {}

  async execute(prompt: string): Promise<Article> {
    const createdArticle = await this.articleRepository.createArticle(prompt);
    return createdArticle;
  }
}
