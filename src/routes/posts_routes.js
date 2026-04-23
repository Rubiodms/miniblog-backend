const express = require("express");
const post = express.Router();

const { getPost
        
} = require("../controllers/posts_controller");

post.get("/posts",getPost)

module.exports = post;