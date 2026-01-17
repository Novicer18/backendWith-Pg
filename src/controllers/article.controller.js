const Article = require("../models/article.model");
const asyncHandler = require("../utils/asyncHandler");

exports.getArticles = asyncHandler(async (req, res) => {
  const articles = await Article.findAll(req.query);
  res.status(200).json({ success: true, data: articles });
});

exports.getArticleById = asyncHandler(async (req, res) => {
  const article = await Article.findById(req.params.id);

  if (!article) {
    return res.status(404).json({
      success: false,
      message: "Article not found"
    });
  }

  res.status(200).json({ success: true, data: article });
});

// exports.createArticle = asyncHandler(async (req, res) => {
//   const article = await Article.create(req.body);
//   res.status(201).json({ success: true, data: article });
// });

exports.createArticle = asyncHandler(async (req, res) => {
  let { title, content, tags, published_date } = req.body;

  // ✅ Convert comma-separated string → array
  if (typeof tags === "string") {
    tags = tags
      .split(",")
      .map(tag => tag.trim())
      .filter(Boolean);
  }

  const article = await Article.create({
    title,
    content,
    tags,
    published_date
  });

  res.status(201).json({
    success: true,
    data: article
  });
});


exports.updateArticle = asyncHandler(async (req, res) => {
  const article = await Article.update(req.params.id, req.body);

  if (!article) {
    return res.status(404).json({
      success: false,
      message: "Article not found"
    });
  }

  res.status(200).json({ success: true, data: article });
});

exports.deleteArticle = asyncHandler(async (req, res) => {
  const deleted = await Article.delete(req.params.id);

  if (!deleted) {
    return res.status(404).json({
      success: false,
      message: "Article not found"
    });
  }

  res.status(204).send();
});
