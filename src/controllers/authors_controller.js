const AuthorsService = require("../services/authors_service");

const getAuthors = async(req, res) => {
    try{
        const datos = await AuthorsService.getAuthorsService()
        res.status(200).json(datos);
    }catch(error){
        res.status(500).json({ error: "internal server error" });
    }
};

module.exports = {
  getAuthors
};