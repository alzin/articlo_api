import { ArticleController } from "../controllers/ArticleController";
import { CreateArticleUseCase } from "../domain/usecases/CreateArticleUseCase";
import { CreateImageUseCase } from "../domain/usecases/CreateImageUseCase";
import { ArticleRepositroyImplt } from "../infra/services/ArticleRepositoryImpl";

const articleRepository = new ArticleRepositroyImplt();
const createArticle = new CreateArticleUseCase(articleRepository);
const createImage = new CreateImageUseCase(articleRepository);
export const articleController = new ArticleController(createArticle, createImage);
