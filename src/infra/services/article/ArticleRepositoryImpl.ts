import "../../../main/config/loadEnv";
import { Article } from "@domain/entities/Article";
import { ArticleRepository } from "@domain/repositories/article/ArticleRepository";

import {
  Configuration,
  OpenAIApi,
  ChatCompletionRequestMessage,
  ChatCompletionRequestMessageRoleEnum,
  CreateImageRequest,
  CreateImageRequestSizeEnum,
} from "openai";
import { AppConstants } from "../../../utils/constants";

export class ArticleRepositroyImplt implements ArticleRepository {
  private openai: OpenAIApi;
  private messages: ChatCompletionRequestMessage[] = [
    {
      role: ChatCompletionRequestMessageRoleEnum.System,
      content: AppConstants.DEFAULT_ARTICLE_WRITING_GUIDELINE,
    },
  ];
  private imageParams: CreateImageRequest = {
    prompt: "",
    n: 1,
    size: CreateImageRequestSizeEnum._512x512,
  };

  constructor() {
    this.openai = new OpenAIApi(
      new Configuration({
        apiKey: process.env.OPENAI_API_KEY,
      }),
    );
  }

  async createArticle(prompt: string): Promise<Article> {
    this.messages.push({
      role: ChatCompletionRequestMessageRoleEnum.User,
      content: prompt,
    });
    let article: Article = { title: "", body: "" };

    try {
      const response = await this.openai.createChatCompletion({
        model: AppConstants.ModelName,
        messages: this.messages,
      });

      const text = response.data.choices?.[0]?.message?.content ?? "";
      article = JSON.parse(text);

      return article;
    } catch (error) {
      console.error("error: ", error);
      throw new Error("Failed to create article.");
    }
  }

  async createImage(prompt: string): Promise<string> {
    try {
      this.imageParams.prompt = prompt;
      const response = await this.openai.createImage(this.imageParams);
      const imageUrl = response.data.data[0]?.url;
      return imageUrl
        ? imageUrl
        : Promise.reject(new Error("Failed to create image."));
    } catch (error) {
      console.error("createImage: " + error);
      throw new Error("Failed to create image.");
    }
  }
}
