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

// ─── POST /api/posts ─────────────────────────────────────────────────────────

describe("POST /api/posts", () => {
  it("debe responder con 201 y devolver el post creado", async () => {
    const newPost = validPost(sharedAuthorId);
    const res = await request(app).post("/api/posts").send(newPost);

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("id");
    expect(res.body.title).toBe(newPost.title);
    expect(res.body.content).toBe(newPost.content);
    expect(res.body.published).toBe(newPost.published);
  });

  it("debe asociar correctamente el author_id al post creado", async () => {
    const res = await request(app)
      .post("/api/posts")
      .send(validPost(sharedAuthorId));

    expect(res.status).toBe(201);
    expect(res.body.author_id).toBe(sharedAuthorId);
  });

  it("debe responder con 400 si faltan campos obligatorios", async () => {
    const res = await request(app).post("/api/posts").send({
      title: "Solo título",
      // content, author_id y published ausentes
    });

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("message", "All fields are required");
  });

  it("debe responder con 400 si el body está vacío", async () => {
    const res = await request(app).post("/api/posts").send({});

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("message", "All fields are required");
  });

  it("debe responder con 500 si el author_id no existe en la base de datos", async () => {
    const res = await request(app).post("/api/posts").send({
      title: "Post con autor inválido",
      content: "Contenido cualquiera",
      author_id: 999999,
      published: false,
    });

    expect(res.status).toBe(500);
  });
});

// ─── PUT /api/posts/:id ──────────────────────────────────────────────────────

describe("PUT /api/posts/:id", () => {
  let postToUpdateId;

  beforeAll(async () => {
    const res = await request(app)
      .post("/api/posts")
      .send(validPost(sharedAuthorId));
    postToUpdateId = res.body.id;
  });

  it("debe responder con 200 y el post actualizado", async () => {
    const updated = {
      title: "Título actualizado",
      content: "Contenido actualizado en el test",
      author_id: sharedAuthorId,
      published: true,
    };

    const res = await request(app)
      .put(`/api/posts/${postToUpdateId}`)
      .send(updated);

    expect(res.status).toBe(200);
    expect(res.body.title).toBe(updated.title);
    expect(res.body.content).toBe(updated.content);
    expect(res.body.published).toBe(updated.published);
  });

  it("debe responder con 404 si el post a actualizar no existe", async () => {
    const res = await request(app).put("/api/posts/999999").send({
      title: "X",
      content: "X",
      author_id: sharedAuthorId,
      published: false,
    });

    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty("message", "Post not found");
  });
});

// ─── DELETE /api/posts/:id ───────────────────────────────────────────────────

describe("DELETE /api/posts/:id", () => {
  let postToDeleteId;

  beforeAll(async () => {
    const res = await request(app)
      .post("/api/posts")
      .send(validPost(sharedAuthorId));
    postToDeleteId = res.body.id;
  });

  it("debe responder con 200 y confirmar la eliminación", async () => {
    const res = await request(app).delete(`/api/posts/${postToDeleteId}`);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("message", "Post eliminado correctamente");
    expect(res.body.post).toHaveProperty("id", postToDeleteId);
  });

  it("debe responder con 404 al eliminar un ID inexistente", async () => {
    const res = await request(app).delete("/api/posts/999999");

    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty("message", "Post not found");
  });
});

// ─── GET /api/posts/author/:authorId ─────────────────────────────────────────

describe("GET /api/posts/author/:authorId", () => {
  beforeAll(async () => {
    await request(app).post("/api/posts").send(validPost(sharedAuthorId));
  });

  it("debe responder con 200 y los posts del autor con sus datos", async () => {
    const res = await request(app).get(`/api/posts/author/${sharedAuthorId}`);

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);

    const post = res.body[0];
    expect(post).toHaveProperty("author_id", sharedAuthorId);
    expect(post).toHaveProperty("name");
    expect(post).toHaveProperty("email");
  });

  it("debe responder con 404 si el autor no tiene posts", async () => {
    const authorRes = await request(app).post("/api/authors").send({
      name: "Sin Posts",
      email: `noposts_${Date.now()}@example.com`,
      bio: "Este autor no tiene posts",
    });
    const emptyAuthorId = authorRes.body.id;

    const res = await request(app).get(`/api/posts/author/${emptyAuthorId}`);

    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty("message", "No posts found for this author");

    await pool.query("DELETE FROM authors WHERE id = $1", [emptyAuthorId]);
  });
});