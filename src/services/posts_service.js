const pool = require("../config/db"); 

//FUNCION SERVICE PARA GET POST
const getPostService = async () => {
  const result =await pool.query("SELECT * FROM posts")
  return result.rows
};


module.exports = {
  getPostService
 
};