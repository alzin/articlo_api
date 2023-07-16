const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema({
  article_title: {
    type: String,
    required: true,
  },
  article_img_url: {
    type: String,
    required: true,
  },
  article_text: {
    type: String,
    required: true,
  },
  youtube_ids: {
    type: [String],
    default: [],
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Article = mongoose.model("Article", articleSchema);

module.exports = Article;
