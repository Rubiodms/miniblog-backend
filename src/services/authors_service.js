const pool = require("../config/db"); 

//FUNCION SERVICE PARA GET AUTHORS
const getAuthorsService = async () => {
  const result =await pool.query("SELECT * FROM authors")
  return result.rows
};

//FUNCION SERVICE PARA GET AUTHORS POR ID
const getAuthorsServiceID = async (id) => {
  const result = await pool.query(
    "SELECT * FROM authors WHERE id = $1",
    [id]
  );
  return result.rows[0];
};

// FUNCION PARA CREAR AUTHORS
const createAuthorService = async (name, email, bio) => {
  const result = await pool.query(
    "INSERT INTO authors (name, email, bio) VALUES ($1, $2, $3) RETURNING *",
    [name, email, bio]
  );

  return result.rows[0];
};

// FUNCION PARA ACTUALIZAR AUTHORS
const updateAuthorService = async (id, name, email, bio) => {
  const result = await pool.query(
    `UPDATE authors 
     SET name = $1, email = $2, bio = $3 
     WHERE id = $4 
     RETURNING *`,
    [name, email, bio, id]
  );

  return result.rows[0];
};



module.exports = {
  getAuthorsService,
  getAuthorsServiceID,
  createAuthorService,
  updateAuthorService
};