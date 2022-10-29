const express = require("express");
const bodyParser = require('body-Parser');
const conectarDB = require("./config/db");
const cors = require("cors");

//crear el servidor
const app = express();

//conectar a la base de datos
conectarDB();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))

//habilitar cors
app.use(cors());

//Habilite express.json
app.use(express.json({ extended: true }));



const PORT = process.env.PORT || 4000;

//importar rutas
app.use("/api/doctores", require("./routes/doctores"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/pacientes", require("./routes/pacientes"));
app.use("/api/citas", require("./routes/citas"));


// arrancar la app
app.listen(PORT, () => {
  console.log(`El servidor está funcionando en el puerto ${PORT} `);
});