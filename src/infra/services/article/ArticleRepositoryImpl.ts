import "../../../main/config/loadEnv";
import { ArticleEntity } from "@domain/entities/ArticleEntity";
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
import User from "../../../infra/DB/models/User";
import Article from "../../../infra/DB/models/Article";

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
  private article: ArticleEntity = { title: "", body: "" };

  constructor() {
    this.openai = new OpenAIApi(
      new Configuration({
        apiKey: process.env.OPENAI_API_KEY,
      }),
    );
  }

  async createArticle(prompt: string): Promise<ArticleEntity> {
    this.article = { title: prompt, body: "" };
    this.messages.push({
      role: ChatCompletionRequestMessageRoleEnum.User,
      content: prompt,
    });

    try {
      const response = await this.openai.createChatCompletion({
        model: AppConstants.ModelName,
        messages: this.messages,
      });

      const text = response.data.choices?.[0]?.message?.content ?? "";
      this.article.body = text;

      if (this.isJSON(text)) {
        this.article = JSON.parse(text);
      }

      this.messages.pop();
      return this.article;
    } catch (error) {
      console.error("error: ", error);
      return this.article;
    }
  }

  isJSON(str: string): boolean {
    try {
      JSON.parse(str);
      return true;
    } catch (e) {
      return false;
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

  async saveArticle(userId: any, article: ArticleEntity): Promise<boolean> {
    try {
      const user = await User.findById(userId).exec();

      if (!user) {
        console.log("ArticleRepositoryImpl: User not found");
        return false;
      }

      const newArticle = new Article({
        title: article.title,
        body: article.body,
        author: user._id,
      });

      const savedArticle = await newArticle.save();
      console.log(`ArticleRepositoryImpl: Article saved: ${savedArticle}`);
      
      return savedArticle ? true : false;
    } catch (error) {
      console.error("ArticleRepositoryImpl: Error saving article:", error);
      return false;
    }
  }
}
