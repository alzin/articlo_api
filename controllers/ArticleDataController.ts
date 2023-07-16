class ArticleDataController {
  constructor(
    generateImageUseCase,
    generateCustomArticleUseCase,
    getYouTubeVideosUseCase
  ) {
    this.generateImageUseCase = generateImageUseCase;
    this.generateCustomArticleUseCase = generateCustomArticleUseCase;
    this.getYouTubeVideosUseCase = getYouTubeVideosUseCase;
  }

  async ask(req, res) {
    try {
      const prompt = req.body.prompt;

      const youTubeVideos = await this.getYouTubeVideosUseCase.execute(prompt);
      const articleImageUrl = await this.generateImageUseCase.execute(prompt);
      const articleText = await this.generateCustomArticleUseCase.execute(
        prompt
      );

      if (articleText) {
        res.json({
          title: extractTitle(articleText),
          url: articleImageUrl,
          body: extractBody(articleText),
          videos: youTubeVideos,
        });
      } else {
        throw new Error("Failed to generate custom article");
      }
    } catch (error) {
      console.error("An error occurred while handling the ask request:", error);
      res
        .status(500)
        .send({ error: "An error occurred while handling the ask request" });
    }
  }
}

function extractTitle(text) {
  let title = "Default title";
  const titleIndex = text.indexOf("Title:");
  if (titleIndex !== -1) {
    title = text.split("Title:")[1].split("\n")[0];
  }
  return title;
}

function extractBody(text) {
  let body = "Default body";
  const bodyIndex = text.indexOf("Body:");
  console.log(bodyIndex);
  if (bodyIndex !== -1) {
    body = text.split("Body:")[1];
    console.log(body);
  }
  return body;
}

module.exports = ArticleDataController;
