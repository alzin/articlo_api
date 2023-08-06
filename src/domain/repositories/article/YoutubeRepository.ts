import { Video } from "../../entities/Video";

export interface YoutubeRepository {
  search(query: string): Promise<Video[]>;
}
