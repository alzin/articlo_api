const {
  createContainer,
  asClass,
  asValue,
  Lifetime,
  InjectionMode,
} = require("awilix");
const OpenAIService = require("./services/OpenAIService");
const YouTubeService = require("./services/YouTubeService");
const GenerateImageUseCase = require("./usecases/GenerateImageUseCase");
const GenerateCustomArticleUseCase = require("./usecases/GenerateCustomArticleUseCase");
const GetYouTubeVideosUseCase = require("./usecases/GetYouTubeVideosUseCase");
const EditArticleUseCase = require("./usecases/EditArticleUseCase");
const ArticleDataController = require("./controllers/ArticleDataController");
const EditController = require("./controllers/EditController");

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
