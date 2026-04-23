const express = require("express");
const authors = express.Router();


const { getAuthors,
        getAuthorById,
        createAuthor
} = require("../controllers/authors_controller");

// GET todos los autores
authors.get("/authors", getAuthors);

// GET autor por ID
authors.get("/authors/:id", getAuthorById);

// POST crear author
authors.post("/authors", createAuthor);

module.exports = authors;
