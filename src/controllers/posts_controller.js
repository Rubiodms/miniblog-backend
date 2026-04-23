const PostService = require("../services/posts_service");

//CONTROLADOR PARA GET POST
const getPost = async(req, res) => {
    try{
        const datos = await PostService.getPostService()
        res.status(200).json(datos);
    }catch(error){
        res.status(500).json({ error: "internal server error" });
    }
};

module.exports = {
  getPost
 
};