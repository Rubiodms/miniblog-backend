const express = require("express");
const post = express.Router();

const { getPost,
        getPostById,
        createPost,
        updatePost
        
} = require("../controllers/posts_controller");

// GET TODOS LOS POST
post.get("/posts",getPost);

//GET POST POR ID
post.get("/posts/:id",getPostById);

// POST CREAR POSTS
post.post("/posts", createPost);

// PUT ACRUALIZAR POST
post.put("/posts/:id", updatePost);


module.exports = post;