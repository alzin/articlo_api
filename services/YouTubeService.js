const { google } = require("googleapis");

class YouTubeService {
  constructor() {
    this.youtube = google.youtube({
      version: "v3",
      auth: process.env.YOUTUBE_API_KEY,
    });
  }

  async searchList(params) {
    try {
      const response = await this.youtube.search.list(params);
      return response.data.items;
    } catch (error) {
      console.error("searchList: " + error.message);
      throw error;
    }
  }
}

module.exports = YouTubeService;
