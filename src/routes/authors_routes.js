const express = require("express");
const authors = express.Router();


const { getAuthors,
        getAuthorById,
        createAuthor,
        updateAuthor,
        deleteAuthor
} = require("../controllers/authors_controller");

// GET todos los autores
authors.get("/authors", getAuthors);

// GET autor por ID
authors.get("/authors/:id", getAuthorById);

// POST crear author
authors.post("/authors", createAuthor);

// PUT ACTUALIZAR AUTOR
authors.put("/authors/:id", updateAuthor);

// DELETE BORRAR AUTOR
authors.delete("/authors/:id", deleteAuthor);

module.exports = authors;
