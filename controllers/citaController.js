const Cita = require("../models/Cita");
const Paciente = require("../models/Paciente");
const { validationResult } = require("express-validator");


exports.crearCita = async (req, res) => {


  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(401).json({ errores: errores.array() });
  }

  const { paciente } = req.body;

  try {
    const pacienteEncontrado = await Paciente.findById(paciente);

    if (!pacienteEncontrado) {
      return res.status(404).json({ msg: "Paciente no encontrado" });
    }

    if (pacienteEncontrado.creador.toString() !== req.doctor.id) {
      return res.status(400).json({ msg: "No autorizado" });
    }

    const cita = new Cita(req.body);
    await cita.save();
    res.json({ cita });
  } catch (error) {
    console.log("Hubo un error");
    console.log(error);
    res.status(400).send("Hubo un error");
  }
};

exports.obtenerCita = async (req, res) => {

  const { paciente } = req.query;
  try {
    const pacienteEncontrado = await Paciente.findById(paciente);

    if (!pacienteEncontrado) {
      return res.status(404).json({ msg: "Paciente no encontrado" });
    }

    if (pacienteEncontrado.creador.toString() !== req.doctor.id) {
      return res.status(400).json({ msg: "No autorizado" });
    }

    const citas = await Cita.find({ paciente });
    res.json({ citas });
  } catch (error) {
    console.log("Hubo un error");
    console.log(error);
    res.status(400).send("Hubo un error");
  }
};

exports.actualizarCita = async (req, res) => {

  const { fecha, hora, paciente } = req.body;

  try {
    const pacienteEncontrado = await Paciente.findById(paciente);

    const citaExiste = await Cita.findById(req.params.id);

    if (!citaExiste) {
      return res.status(404).json({ msg: "No existe esa cita" });
    }

    if (!pacienteEncontrado) {
      return res.status(404).json({ msg: "Paciente no encontrado" });
    }

    if (pacienteEncontrado.creador.toString() !== req.doctor.id) {
      return res.status(400).json({ msg: "No autorizado" });
    }

    const nuevaCita = {};
    if (fecha) {
      nuevaCita.fecha = fecha;
    }
    if (hora) {
      nuevaCita.hora = hora;
    }

    cita = await Cita.findOneAndUpdate(
      { _id: req.params.id },
      { $set: nuevaCita },
      { new: true }
    );
    res.json({ cita });
  } catch (error) {
    console.log("Hubo un error");
    console.log(error);
    res.status(400).send("Hubo un error");
  }
};

exports.eliminarCita=async(req,res)=>{
  const { paciente } = req.query;
  try {
    const pacienteEncontrado = await Paciente.findById(paciente);

    const citaExiste = await Cita.findById(req.params.id);

    if (!citaExiste) {
      return res.status(404).json({ msg: "No existe esa cita" });
    }

    if (!pacienteEncontrado) {
      return res.status(404).json({ msg: "Paciente no encontrado" });
    }

    if (pacienteEncontrado.creador.toString() !== req.doctor.id) {
      return res.status(400).json({ msg: "No autorizado" });
    }

    await Cita.deleteOne({_id:req.params.id});
    res.json({msg:"Cita eliminada"})

  

  } catch (error) {
    console.log("Hubo un error");
    console.log(error);
    res.status(400).send("Hubo un error");
  }
}