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


//CONTROLADOR PARA GET POST POR ID
const getPostById = async (req, res) => {
  try {
    const { id } = req.params;

    const data = await PostService.getPostServiceID(id);

    if (!data) {
      return res.status(404).json({ message: "Author not found" });
    }

    res.status(200).json(data);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "internal server error" });
  }
};

module.exports = {
  getPost,
  getPostById
 
};