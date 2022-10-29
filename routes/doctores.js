//Rutas para crear usuarios

const express = require("express");
const router = express.Router();
const doctorController = require("../controllers/doctoresController");
const { check } = require("express-validator");

router.post(
  "/",
  [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("email", "Agrega un email válido").isEmail(),
    check("password", "El password debe ser mínimo de 6 caracteres").isLength({
      min: 6,
    }),
  ],
  doctorController.crearDoctor
);

module.exports = router;