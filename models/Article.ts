import { Document } from "mongoose";

interface Article extends Document {
  article_title: string;
  article_img_url: string;
  article_text: string;
  youtube_ids: string[];
  user: string; // User ID
}

export default Article;
