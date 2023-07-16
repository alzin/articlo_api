import { createContainer, asClass, asValue, Lifetime, InjectionMode } from "awilix";
import OpenAIService from "./services/OpenAIService";
import YouTubeService from "./services/YouTubeService";
import GenerateImageUseCase from "./usecases/GenerateImageUseCase";
import GenerateCustomArticleUseCase from "./usecases/GenerateCustomArticleUseCase";
import GetYouTubeVideosUseCase from "./usecases/GetYouTubeVideosUseCase";
import EditArticleUseCase from "./usecases/EditArticleUseCase";
import ArticleDataController from "./controllers/ArticleDataController";
import EditController from "./controllers/EditController";

const container = createContainer({
  injectionMode: InjectionMode.CLASSIC,
});

container
  .register({
    openAIService: asClass(OpenAIService).scoped(),
    youTubeService: asClass(YouTubeService).scoped(),
    generateImageUseCase: asClass(GenerateImageUseCase).scoped(),
    generateCustomArticleUseCase: asClass(
      GenerateCustomArticleUseCase
    ).scoped(),
    getYouTubeVideosUseCase: asClass(GetYouTubeVideosUseCase).scoped(),
    editArticleUseCase: asClass(EditArticleUseCase).scoped(),
    articleDataController: asClass(ArticleDataController).scoped(),
    editController: asClass(EditController).scoped(),
    prompt: asValue(
      "Write a very detailed Article Using the following structure \n Title: \n Body:"
    ),
  })
  .loadModules([], {
    formatName: "camelCase",
    cwd: __dirname,
    lifetime: Lifetime.SCOPED,
  });

module.exports = container;
