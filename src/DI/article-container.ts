import { CreateArticleUseCase } from "../application/usecases/CreateArticleUseCase";
import { CreateImageUseCase } from "../application/usecases/CreateImageUseCase";
import { ArticleRepositroyImplt } from "../infra/services/ArticleRepositoryImpl";
import { ArticleController } from "../controllers/ArticleController";

const articleRepository = new ArticleRepositroyImplt();
const createArticle = new CreateArticleUseCase(articleRepository);
const createImage = new CreateImageUseCase(articleRepository);
export const articleController = new ArticleController(
  createArticle,
  createImage,
);

import { AuthRepositoryImpt } from "../infra/services/AuthRepositoryImpt";
import { SignInUseCase } from "../application/usecases/auth/SignInUseCase";
import { SignUpUseCase } from "../application/usecases/auth/SignUpUseCase";
import { AuthController } from "../controllers/auth/AuthController";

const authRepository = new AuthRepositoryImpt();
const signInUseCase = new SignInUseCase(authRepository);
const signUpUseCase = new SignUpUseCase(authRepository);
export const authController = new AuthController(signInUseCase, signUpUseCase);
