import mongoose, { Schema, Document } from "mongoose";

interface IUser extends Document {
  username: string;
  email: string;
  password: string;
}

interface IArticle extends Document {
  title: string;
  body: string;
  imageUrl: string;
  author: IUser["_id"];
}

const ArticleSchema: Schema = new Schema({
  title: { type: String, required: true },
  body: { type: String, required: true },
  imageUrl: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

const Article = mongoose.model<IArticle>("Article", ArticleSchema);

export default Article;
