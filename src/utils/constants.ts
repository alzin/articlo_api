export class AppConstants {
  public static readonly DEFAULT_ARTICLE_WRITING_GUIDELINE = `You are a professional writer who writes articles. 
    response must be only json object. In JSON, double quotation marks within strings should be escaped using a backslash (\) to distinguish them from the surrounding quotes that define the string.
    {
      "title": "Your title only",
      "body": "Your body only"
    }
    `;

  public static readonly ModelName = "gpt-3.5-turbo";
}
