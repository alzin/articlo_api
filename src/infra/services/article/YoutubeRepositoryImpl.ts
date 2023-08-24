import "../../../main/config/loadEnv";
import { google, youtube_v3 } from "googleapis";
import { YoutubeRepository } from "@domain/repositories/article/YoutubeRepository";
import { Video } from "@domain/entities/Video";

export class YoutubeRepositoryImpl implements YoutubeRepository {
  private youtube: youtube_v3.Youtube;

  constructor() {
    this.youtube = google.youtube({
      version: "v3",
      auth: process.env.YOUTUBE_API_KEY,
    });
  }

  async search(prompt: string): Promise<Video[]> {
    try {
      const response = await this.youtube.search.list({
        part: ["id,snippet"],
        q: prompt,
      });

      const videoItems = response.data.items?.filter(
        (item: any) => item.id.kind === "youtube#video",
      );
      const searchResults = videoItems?.map((item: any) => ({
        id: item.id.videoId,
        title: item.snippet.title,
        description: item.snippet.description,
      }));

      if (!searchResults) {
        return [];
      }

      return searchResults;
    } catch (error) {
      console.error("error: ", error);
      throw new Error("Failed to search youtube videos.");
    }
  }
}
