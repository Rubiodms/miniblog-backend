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

// ─── GET /api/posts ──────────────────────────────────────────────────────────

describe("GET /api/posts", () => {
  it("debe responder con 200 y un array de posts", async () => {
    const res = await request(app).get("/api/posts");

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("cada post debe tener las propiedades esperadas", async () => {
    const res = await request(app).get("/api/posts");

    expect(res.status).toBe(200);
    if (res.body.length > 0) {
      const post = res.body[0];
      expect(post).toHaveProperty("id");
      expect(post).toHaveProperty("title");
      expect(post).toHaveProperty("content");
      expect(post).toHaveProperty("author_id");
      expect(post).toHaveProperty("published");
    }
  });
});

// ─── GET /api/posts/:id ──────────────────────────────────────────────────────

describe("GET /api/posts/:id", () => {
  let createdPostId;

  beforeAll(async () => {
    const res = await request(app)
      .post("/api/posts")
      .send(validPost(sharedAuthorId));
    createdPostId = res.body.id;
  });

  it("debe responder con 200 y los datos correctos del post", async () => {
    const res = await request(app).get(`/api/posts/${createdPostId}`);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("id", createdPostId);
    expect(res.body).toHaveProperty("title");
    expect(res.body).toHaveProperty("author_id", sharedAuthorId);
  });

  it("debe responder con 404 si el post no existe", async () => {
    const res = await request(app).get("/api/posts/999999");

    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty("message", "Post not found");
  });
});