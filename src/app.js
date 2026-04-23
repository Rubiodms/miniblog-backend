require('dotenv').config(); // Carga de variables de entorno 
const express = require("express");
const app = express();

// MIDDLEWARES
app.use(express.json()); // Configuración para recibir JSON 

// RUTAS
//ruta authors
const authorsRoutes = require("./routes/authors_routes");
app.use("/api", authorsRoutes);



app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" }); // Health check 
});


module.exports = app; 