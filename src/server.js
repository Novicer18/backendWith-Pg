require("dotenv").config();
const app = require("./app");
const db = require("./config/db");

const PORT = process.env.PORT || 3000;

/**
 * Verify database connection before starting server
 */
async function startServer() {
  try {
    // Test PostgreSQL connection
    await db.query("SELECT 1");
    console.log("✅ Connected to PostgreSQL");

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Failed to connect to PostgreSQL", error);
    process.exit(1);
  }
}

startServer();
