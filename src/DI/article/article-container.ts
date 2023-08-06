import { CreateArticleUseCase } from "../../application/usecases/article/CreateArticleUseCase";
import { CreateImageUseCase } from "../../application/usecases/article/CreateImageUseCase";
import { ArticleRepositroyImplt } from "../../infra/services/article/ArticleRepositoryImpl";
import { ArticleController } from "../../controllers/article/ArticleController";

const articleRepository = new ArticleRepositroyImplt();
const createArticle = new CreateArticleUseCase(articleRepository);
const createImage = new CreateImageUseCase(articleRepository);
export const articleController = new ArticleController(
  createArticle,
  createImage,
);
