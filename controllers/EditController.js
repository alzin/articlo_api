class EditController {
  constructor(generateCustomArticleUseCase) {
    this.generateCustomArticleUseCase = generateCustomArticleUseCase;
  }

  async edit(req, res) {
    const editPrompt = req.body.prompt;
    console.log("Check editPrompt");
    console.log(editPrompt);
    const text = await this.generateCustomArticleUseCase.execute(editPrompt);

    if (text) {
      res.json({
        title: extractTitle(text),
        body: extractBody(text),
      });
    } else {
      res
        .status(500)
        .send({ error: "An error occurred while handling the edit request" });
    }
  }
}

function extractTitle(text) {
  let title = "Default title";
  const titleIndex = text.indexOf("Title:");
  if (titleIndex !== -1) {
    title = text.split("Title:")[1].split("\n")[0];
  }
  return title;
}

function extractBody(text) {
  let body = "Default body";
  const bodyIndex = text.indexOf("Body:");
  console.log(bodyIndex);
  if (bodyIndex !== -1) {
    body = text.split("Body:")[1];
    console.log(body);
  }
  return body;
}

module.exports = EditController;
