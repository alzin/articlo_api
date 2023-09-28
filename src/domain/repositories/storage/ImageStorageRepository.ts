export interface ImageStorageRepository {
  downloadImageFromURL(url: string): Promise<Buffer>;
  uploadImageToStorage(userId: number, imageUrl: Buffer): Promise<string>;
}
