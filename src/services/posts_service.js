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



module.exports = {
  getPostService,
  getPostServiceID
 
};