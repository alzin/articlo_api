import { ArticleRepository } from "../interfaces/ArticleRepository";

export class CreateImageUseCase {
  constructor(private readonly articleRepository: ArticleRepository) {}

  async execute(prompt: string): Promise<string> {
    return await this.articleRepository.createImage(prompt);
  }
}
