class GenerateImageUseCase {
  constructor(openAIService) {
    this.openAIService = openAIService;
  }

  async execute(prompt) {
    let imageUrl =
      "https://content.api.news/v3/images/bin/19baaccb3d706775bb9c3bbe2f946bb3";
    try {
      imageUrl = await this.openAIService.createImage({
        prompt: prompt,
        n: 1,
        size: "512x512",
      });
    } catch (error) {
      console.log("generateImage: " + error.message);
    }
    return imageUrl;
  }
}

module.exports = GenerateImageUseCase;
