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


module.exports = {
  getAuthorsService,
  getAuthorsServiceID
};