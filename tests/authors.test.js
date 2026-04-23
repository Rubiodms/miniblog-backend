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

// ─── TEST: obtener todos los autores ───────────────────────────────────────
describe("GET /api/authors", () => {

  // Debe retornar lista de autores
  it("debe responder con 200 y un array de autores", async () => {
    const res = await request(app).get("/api/authors");

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  // Validación de estructura de cada autor
  it("cada autor debe tener las propiedades esperadas", async () => {
    const res = await request(app).get("/api/authors");

    if (res.body.length > 0) {
      const author = res.body[0];

      expect(author).toHaveProperty("id");
      expect(author).toHaveProperty("name");
      expect(author).toHaveProperty("email");
      expect(author).toHaveProperty("bio");
    }
  });
});