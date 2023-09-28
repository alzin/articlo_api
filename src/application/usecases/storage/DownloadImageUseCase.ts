import { ImageStorageRepository } from "@domain/repositories/storage/ImageStorageRepository";

export class DownloadImageUseCase {
  constructor(
    private readonly imageStorageRepository: ImageStorageRepository,
  ) {}

  async execute(imageUrl: string): Promise<Buffer> {
    return await this.imageStorageRepository.downloadImageFromURL(imageUrl);
  }
}
