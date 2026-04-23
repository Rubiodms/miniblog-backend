const pool = require("../config/db"); 

const getAuthorsService = async () => {
  const result =await pool.query("SELECT * FROM authors")
  return result.rows
};

module.exports = {
  getAuthorsService 
};