import { ArticleRepository } from "@domain/repositories/article/ArticleRepository";
import { ArticleEntity } from "@domain/entities/ArticleEntity";

export class CreateArticleUseCase {
  constructor(private readonly articleRepository: ArticleRepository) {}

  async execute(prompt: string): Promise<ArticleEntity> {
    const createdArticle = await this.articleRepository.createArticle(prompt);
    return createdArticle;
  }
}
