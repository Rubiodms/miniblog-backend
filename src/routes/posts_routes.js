const express = require("express");
const post = express.Router();

const { getPost,
        getPostById,
        createPost,
        updatePost,
        deletePost,
        getPostsByAuthor
        
} = require("../controllers/posts_controller");

// GET TODOS LOS POST
post.get("/posts",getPost);

//GET POST POR ID
post.get("/posts/:id",getPostById);

// GET posts por author
post.get("/posts/author/:authorId", getPostsByAuthor);

// POST CREAR POSTS
post.post("/posts", createPost);

// PUT ACRUALIZAR POST
post.put("/posts/:id", updatePost);

// DELETE ELIMIRA POST
post.delete("/posts/:id", deletePost);


module.exports = post;