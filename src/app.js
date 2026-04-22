require('dotenv').config(); // Carga de variables de entorno 
const express = require("express");
const app = express();

// MIDDLEWARES
app.use(express.json()); // Configuración para recibir JSON 

// RUTAS
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" }); // Health check 
});

module.exports = app; 