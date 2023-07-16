class GenerateCustomArticleUseCase {
  constructor(openAIService) {
    this.openAIService = openAIService;
  }

  async execute(prompt) {
    let article = "Title: I AM EMPTY: Body: NO PRAGRAH";
    try {
      article = await this.openAIService.createChatCompletion(prompt);
    } catch (error) {
      console.error("GenerateCustomArticleUseCase: " + error.message);
    }

    return article;
  }
}

module.exports = GenerateCustomArticleUseCase;
