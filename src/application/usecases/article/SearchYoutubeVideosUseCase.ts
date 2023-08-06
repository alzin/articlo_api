import { Video } from "@domain/entities/Video";
import { YoutubeRepository } from "@domain/repositories/article/YoutubeRepository";

export class SearchYoutubeVideosUseCase {
  constructor(private readonly youtubeRepository: YoutubeRepository) {}

  async execute(prompt: string): Promise<Video[]> {
    return await this.youtubeRepository.search(prompt);
  }
}
