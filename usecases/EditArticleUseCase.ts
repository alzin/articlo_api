class EditArticleUseCase {
  constructor(openAIService) {
    this.openAIService = openAIService;
  }

  async execute(prompt) {
    let text = "";
    try {
      text = await this.openAIService.createChatCompletion(prompt);
    } catch (error) {
      console.error("editArticle: " + error.message);
    }

    return text;
  }
}

module.exports = EditArticleUseCase;
