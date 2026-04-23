const request = require("supertest");
const { describe, it, expect, beforeAll, afterAll } = require("vitest");
const app = require("../src/app");
const pool = require("../src/config/db");

// ─── Helpers ────────────────────────────────────────────────────────────────

let sharedAuthorId; // autor real reutilizado en toda la suite

const validPost = (authorId) => ({
  title: "Post de prueba",
  content: "Contenido de prueba para tests de integración",
  author_id: authorId,
  published: false,
});

// ─── Setup / Teardown ────────────────────────────────────────────────────────

beforeAll(async () => {
  const res = await request(app).post("/api/authors").send({
    name: "Author Para Posts",
    email: `posts_suite_${Date.now()}@example.com`,
    bio: "Autor creado exclusivamente para la suite de posts",
  });
  sharedAuthorId = res.body.id;
});

afterAll(async () => {
  await pool.query("DELETE FROM authors WHERE id = $1", [sharedAuthorId]);
  await pool.end();
});