const pool = require("../src/config/db.js"); 

const getlenguages=async ()=>{
    try{
        const result =await pool.query("SELECT NOW()")
        console.table(result.rows);
    }catch(error){
        console.error(error);
    }
};

getlenguages();