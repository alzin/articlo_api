export function extractTitle(text: string): string {
  let title = "Default title";
  const titleIndex = text.indexOf("Title:");
  if (titleIndex !== -1) {
    title = text.split("Title:")[1].split("\n")[0].trim();
  }
  return title;
}

export function extractBody(text: string): string {
  let body = "Default body";
  const bodyIndex = text.indexOf("Body:");
  if (bodyIndex !== -1) {
    body = text.split("Body:")[1].trim();
  }
  return body;
}
