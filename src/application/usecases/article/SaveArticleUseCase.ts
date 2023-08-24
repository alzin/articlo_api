import { ArticleEntity } from "@domain/entities/ArticleEntity";
import { ArticleRepository } from "@domain/repositories/article/ArticleRepository";

export class SaveArticleUseCase {
  constructor(private readonly articleRepository: ArticleRepository) {}

  async execute(userId: number, article: ArticleEntity): Promise<boolean> {
    const savedArticle = await this.articleRepository.saveArticle(
      userId,
      article,
    );
    return savedArticle;
  }
}
