const db = require("../config/db");

/**
 * ArticleModel
 * Handles all database interactions for articles (PostgreSQL)
 */
class ArticleModel {
  /**
   * Get all articles with optional filters
   * Supports:
   *  - published_date
   *  - tags (matches array element)
   */
  static async findAll(filters = {}) {
    let query = "SELECT * FROM articles WHERE 1=1";
    const values = [];
    let idx = 1;

    if (filters.published_date) {
      query += ` AND published_date = $${idx}`;
      values.push(filters.published_date);
      idx++;
    }

    if (filters.tags) {
      // tags is TEXT[] in PostgreSQL
      query += ` AND $${idx} = ANY(tags)`;
      values.push(filters.tags);
      idx++;
    }

    query += " ORDER BY created_at DESC";

    const { rows } = await db.query(query, values);
    return rows;
  }

  /**
   * Get a single article by ID
   */
  static async findById(id) {
    const { rows } = await db.query(
      "SELECT * FROM articles WHERE id = $1",
      [id]
    );
    return rows[0];
  }

  /**
   * Create a new article
   */
  static async create(data) {
    const { title, content, tags, published_date } = data;

    const { rows } = await db.query(
      `INSERT INTO articles (title, content, tags, published_date)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [title, content, tags, published_date]
    );

    return rows[0];
  }

  /**
   * Update an existing article
   */
  static async update(id, data) {
    const { title, content, tags, published_date } = data;

    const { rows } = await db.query(
      `UPDATE articles
       SET title = $1,
           content = $2,
           tags = $3,
           published_date = $4
       WHERE id = $5
       RETURNING *`,
      [title, content, tags, published_date, id]
    );

    return rows[0];
  }

  /**
   * Delete an article
   */
  static async delete(id) {
    const result = await db.query(
      "DELETE FROM articles WHERE id = $1",
      [id]
    );

    return result.rowCount;
  }
}

module.exports = ArticleModel;
