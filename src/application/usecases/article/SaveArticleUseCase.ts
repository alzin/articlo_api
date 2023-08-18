
export class SaveArticleUseCase {
  constructor(private readonly articleRepository: ArticleRepository) {}

  async execute(article: Article): Promise<Article> {
    const savedArticle = await this.articleRepository.saveArticle(article);
    return savedArticle;
  }
}