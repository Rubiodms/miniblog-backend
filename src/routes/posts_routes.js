const express = require("express");
const post = express.Router();

const { getPost,
        getPostById
        
} = require("../controllers/posts_controller");

// GET TODOS LOS POST
post.get("/posts",getPost)

//GET POST POR ID
post.get("/posts/:id",getPostById)

module.exports = post;