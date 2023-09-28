import { ImageStorageRepository } from "@domain/repositories/storage/ImageStorageRepository";

export class UploadImageToStorageUseCase {
  constructor(
    private readonly imageStorageRepository: ImageStorageRepository,
  ) {}

  async execute(userId: number, image: Buffer): Promise<string> {
    return await this.imageStorageRepository.uploadImageToStorage(
      userId,
      image,
    );
  }
}
