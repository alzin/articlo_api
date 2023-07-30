import "../../main/config/loadEnv";
import { log } from "console";
import { Article } from "../../domain/entities/Article";
import { ArticleRepository } from "../../domain/interfaces/ArticleRepository";
import { extractTitle, extractBody } from "../../utils/articleUtils";

import {
  Configuration,
  OpenAIApi,
  ChatCompletionRequestMessage,
  ChatCompletionRequestMessageRoleEnum,
  CreateImageRequest,
  CreateImageRequestSizeEnum,
} from "openai";

export class ArticleRepositroyImplt implements ArticleRepository {
  private openai: OpenAIApi;
  private messages: ChatCompletionRequestMessage[] = [
    {
      role: ChatCompletionRequestMessageRoleEnum.System,
      content:
        "You are a professional writer who writes articles and may be asked to edit them. And make sure always to write articles using the following structure of Title: ARTICLE_TITLE Body: ARTICLE_BODY",
    },
  ];

  constructor() {
    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });

    this.openai = new OpenAIApi(configuration);
  }

  async createArticle(prompt: string): Promise<Article> {
    this.messages.push ({
      role: ChatCompletionRequestMessageRoleEnum.User,
      content: prompt,
    });
    let article: Article = { title: "", body: "" };
    
    try {
      const response = await this.openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: this.messages,
      });

      const text = response.data.choices?.[0]?.message?.content ?? "";

      article = { title: extractTitle(text), body: extractBody(text) };

      return article;
    } catch (error) {
      console.error("error: ", error);
      const article: Article = { title: "", body: "" };
      return article;
    }
  }

  async createImage(prompt: string): Promise<string> {
    try {
      const params: CreateImageRequest = {
        prompt: prompt,
        n: 1,
        size: CreateImageRequestSizeEnum._256x256,
      };
      const response = await this.openai.createImage(params);

      const imageUrl = response.data.data[0]?.url;
      log(imageUrl);

      if (imageUrl) {
        return imageUrl;
      } else {
        return "";
      }
    } catch (error) {
      console.error("createImage: " + error);

      return "";
    }
  }
}
