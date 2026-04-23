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

// ─── TEST: obtener autor por ID ───────────────────────────────────────────
describe("GET /api/authors/:id", () => {
  let createdAuthorId;

  // Crear autor antes de probar GET por ID
  beforeAll(async () => {
    const res = await request(app)
      .post("/api/authors")
      .send(validAuthor());

    createdAuthorId = res.body.id;
  });

  // Caso exitoso
  it("debe responder con 200 y el autor", async () => {
    const res = await request(app).get(`/api/authors/${createdAuthorId}`);

    expect(res.status).toBe(200);
    expect(res.body.id).toBe(createdAuthorId);
  });

  // Caso no encontrado
  it("debe responder con 404 si no existe", async () => {
    const res = await request(app).get("/api/authors/999999");

    expect(res.status).toBe(404);
  });
});

// ─── TEST: crear autores ───────────────────────────────────────────────────
describe("POST /api/authors", () => {

  // Creación exitosa
  it("debe crear un autor correctamente", async () => {
    const res = await request(app)
      .post("/api/authors")
      .send(validAuthor());

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("id");
  });

  // Validación de campos faltantes
  it("debe fallar si faltan campos", async () => {
    const res = await request(app)
      .post("/api/authors")
      .send({ name: "Solo nombre" });

    expect(res.status).toBe(400);
  });

  // Body vacío
  it("debe fallar si el body está vacío", async () => {
    const res = await request(app)
      .post("/api/authors")
      .send({});

    expect(res.status).toBe(400);
  });
});