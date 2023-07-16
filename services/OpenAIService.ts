const { Configuration, OpenAIApi } = require("openai");

class OpenAIService {
  constructor() {
    this.configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });
    this.openai = new OpenAIApi(this.configuration);
    this.messages = [
      {
        role: "system",
        content:
          "You are a professional writer who writes articles and may be asked to edit them. And make sure alweys to write articles using the following structure of Title: ARTICLE_TITLE Body: ARTICLE_BODY",
      },
    ];
  }

  async createChatCompletion(params) {
    this.messages.push({ role: "user", content: params });
    console.log("User request from frontend!!!");
    console.log(params);
    try {
      console.log("In Try");
      const response = await this.openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: this.messages,
      });
      const result = response.data.choices[0].message.content;
      this.messages.push({ role: "system", content: result });

      console.log(this.messages);
      return result;
    } catch (error) {
      console.error("createChatCompletion: " + error);
    }
  }

  async createImage(params) {
    try {
      const response = await this.openai.createImage(params);
      return response.data.data[0].url;
    } catch (error) {
      console.error("createImage: " + error.message);
      throw error;
    }
  }
}

module.exports = OpenAIService;
