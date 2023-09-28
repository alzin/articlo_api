import { CreateArticleUseCase } from "../../application/usecases/article/CreateArticleUseCase";
import { CreateImageUseCase } from "../../application/usecases/article/CreateImageUseCase";
import { ArticleRepositroyImplt } from "../../infra/services/article/ArticleRepositoryImpl";
import { ArticleController } from "../../controllers/article/ArticleController";
import { SearchYoutubeVideosUseCase } from "../../application/usecases/article/SearchYoutubeVideosUseCase";
import { YoutubeRepositoryImpl } from "../../infra/services/article/YoutubeRepositoryImpl";
import { SaveArticleUseCase } from "../../application/usecases/article/SaveArticleUseCase";
import { DownloadImageUseCase } from "../../application/usecases/storage/DownloadImageUseCase";
import { UploadImageToStorageUseCase } from "../../application/usecases/storage/UploadImageToStorageUseCase";
import { ImageStorageRepositoryImpl } from "../../infra/services/storage/ImageStorageRepositoryImpl";
import { GetAllArticlesUseCase } from "../../application/usecases/article/GetAllArticlesUseCase";

const articleRepository = new ArticleRepositroyImplt();
const createArticle = new CreateArticleUseCase(articleRepository);
const createImage = new CreateImageUseCase(articleRepository);
const saveArticle = new SaveArticleUseCase(articleRepository);

const youtubeRepository = new YoutubeRepositoryImpl();
const searchYoutubeVideos = new SearchYoutubeVideosUseCase(youtubeRepository);

const imageStorageRepository = new ImageStorageRepositoryImpl();
const downloadImage = new DownloadImageUseCase(imageStorageRepository);
const uploadImage = new UploadImageToStorageUseCase(imageStorageRepository);
const getArticles = new GetAllArticlesUseCase(articleRepository);

export const articleController = new ArticleController(
  createArticle,
  createImage,
  searchYoutubeVideos,
  saveArticle,
  downloadImage,
  uploadImage,
  getArticles,
);
