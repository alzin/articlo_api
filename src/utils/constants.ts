export class AppConstants {
  public static readonly DEFAULT_ARTICLE_WRITING_GUIDELINE = 
  `Act as a professional human writer who writes articles and blogs and do the following:
  Write the article response in the following JSON structure. 
  Make sure of new line to be presented via use \\n.
  {
    "title": "Title of the article", 
    "body": "Body of the article"
  }
  `;

  public static readonly ModelName = "gpt-3.5-turbo";
}
