
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const tumblrRoutes = require("./routes/tumblrRoutes");

const app = express();
const PORT = 3000;



// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Rutas
app.use("/api/tumblr", tumblrRoutes);

// Servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
