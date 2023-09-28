import { ArticleEntity } from "../../../domain/entities/ArticleEntity";
import { ArticleRepository } from "../../../domain/repositories/article/ArticleRepository";

export class GetAllArticlesUseCase {
  constructor(private readonly articleRepository: ArticleRepository) {}

  async execute(userId: number): Promise<ArticleEntity[]> {
    const articles = await this.articleRepository.getArticlesByUserId(userId);
    return articles;
  }
}
