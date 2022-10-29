const express = require("express");
const router = express.Router();
const pacienteController = require("../controllers/pacientesController");
const auth = require("../middleware/auth");
const { check } = require("express-validator");

//crea usuarios
//  ruta: api/proyectos
router.post(
  "/",
  auth,
  [check("nombre", "El nombre del paciente es obligatorio").not().isEmpty()],
  pacienteController.crearPaciente
);

// Obtener usuarios

router.get(
  "/", 
  auth, 
  pacienteController.obtenerPacientes
);

//Actualizar usuario
router.put(
  "/:id",
  auth,
  [check("nombre", "El nombre del paciente es obligatorio").not().isEmpty()],
  pacienteController.actualizarPaciente
);

//Eliminar un usuario
router.delete(
  "/:id",
  auth,
  pacienteController.eliminarPaciente
);


module.exports = router;