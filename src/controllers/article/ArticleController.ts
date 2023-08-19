import { log } from "console";
import { CreateArticleUseCase } from "@application/usecases/article/CreateArticleUseCase";
import { CreateImageUseCase } from "@application/usecases/article/CreateImageUseCase";
import { SearchYoutubeVideosUseCase } from "@application/usecases/article/SearchYoutubeVideosUseCase";
import { SaveArticleUseCase } from "@application/usecases/article/SaveArticleUseCase";

export class ArticleController {
  constructor(
    private createArticle: CreateArticleUseCase,
    private createImage: CreateImageUseCase,
    private searchVideos: SearchYoutubeVideosUseCase,
    private saveArticle: SaveArticleUseCase,
  ) {}

  async generateArticle(req: any, res: any) {
    try {
      const prompt = req.body.prompt;
      log(`getArticle: ${prompt}`);
      if (!prompt || typeof prompt !== "string" || prompt.trim().length === 0) {
        log(`getArticle: invalid prompt`);
        res.status(400).json({
          error: "Invalid prompt. Please provide a non-empty string.",
        });
        return;
      }
      const article = await this.createArticle.execute(prompt);
      log(article);

      const imageUrl = await this.createImage.execute(prompt);
      log(imageUrl);

      const videos = await this.searchVideos.execute(prompt);
      log(videos);

      res.status(200).json({
        title: article.title,
        url: imageUrl,
        body: article.body,
        videos: videos,
      });
      const userId = req.body.user.id;
      const savedArticle = await this.saveArticle.execute(userId, article);
      log(`Checking if article was saved... ${savedArticle}`);
    } catch (error) {
      console.error("error creating a new Article: ", error);
      res.status(500).json({
        error: "error creating a new Article",
      });
    }
  }
}
