import { CreateArticleUseCase } from "../../application/usecases/article/CreateArticleUseCase";
import { CreateImageUseCase } from "../../application/usecases/article/CreateImageUseCase";
import { ArticleRepositroyImplt } from "../../infra/services/article/ArticleRepositoryImpl";
import { ArticleController } from "../../controllers/article/ArticleController";
import { SearchYoutubeVideosUseCase } from "../../application/usecases/article/SearchYoutubeVideosUseCase";
import { YoutubeRepositoryImpl } from "../../infra/services/article/YoutubeRepositoryImpl";
import { SaveArticleUseCase } from "../../application/usecases/article/SaveArticleUseCase";

const articleRepository = new ArticleRepositroyImplt();
const createArticle = new CreateArticleUseCase(articleRepository);
const createImage = new CreateImageUseCase(articleRepository);
const saveArticle = new SaveArticleUseCase(articleRepository);

const youtubeRepository = new YoutubeRepositoryImpl();
const searchYoutubeVideos = new SearchYoutubeVideosUseCase(youtubeRepository);

export const articleController = new ArticleController(
  createArticle,
  createImage,
  searchYoutubeVideos,
  saveArticle,
);
