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