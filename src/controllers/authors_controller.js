const AuthorsService = require("../services/authors_service");

//CONTROLADOR PARA GET AUTHORS
const getAuthors = async(req, res) => {
    try{
        const datos = await AuthorsService.getAuthorsService()
        res.status(200).json(datos);
    }catch(error){
        res.status(500).json({ error: "internal server error" });
    }
};

//CONTROLADOR PARA GET AUTHORS POR ID
const getAuthorById = async (req, res) => {
  try {
    const { id } = req.params;

    const data = await AuthorsService.getAuthorsServiceID(id);

    if (!data) {
      return res.status(404).json({ message: "Author not found" });
    }

    res.status(200).json(data);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "internal server error" });
  }
};

//CONTROLADOR PARA POST AUTHORS / CREAR AUTORES

const createAuthor = async (req, res) => {
  try {
    const { name, email, bio } = req.body;

    if (!name || !email || !bio) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newAuthor = await AuthorsService.createAuthorService(
      name,
      email,
      bio
    );

    res.status(201).json(newAuthor);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "internal server error" });
  }
};

//CONTROLADOR PARA PUT AUTHOR / ACTUALIZAR AUTORES

const updateAuthor = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, bio } = req.body;

    const updatedAuthor = await AuthorsService.updateAuthorService(
      id,
      name,
      email,
      bio
    );

    if (!updatedAuthor) {
      return res.status(404).json({ message: "Author not found" });
    }

    res.status(200).json(updatedAuthor);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "internal server error" });
  }
};



module.exports = {
  getAuthors,
  getAuthorById,
  createAuthor,
  updateAuthor
};