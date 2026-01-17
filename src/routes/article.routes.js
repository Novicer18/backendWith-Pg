const express = require("express");
const router = express.Router();
const controller = require("../controllers/article.controller");
const { validateArticle } = require("../middlewares/validate.middleware");

router.get("/", controller.getArticles);
router.get("/:id", controller.getArticleById);
router.post("/", validateArticle, controller.createArticle);
router.put("/:id", validateArticle, controller.updateArticle);
router.delete("/:id", controller.deleteArticle);

module.exports = router;
