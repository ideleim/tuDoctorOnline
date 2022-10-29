const express = require("express");
const router = express.Router();
const citaController = require("../controllers/citaController");
const auth = require("../middleware/auth");
const { check } = require("express-validator");



router.post(
  "/",
  auth,
  [check("fecha", "fecha es obligatoria").not().isEmpty()],
  citaController.crearCita
);

router.get(
    "/", 
    auth, 
    citaController.obtenerCita
);

router.put(
  "/:id", 
  auth, 
  citaController.actualizarCita
);

router.delete(
  '/:id',
  auth,
  citaController.eliminarCita);

module.exports = router;