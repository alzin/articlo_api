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
      const prompt = req.query.prompt;
      log(prompt);
      if (prompt == null) {
        res.status(400).send({
          oopps: "really!!"
        });
        return;
      } 

      const article = await this.createArticle.execute(prompt);
      const imageUrl = await this.createImage.execute(prompt);

      res.status(200).send({
        title: article.title,
        body: article.body,
        image: imageUrl,
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
