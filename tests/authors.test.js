const request = require("supertest");
const app = require("../src/app");
const pool = require("../src/config/db");

// ─── Helpers ────────────────────────────────────────────────────────────────
const validAuthor = () => ({
  name: "Test Author",
  email: `test_${Date.now()}@example.com`,
  bio: "Bio de prueba para tests",
});

afterAll(async () => {
  await pool.query("DELETE FROM authors WHERE email LIKE 'test_%@example.com'");
  await pool.end();
});