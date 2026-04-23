const express = require("express");
const authors = express.Router();


const { getAuthors,
        getAuthorById
} = require("../controllers/authors_controller");

// GET todos los autores
authors.get("/authors", getAuthors);

// GET autor por ID
authors.get("/authors/:id", getAuthorById);

module.exports = authors;
