require("dotenv").config();

const PORT = process.env.PORT || 3000;
const cors = require("cors");
const express = require("express");
const app = express();
const container = require("./container");
const User = require("./models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const Article = require("./models/Article");
const { ObjectId } = require("mongodb");

let userId = new ObjectId("64ac1c9000bc4a4d5e81a04d");

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: false,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

const articleDataController = container.resolve("articleDataController");
const editController = container.resolve("editController");

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.post("/", (req, res) => {
  res.send("Hello, World!");
});

app.post("/ask", articleDataController.ask.bind(articleDataController));
app.post("/edit", editController.edit.bind(editController));

app.post("/api/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const isRegistered = await User.findOne({ email });
    if (isRegistered) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      username: username,
      email,
      password: hashedPassword,
    });

    await user.save();

    res.status(201).json({
      message: "User registered successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
});

app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    userId = user._id;
    console.log("User id is ", userId);

    res.status(200).json({
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/api/article", async (req, res) => {
  try {
    const { title, image, body } = req.body;

    const user = await User.findById(userId);
    console.log(title);
    console.log(user);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const newArticle = new Article({
      article_title: title,
      article_img_url: image,
      article_text: body,
      user: user,
    });

    const savedArticle = await newArticle.save();

    user.articles.push(savedArticle._id);
    await user.save();

    res
      .status(201)
      .json({ message: "Article added sucessfully", article: savedArticle });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/api/blogs", async (req, res) => {
  try {
    // Get the logged-in user's ID from the request
    // const userId = req.user.id;

    // Find the user by user ID
    const user = await User.findById(userId).populate("articles");
    console.log(user.articles);

    // Retrieve the article documents
    const articles = await Article.find({
      _id: { $in: user.articles },
    });

    const _articles = articles.map((article) => ({
      id: article._id,
      title: article.article_title,
      image: article.article_img_url,
      text: article.article_text,
    }));

    console.log(_articles);

    // Return the articles data as JSON
    res.json(_articles);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
