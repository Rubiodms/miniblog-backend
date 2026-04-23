const express = require("express");
const authors = express.Router();

const { getAuthors } = require("../controllers/authors_controller");


authors.get("/authors", getAuthors);

module.exports = authors;