const pool = require("../config/db"); 

//FUNCION SERVICE PARA GET POST
const getPostService = async () => {
  const result =await pool.query("SELECT * FROM posts")
  return result.rows
};

//FUNCION SERVICE PARA GET POST POR ID
const getPostServiceID = async (id) => {
  const result = await pool.query(
    "SELECT * FROM posts WHERE id = $1",
    [id]
  );
  return result.rows[0];
};

// FUNCION PARA CREAR POSTS
const createPostService = async (title, content, author_id ,published) => {
  const result = await pool.query(
    "INSERT INTO posts (title, content, author_id ,published) VALUES ($1, $2, $3, $4) RETURNING *",
    [title, content, author_id ,published]
  );

  return result.rows[0];
};

// ACTUALIZAR POST
const updatePostService = async (id, title, content, author_id, published) => {
  const result = await pool.query(
    `UPDATE posts 
     SET title = $1, content = $2, author_id = $3, published = $4 
     WHERE id = $5 
     RETURNING *`,
    [title, content, author_id, published, id]
  );

  return result.rows[0];
};


module.exports = {
  getPostService,
  getPostServiceID,
  createPostService,
  updatePostService
 
};