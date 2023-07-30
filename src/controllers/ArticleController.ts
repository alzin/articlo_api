import { log } from "console";
import { CreateArticleUseCase } from "../domain/usecases/CreateArticleUseCase";
import { CreateImageUseCase } from "../domain/usecases/CreateImageUseCase";

export class ArticleController {
  constructor(
    private createArticle: CreateArticleUseCase,
    private createImage: CreateImageUseCase,
  ) {}

  async getArticle(req: any, res: any) {
    try {
      const prompt = req.body.prompt;
      log(`getArticle: ${prompt}`);
      if (prompt.length == 0) {
        log(`getArticle: empty prompt`);
        res.status(400).send();
        return;
      }

      const article = await this.createArticle.execute(prompt);
      const imageUrl = await this.createImage.execute(prompt);

      res.status(200).json({
        title: article.title,
        url: imageUrl,
        body: article.body,
        videos: [],
      });
      log(article);
    } catch (error) {
      console.error("error creating a new Article: ", error);
      res.status(500).json({
        error: "error creating a new Article",
      });
    }
  }
}
